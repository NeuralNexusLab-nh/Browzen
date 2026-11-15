import test from "node:test";
import assert from "node:assert/strict";
import { base32, unbase32, parseBzn, vanityEstimate } from "./address.js";
import {
  identity,
  sealHello,
  openHello,
  channelKeys,
  channel,
  random,
  b64,
  utf8,
} from "./crypto.js";
import { BznHost, BznClient, localTarget, localFetch } from "./protocol.js";
import { EncryptedLink } from "./link.js";
import { readFile } from "node:fs/promises";
function rooms({ drop = () => false } = {}) {
  const map = new Map();
  return (pin) => ({
    async start(handler) {
      this.pin = pin;
      this.handler = handler;
      if (!map.has(pin)) map.set(pin, new Set());
      map.get(pin).add(this);
      return this;
    },
    async send(data) {
      if (drop(pin, data)) return;
      for (const room of map.get(pin) || [])
        queueMicrotask(() =>
          Promise.resolve(room.handler(structuredClone(data))).catch(() => {}),
        );
    },
    close() {
      map.get(this.pin)?.delete(this);
    },
  });
}
const until = async (fn, timeout = 20000) => {
  const end = Date.now() + timeout;
  while (!fn()) {
    if (Date.now() > end) throw Error("Test timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
};
test("full-key addresses are canonical, 56 characters and case-normalized", async () => {
  const a = await identity();
  assert.equal(a.address.length, 56);
  assert.equal(parseBzn(a.address.toUpperCase()).address, a.address);
  assert.deepEqual(
    unbase32(base32(new Uint8Array(32).fill(255))),
    new Uint8Array(32).fill(255),
  );
  assert.throws(() => unbase32("a".repeat(51) + "b"));
  assert.throws(() => parseBzn("bad.bzn"));
  assert.equal((await identity(a.secret)).address, a.address);
});
test("aliases use real HTTPS destinations, never a Neutron public key", () => {
  for (const [name, target] of [
    ["nxlabtw", "https://nxlabtw.com/"],
    ["browzen", "https://browzen.nxlabtw.com/"],
    ["neutron", "https://neutron.nxlabtw.com/"],
    ["acmtn", "https://neutron.nxlabtw.com/"],
  ]) {
    const a = parseBzn(name + ".bzn");
    assert.equal(a.alias, true);
    assert.equal(a.targetURL, target);
    assert.equal(a.url, "https://" + name + ".bzn/");
  }
  assert.equal(
    parseBzn("nxlabtw.bzn/test?q=1").targetURL,
    "https://nxlabtw.com/test?q=1",
  );
  assert.equal(
    new URL(parseBzn("nxlabtw.bzn//evil.example/").targetURL).origin,
    "https://nxlabtw.com",
  );
  assert.equal(parseBzn("nxlabtw.bzn.").url, "https://nxlabtw.bzn/");
  assert.equal(vanityEstimate("abc", 100).attempts, 32768);
  assert.throws(() => vanityEstimate("0", 1));
});
test("HPKE authenticates ciphertext to the addressed private key", async () => {
  const host = await identity(),
    other = await identity(),
    packet = await sealHello(host.address, { secret: "private-room" });
  assert.doesNotMatch(JSON.stringify(packet), /private-room/);
  assert.deepEqual(await openHello(host, packet), { secret: "private-room" });
  await assert.rejects(() => openHello(other, packet));
  const corrupt = {
    ...packet,
    ciphertext: packet.ciphertext.slice(0, -2) + "AA",
  };
  await assert.rejects(() => openHello(host, corrupt));
});
test("direction-bound AEAD rejects replay, tampering and session confusion", async () => {
  const seed = b64(random(32)),
    keys = await channelKeys(seed, "test"),
    tx = channel(keys.input, "test", "input"),
    rx = channel(keys.input, "test", "input"),
    wrong = channel(keys.output, "test", "output"),
    packet = await tx.seal({ type: "ping" });
  assert.equal(await wrong.open(packet), null);
  await assert.rejects(() =>
    rx.open({ ...packet, data: packet.data.slice(0, -2) + "AA" }),
  );
  assert.deepEqual(await rx.open(packet), { type: "ping" });
  assert.equal(await rx.open(packet), null);
  assert.equal(await rx.open({ ...packet, sid: "other" }), null);
});
test("local targets cannot escape the selected loopback port", () => {
  assert.equal(
    localTarget("3000", "/api?q=1").href,
    "http://127.0.0.1:3000/api?q=1",
  );
  for (const path of [
    "//evil.example",
    "http://127.0.0.1:4000",
    "http://192.168.1.1/",
    "http://localhost:3000",
    "file:///secret",
  ])
    assert.throws(() => localTarget(3000, path));
  for (const p of [0, 65536, "3000@evil", "abc"])
    assert.throws(() => localTarget(p, "/"));
});
test("empty host keys are rejected instead of silently generating an identity", async () => {
  const host = new BznHost({ secret: "", port: 3000 });
  await assert.rejects(() => host.start(), /private key/);
  host.stop();
});
test("BZN URL validation rejects malformed keys and retains virtual names", async () => {
  const { validateRemote, addressToURL } = await import("../url-policy.js");
  const key = await identity();
  assert.equal(addressToURL(key.address), "https://" + key.address + "/");
  assert.equal(validateRemote("https://acmtn.bzn/").href, "https://acmtn.bzn/");
  assert.throws(() => validateRemote("https://typo.bzn/"));
});
test("partial connection failure closes every opened room", async () => {
  let started = 0,
    closed = 0;
  const link = new EncryptedLink({
    sid: b64(random(16)),
    seed: b64(random(32)),
    role: "client",
    readPin: "o",
    writePin: "i",
    roomFactory: () => ({
      async start() {
        if (++started === 2) throw Error("Offline");
        return this;
      },
      close() {
        closed++;
      },
    }),
    onError: () => {},
  });
  await assert.rejects(() => link.start(), /Offline/);
  assert.equal(closed, 2);
  assert.equal(link.closed, true);
});
test("fragmentation, authenticated ACKs and retries survive a dropped packet", async () => {
  let dropped = false;
  const makeRoom = rooms({
      drop: (_pin, p) => {
        if (!dropped && p.app === "bzn/1") {
          dropped = true;
          return true;
        }
        return false;
      },
    }),
    sid = b64(random(16)),
    seed = b64(random(32));
  let received;
  const a = await new EncryptedLink({
      sid,
      seed,
      role: "client",
      readPin: "o",
      writePin: "i",
      roomFactory: makeRoom,
      onMessage: () => {},
      onError: () => {},
    }).start(),
    b = await new EncryptedLink({
      sid,
      seed,
      role: "host",
      readPin: "i",
      writePin: "o",
      roomFactory: makeRoom,
      onMessage: (m) => {
        received = m;
      },
      onError: () => {},
    }).start();
  try {
    const value = { type: "test", data: "x".repeat(14000) };
    await a.send(value);
    await until(() => received);
    assert.deepEqual(received, value);
    assert.equal(dropped, true);
    assert.equal(a.pending.size, 0);
  } finally {
    a.close();
    b.close();
  }
});
test("host/client handshake, request/response, POST and no wrong-origin proxy", async () => {
  const makeRoom = rooms(),
    hostIdentity = await identity();
  let count = 0;
  const host = new BznHost({
    secret: hostIdentity.secret,
    port: 3000,
    makeRoom,
    serve: async (request) => {
      count++;
      return {
        status: 200,
        headers: { "content-type": "text/html" },
        body: b64(utf8.encode(request.url)),
      };
    },
  });
  let client;
  try {
    await host.start();
    client = await new BznClient(hostIdentity.address, { makeRoom }).connect();
    const r = await client.request({
      url: "https://" + hostIdentity.address + "/hello",
      method: "POST",
      body: utf8.encode("body").buffer,
    });
    assert.equal(new TextDecoder().decode(r.body), "/hello");
    assert.equal(count, 2);
    await assert.rejects(
      () => client.request({ url: "https://other.example/" }),
      /another website/,
    );
    assert.equal(count, 2);
  } finally {
    client?.close();
    host.stop();
  }
});
test("host pages have no Puter and retain a native strict resource boundary", async () => {
  for (const route of ["address", "host"]) {
    const html = await readFile(
      new URL("../../bzn/" + route + "/index.html", import.meta.url),
      "utf8",
    );
    assert.doesNotMatch(html, /js\.puter|allow-same-origin/);
    assert.match(html, /object-src 'none'/);
    assert.match(html, /http:\/\/127\.0\.0\.1:\*/);
  }
  const app = await readFile(new URL("./app.js", import.meta.url), "utf8");
  assert.match(app, /const origin\s*=\s*location.origin/);
  assert.doesNotMatch(app, /localStorage|sessionStorage|indexedDB/);
});
