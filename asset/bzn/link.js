import {
  b64,
  unb64,
  utf8,
  text,
  digest,
  random,
  channel,
  channelKeys,
} from "./crypto.js";
export const MAX_TRANSFER = 8 * 1024 * 1024;
const PART = 2048,
  WINDOW = 6;
export class EncryptedLink {
  constructor(options) {
    Object.assign(this, options);
    this.pending = new Map();
    this.incoming = new Map();
    this.completed = new Map();
    this.acks = new Set();
    this.closed = false;
    this.lastSeen = Date.now();
    this.ackBusy = false;
  }
  async start() {
    try {
      const keys = await channelKeys(this.seed, this.sid);
      this.seed = "";
      if (this.closed) throw Error("BZN session closed.");
      this.tx = channel(
        keys[this.role === "host" ? "output" : "input"],
        this.sid,
        this.role === "host" ? "output" : "input",
      );
      this.rx = channel(
        keys[this.role === "host" ? "input" : "output"],
        this.sid,
        this.role === "host" ? "input" : "output",
      );
      this.input = this.roomFactory(this.readPin);
      await this.input.start((packet) => this.receive(packet));
      if (this.closed) throw Error("BZN session closed.");
      this.output = this.roomFactory(this.writePin);
      await this.output.start(() => {});
      if (this.closed) throw Error("BZN session closed.");
      this.timer = setInterval(() => {
        this.tick().catch(this.onError);
      }, 1000);
      return this;
    } catch (error) {
      this.close();
      throw error;
    }
  }
  async raw(payload) {
    if (this.closed) throw Error("BZN session closed.");
    return this.output.send({ app: "bzn/1", ...(await this.tx.seal(payload)) });
  }
  async receive(packet) {
    if (packet?.app !== "bzn/1") return;
    let data;
    try {
      data = await this.rx.open(packet);
    } catch {
      return;
    }
    if (!data) return;
    this.lastSeen = Date.now();
    if (data.type === "ack") {
      for (const token of data.ids || []) {
        const cut = token.lastIndexOf(":"),
          job = this.pending.get(token.slice(0, cut)),
          i = Number(token.slice(cut + 1));
        if (job && Number.isInteger(i) && i >= 0 && i < job.parts.length) {
          job.acked.add(i);
          if (job.acked.size === job.parts.length) {
            this.pending.delete(token.slice(0, cut));
            job.resolve();
          }
        }
      }
      return;
    }
    if (
      data.type !== "part" ||
      typeof data.id !== "string" ||
      !/^[\w-]{22}$/.test(data.id) ||
      !Number.isInteger(data.i) ||
      !Number.isInteger(data.n) ||
      data.n < 1 ||
      data.n > Math.ceil(MAX_TRANSFER / PART) ||
      data.i < 0 ||
      data.i >= data.n ||
      typeof data.part !== "string" ||
      data.part.length > 2731 ||
      typeof data.hash !== "string"
    )
      return;
    this.acks.add(data.id + ":" + data.i);
    if (this.completed.has(data.id)) return;
    let job = this.incoming.get(data.id);
    if (!job) {
      if (this.incoming.size >= 8) return;
      job = { parts: new Map(), n: data.n, hash: data.hash, time: Date.now() };
      this.incoming.set(data.id, job);
    }
    if (job.n !== data.n || job.hash !== data.hash) return;
    job.parts.set(data.i, data.part);
    if (job.parts.size === job.n) {
      this.incoming.delete(data.id);
      const chunks = Array.from({ length: job.n }, (_, i) =>
          unb64(job.parts.get(i)),
        ),
        size = chunks.reduce((n, b) => n + b.length, 0);
      if (size > MAX_TRANSFER) return;
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.length;
      }
      if ((await digest(bytes)) !== job.hash) return;
      this.completed.set(data.id, Date.now());
      if (this.completed.size > 256)
        this.completed.delete(this.completed.keys().next().value);
      const value = JSON.parse(text.decode(bytes));
      Promise.resolve(this.onMessage(value)).catch(this.onError);
    }
  }
  async send(value) {
    if (this.pending.size >= 8) throw Error("Too many BZN messages in flight.");
    const bytes = utf8.encode(JSON.stringify(value));
    if (bytes.length > MAX_TRANSFER) throw Error("BZN message exceeds 8 MB.");
    const id = b64(random(16)),
      hash = await digest(bytes),
      parts = [];
    for (let i = 0; i < bytes.length; i += PART)
      parts.push(b64(bytes.slice(i, i + PART)));
    return new Promise((resolve, reject) => {
      this.pending.set(id, {
        parts,
        hash,
        acked: new Set(),
        sent: new Map(),
        started: Date.now(),
        resolve,
        reject,
      });
      this.tick().catch(this.onError);
    });
  }
  async tick() {
    if (this.closed || this.busy) return;
    this.busy = true;
    try {
      const now = Date.now();
      if (this.acks.size) {
        const ids = [...this.acks].slice(0, 64);
        await this.raw({ type: "ack", ids });
        for (const id of ids) this.acks.delete(id);
      }
      for (const [id, job] of this.pending) {
        if (now - job.started > 180000) {
          this.pending.delete(id);
          job.reject(Error("BZN transfer timed out."));
          continue;
        }
        let sent = 0;
        for (let i = 0; i < job.parts.length && sent < WINDOW; i++) {
          if (job.acked.has(i)) continue;
          const old = job.sent.get(i);
          if (old && now - old < 5000) {
            sent++;
            continue;
          }
          await this.raw({
            type: "part",
            id,
            i,
            n: job.parts.length,
            hash: job.hash,
            part: job.parts[i],
          });
          job.sent.set(i, Date.now());
          sent++;
        }
      }
      for (const [id, job] of this.incoming)
        if (now - job.time > 180000) this.incoming.delete(id);
    } finally {
      this.busy = false;
    }
  }
  close() {
    this.closed = true;
    clearInterval(this.timer);
    this.input?.close();
    this.output?.close();
    for (const job of this.pending.values())
      job.reject(Error("BZN session closed."));
    this.pending.clear();
    this.incoming.clear();
    this.seed = "";
  }
}
