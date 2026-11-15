import {
  identity,
  random,
  b64,
  utf8,
  unb64,
  sealHello,
  openHello,
} from "./crypto.js";
import { parseBzn } from "./address.js";
import { NeutronRoom } from "./neutron.js";
import { EncryptedLink } from "./link.js";
const roomFactory = (pin) => new NeutronRoom(pin);
const id = () => b64(random(16));
function helloValid(h, address) {
  return (
    h?.v === 1 &&
    h.address === address &&
    /^[\w-]{22}$/.test(h.sid) &&
    /^[\w-]{43}\.input$/.test(h.input) &&
    /^[\w-]{43}\.output$/.test(h.output) &&
    h.input.slice(0, -6) !== h.output.slice(0, -7) &&
    /^[\w-]{43}$/.test(h.seed) &&
    /^[\w-]{43}$/.test(h.challenge) &&
    Number.isFinite(h.expires) &&
    h.expires > Date.now() &&
    h.expires < Date.now() + 120000
  );
}
export function localTarget(port, path) {
  if (
    !/^\d{1,5}$/.test(String(port)) ||
    Number(port) < 1 ||
    Number(port) > 65535
  )
    throw Error("Enter a port from 1 to 65535.");
  const base = "http://127.0.0.1:" + Number(port),
    url = new URL(path, base);
  if (url.origin !== base || url.username || url.password)
    throw Error("Only the configured localhost service is available.");
  return url;
}
export async function localFetch({
  port,
  url,
  method = "GET",
  headers = {},
  body,
  signal,
}) {
  const target = localTarget(port, url);
  method = String(method).toUpperCase();
  if (
    !["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].includes(
      method,
    )
  )
    throw Error("Unsupported method.");
  const safe = {};
  for (const [k, v] of Object.entries(headers)) {
    if (
      !/^[!#$%&'*+.^_`|~\w-]+$/.test(k) ||
      /^(host|cookie|origin|referer|sec-|proxy-|connection|content-length|accept-encoding|authorization)/i.test(
        k,
      )
    )
      continue;
    if (typeof v === "string" && !/[\r\n]/.test(v) && v.length <= 8192)
      safe[k] = v;
  }
  const bytes = body ? unb64(body) : undefined;
  if (bytes?.length > 1024 * 1024)
    throw Error("BZN request body exceeds 1 MB.");
  const response = await fetch(target, {
    method,
    headers: safe,
    body: ["GET", "HEAD"].includes(method) ? undefined : bytes,
    credentials: "omit",
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.any([
      ...(signal ? [signal] : []),
      AbortSignal.timeout(30000),
    ]),
  });
  if (Number(response.headers.get("content-length")) > 5 * 1024 * 1024)
    throw Error("BZN resource exceeds 5 MB.");
  const reader = response.body?.getReader(),
    chunks = [];
  let size = 0;
  try {
    if (reader)
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 5 * 1024 * 1024) throw Error("BZN resource exceeds 5 MB.");
        chunks.push(value);
      }
  } finally {
    await reader?.cancel().catch(() => {});
  }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  const exposed = Object.fromEntries(response.headers);
  delete exposed["set-cookie"];
  return {
    status: response.status,
    statusText: response.statusText,
    headers: exposed,
    body: b64(result),
  };
}
export class BznHost {
  constructor({
    secret,
    port,
    onState = () => {},
    onError = () => {},
    makeRoom = roomFactory,
    serve = localFetch,
  }) {
    Object.assign(this, { secret, port, onState, onError, makeRoom, serve });
    this.sessions = new Map();
    this.opening = new Set();
    this.running = false;
    this.abort = new AbortController();
  }
  async start() {
    localTarget(this.port, "/");
    if (!/^bzn1\.[A-Za-z0-9_-]{43}$/.test(this.secret || ""))
      throw Error("Import a valid BZN private key first.");
    this.running = true;
    const host = await identity(this.secret);
    this.secret = "";
    if (!this.running) throw Error("Hosting cancelled.");
    this.host = host;
    this.onState("Checking localhost…");
    const probe = await this.serve({
      port: this.port,
      url: "/",
      signal: this.abort.signal,
    });
    if (probe.status >= 500)
      throw Error("The localhost service returned HTTP " + probe.status + ".");
    if (!this.running) throw Error("Hosting cancelled.");
    this.public = this.makeRoom(this.host.address.slice(0, -4));
    await this.public.start((packet) => this.accept(packet));
    if (!this.running) {
      this.public.close();
      throw Error("Hosting cancelled.");
    }
    this.timer = setInterval(() => {
      for (const [sid, s] of this.sessions)
        if (Date.now() - s.link.lastSeen > 45000) {
          s.link.close();
          this.sessions.delete(sid);
          this.report();
        }
    }, 5000);
    this.report();
    return this;
  }
  report() {
    this.onState(
      "Hosting · " +
        this.sessions.size +
        " connected session" +
        (this.sessions.size === 1 ? "" : "s"),
      { address: this.host.address, visitors: this.sessions.size },
    );
  }
  async accept(packet) {
    if (
      !this.running ||
      packet?.app !== "bzn/1" ||
      packet.type !== "hello" ||
      typeof packet.enc !== "string" ||
      packet.enc.length > 128 ||
      typeof packet.ciphertext !== "string" ||
      packet.ciphertext.length > 4096 ||
      this.sessions.size + this.opening.size >= 8
    )
      return;
    let h;
    try {
      h = await openHello(this.host, packet);
    } catch {
      return;
    }
    if (!this.running || !this.host || !helloValid(h, this.host.address))
      return;
    const old = this.sessions.get(h.sid);
    if (old) {
      if (old.challenge === h.challenge)
        old.link
          .send({
            type: "session.confirm",
            sid: h.sid,
            challenge: h.challenge,
            address: this.host.address,
          })
          .catch(this.onError);
      return;
    }
    if (this.opening.has(h.sid)) return;
    this.opening.add(h.sid);
    let link;
    try {
      link = await new EncryptedLink({
        sid: h.sid,
        seed: h.seed,
        role: "host",
        readPin: h.input,
        writePin: h.output,
        roomFactory: this.makeRoom,
        onError: this.onError,
        onMessage: (message) => this.message(h.sid, message),
      }).start();
      if (!this.running) {
        link.close();
        return;
      }
      this.sessions.set(h.sid, {
        link,
        challenge: h.challenge,
        requests: new Map(),
        processed: new Set(),
        cacheBytes: 0,
        active: 0,
      });
      await link.send({
        type: "session.confirm",
        sid: h.sid,
        challenge: h.challenge,
        address: this.host.address,
      });
      this.report();
    } catch (error) {
      link?.close();
      this.sessions.delete(h.sid);
      this.onError(error);
    } finally {
      this.opening.delete(h.sid);
    }
  }
  async message(sid, message) {
    const session = this.sessions.get(sid);
    if (!session || !this.running || !message) return;
    if (message.type === "ping") {
      await session.link.send({ type: "pong" });
      return;
    }
    if (message.type !== "request" || !/^[\w-]{22}$/.test(message.id)) return;
    let response = session.requests.get(message.id);
    if (!response) {
      if (session.processed.has(message.id)) {
        await session.link.send({
          type: "response",
          id: message.id,
          error: "Cached result expired. The request was not executed again.",
        });
        return;
      }
      if (session.active >= 4 || session.processed.size >= 1024) {
        await session.link.send({
          type: "response",
          id: message.id,
          error:
            "Host session limit reached. Reconnect before sending new requests.",
        });
        return;
      }
      session.active++;
      session.processed.add(message.id);
      response = (async () => {
        try {
          const target = new URL(message.url);
          if (target.origin !== "https://" + this.host.address)
            throw Error("Request belongs to another website.");
          return {
            type: "response",
            id: message.id,
            ...(await this.serve({
              port: this.port,
              url: target.pathname + target.search,
              method: message.method,
              headers: message.headers,
              body: message.body,
              signal: this.abort.signal,
            })),
          };
        } catch (error) {
          return { type: "response", id: message.id, error: error.message };
        } finally {
          session.active--;
        }
      })();
      session.requests.set(message.id, response);
      response.then((result) => {
        session.cacheBytes += utf8.encode(JSON.stringify(result)).length;
        for (const [key, cached] of session.requests) {
          if (
            session.cacheBytes <= 16 * 1024 * 1024 &&
            session.requests.size <= 64
          )
            break;
          if (key === message.id) continue;
          session.requests.delete(key);
          cached.then((value) => {
            session.cacheBytes -= utf8.encode(JSON.stringify(value)).length;
          });
        }
      });
    }
    await session.link.send(await response);
  }
  stop() {
    this.running = false;
    clearInterval(this.timer);
    this.abort.abort();
    this.public?.close();
    for (const s of this.sessions.values()) s.link.close();
    this.sessions.clear();
    this.host = null;
    this.secret = "";
    this.onState("Offline");
  }
}
export class BznClient {
  constructor(address, { onState = () => {}, makeRoom = roomFactory } = {}) {
    const parsed = parseBzn(address);
    if (!parsed || parsed.alias)
      throw Error("A public-key BZN address is required.");
    Object.assign(this, { address: parsed.address, onState, makeRoom });
    this.pending = new Map();
    this.closed = false;
  }
  async connect() {
    const h = {
      v: 1,
      address: this.address,
      sid: id(),
      input: b64(random(32)) + ".input",
      output: b64(random(32)) + ".output",
      seed: b64(random(32)),
      challenge: b64(random(32)),
      expires: Date.now() + 90000,
    };
    this.onState("Connecting · Encrypted handshake");
    let confirm;
    const verified = new Promise((resolve, reject) => {
      confirm = resolve;
      this.rejectConnect = reject;
    });
    verified.catch(() => {});
    let timer, retry;
    try {
      this.link = new EncryptedLink({
        sid: h.sid,
        seed: h.seed,
        role: "client",
        readPin: h.output,
        writePin: h.input,
        roomFactory: this.makeRoom,
        onError: (error) => this.onState("Reconnecting · " + error.message),
        onMessage: (message) => {
          if (
            message.type === "session.confirm" &&
            message.sid === h.sid &&
            message.challenge === h.challenge &&
            message.address === this.address
          )
            confirm();
          if (message.type === "response") {
            const job = this.pending.get(message.id);
            if (job) {
              this.pending.delete(message.id);
              clearTimeout(job.timer);
              job.signal?.removeEventListener("abort", job.abort);
              message.error
                ? job.reject(Error(message.error))
                : job.resolve(message);
            }
          }
        },
      });
      await this.link.start();
      if (this.closed) throw Error("BZN session closed.");
      this.public = this.makeRoom(this.address.slice(0, -4));
      await this.public.start(() => {});
      if (this.closed) throw Error("BZN session closed.");
      const packet = {
        app: "bzn/1",
        type: "hello",
        ...(await sealHello(this.address, h)),
      };
      timer = setTimeout(
        () =>
          this.rejectConnect(
            Error(
              "BZN host did not respond. Keep its Host page open and try again.",
            ),
          ),
        90000,
      );
      await this.public.send(packet);
      retry = setInterval(() => this.public.send(packet).catch(() => {}), 6000);
      await verified;
      if (this.closed) throw Error("BZN session closed.");
    } catch (error) {
      this.close();
      throw error;
    } finally {
      clearTimeout(timer);
      clearInterval(retry);
      this.public?.close();
    }
    this.onState("Safe · Encrypted connection");
    this.heartbeat = setInterval(() => {
      if (Date.now() - this.link.lastSeen > 45000) {
        this.onState("Connection lost · No direct fallback");
        this.close();
      } else this.link.send({ type: "ping" }).catch(() => {});
    }, 10000);
    return this;
  }
  async request({ url, method = "GET", headers = {}, body, signal }) {
    if (this.closed || signal?.aborted) throw Error("BZN request cancelled.");
    const requestId = id();
    return new Promise((resolve, reject) => {
      const job = {
        resolve,
        reject,
        signal,
        timer: setTimeout(() => {
          this.pending.delete(requestId);
          signal?.removeEventListener("abort", job.abort);
          reject(Error("BZN request timed out."));
        }, 180000),
        abort: () => {
          clearTimeout(job.timer);
          this.pending.delete(requestId);
          reject(Error("BZN request cancelled."));
        },
      };
      this.pending.set(requestId, job);
      signal?.addEventListener("abort", job.abort, { once: true });
      this.link
        .send({
          type: "request",
          id: requestId,
          url,
          method,
          headers,
          body: body ? b64(body) : undefined,
        })
        .catch((error) => {
          if (this.pending.delete(requestId)) {
            clearTimeout(job.timer);
            signal?.removeEventListener("abort", job.abort);
            reject(error);
          }
        });
    }).then((r) => ({ ...r, body: unb64(r.body).buffer }));
  }
  close() {
    this.closed = true;
    this.rejectConnect?.(Error("BZN session closed."));
    clearInterval(this.heartbeat);
    this.public?.close();
    this.link?.close();
    for (const job of this.pending.values()) {
      clearTimeout(job.timer);
      job.signal?.removeEventListener("abort", job.abort);
      job.reject(Error("BZN session closed."));
    }
    this.pending.clear();
  }
}
