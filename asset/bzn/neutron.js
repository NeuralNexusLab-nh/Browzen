// Neutron's browser adapter is loaded only when a BZN connection starts.
let adapter;
const origin = "https://neutron.nxlabtw.com";
export class NeutronRoom {
  constructor(pin, { onError = () => {}, interval = 900 } = {}) {
    this.pin = pin;
    this.onError = onError;
    this.interval = interval;
    this.seen = new Set();
    this.closed = false;
    this.tail = Promise.resolve();
  }
  async start(onMessage) {
    try {
      this.api = await (adapter ??= import(
        "https://neutron.nxlabtw.com/scripts/crypto.js"
      ));
      if (this.closed) throw Error("Room closed.");
      this.room = await this.api.deriveRoom(this.pin);
      await this.api.authenticateRoom(this.room);
      if (this.closed) throw Error("Room closed.");
      this.onMessage = onMessage;
      this.loop();
      return this;
    } catch (error) {
      throw Error("Neutron sign-in failed: " + error.message);
    }
  }
  async auth() {
    if (Date.now() >= this.room.sessionExpiresAt)
      await this.api.authenticateRoom(this.room);
  }
  send(payload) {
    const job = this.tail.then(async () => {
      if (this.closed) throw Error("Room closed.");
      if (new TextEncoder().encode(JSON.stringify(payload)).length > 8000)
        throw Error("Neutron payload exceeds the BZN packet limit.");
      await this.auth();
      try {
        return await this.api.sendMessage(this.room, payload);
      } catch (error) {
        if (error.message === "session_expired" && this.room)
          this.room.sessionExpiresAt = 0;
        throw error;
      }
    });
    this.tail = job.catch(() => {});
    return job;
  }
  async loop() {
    while (!this.closed) {
      try {
        await this.auth();
        const res = await fetch(
          origin + "/api/room?hash=" + encodeURIComponent(this.room.roomHash),
          {
            credentials: "omit",
            cache: "no-store",
            signal: AbortSignal.timeout(12000),
          },
        );
        if (!res.ok)
          throw Error("Neutron room unavailable (" + res.status + ").");
        const { messages } = await res.json();
        if (!Array.isArray(messages))
          throw Error("Invalid Neutron room response.");
        for (const descriptor of messages.slice(0, 96)) {
          if (this.closed) break;
          if (this.seen.has(descriptor.messageHash)) continue;
          let data;
          try {
            data = await this.api.claimMessage(this.room, descriptor);
          } catch (error) {
            if (error.message === "session_expired")
              this.room.sessionExpiresAt = 0;
            else if (error.message === "claim_failed")
              this.seen.add(descriptor.messageHash);
            continue;
          }
          if (!data) continue;
          this.seen.add(descriptor.messageHash);
          if (this.seen.size > 4096)
            this.seen.delete(this.seen.values().next().value);
          Promise.resolve(this.onMessage?.(data)).catch(this.onError);
        }
      } catch (error) {
        if (!this.closed) this.onError(error);
      }
      if (!this.closed) await new Promise((r) => setTimeout(r, this.interval));
    }
  }
  close() {
    this.closed = true;
    this.room = null;
    this.pin = "";
  }
}
