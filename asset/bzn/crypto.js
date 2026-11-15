import {
  CipherSuite,
  HkdfSha256,
  Aes256Gcm,
  DhkemX25519HkdfSha256,
} from "./vendor/hpke.js";
import { addressFromPublic, parseBzn } from "./address.js";
export const utf8 = new TextEncoder(),
  text = new TextDecoder();
export const random = (n) => crypto.getRandomValues(new Uint8Array(n));
export const b64 = (bytes) => {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
};
export const unb64 = (s) => {
  if (typeof s !== "string" || !/^[A-Za-z0-9_-]*$/.test(s))
    throw Error("Invalid Base64URL.");
  return Uint8Array.from(
    atob(
      s.replaceAll("-", "+").replaceAll("_", "/") +
        "=".repeat((4 - (s.length % 4)) % 4),
    ),
    (c) => c.charCodeAt(0),
  );
};
const suite = new CipherSuite({
  kem: new DhkemX25519HkdfSha256(),
  kdf: new HkdfSha256(),
  aead: new Aes256Gcm(),
});
export async function identity(secret) {
  const seed = secret
    ? unb64(
        String(secret)
          .trim()
          .replace(/^bzn1\./, ""),
      )
    : random(32);
  if (seed.length !== 32)
    throw Error("A BZN private key must contain a 32-byte seed.");
  const pair = await suite.kem.deriveKeyPair(seed);
  return {
    pair,
    secret: "bzn1." + b64(seed),
    address: addressFromPublic(
      new Uint8Array(await suite.kem.serializePublicKey(pair.publicKey)),
    ),
  };
}
const info = (address) => utf8.encode("BROWZEN-NETWORK/v1/" + address);
export async function sealHello(address, payload) {
  const publicKey = await suite.kem.deserializePublicKey(
    parseBzn(address).publicKey,
  );
  const ctx = await suite.createSenderContext({
    recipientPublicKey: publicKey,
    info: info(address),
  });
  return {
    enc: b64(ctx.enc),
    ciphertext: b64(await ctx.seal(utf8.encode(JSON.stringify(payload)))),
  };
}
export async function openHello(host, packet) {
  const ctx = await suite.createRecipientContext({
    recipientKey: host.pair.privateKey,
    enc: unb64(packet.enc),
    info: info(host.address),
  });
  return JSON.parse(text.decode(await ctx.open(unb64(packet.ciphertext))));
}
export async function digest(bytes) {
  return b64(await crypto.subtle.digest("SHA-256", bytes));
}
export async function channelKeys(seed, sessionId) {
  const root = await crypto.subtle.importKey(
    "raw",
    unb64(seed),
    "HKDF",
    false,
    ["deriveKey"],
  );
  const keys = {};
  for (const direction of ["input", "output"])
    keys[direction] = await crypto.subtle.deriveKey(
      {
        name: "HKDF",
        hash: "SHA-256",
        salt: utf8.encode(sessionId),
        info: utf8.encode("BZN/v1/" + direction),
      },
      root,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"],
    );
  return keys;
}
export function channel(key, sessionId, direction) {
  let seq = 0;
  const seen = new Set();
  return {
    async seal(payload) {
      const n = ++seq,
        iv = random(12),
        aad = utf8.encode(JSON.stringify([1, sessionId, direction, n]));
      return {
        v: 1,
        sid: sessionId,
        dir: direction,
        seq: n,
        iv: b64(iv),
        data: b64(
          await crypto.subtle.encrypt(
            { name: "AES-GCM", iv, additionalData: aad },
            key,
            utf8.encode(JSON.stringify(payload)),
          ),
        ),
      };
    },
    async open(packet) {
      if (
        packet?.v !== 1 ||
        packet.sid !== sessionId ||
        packet.dir !== direction ||
        !Number.isSafeInteger(packet.seq) ||
        packet.seq < 1 ||
        seen.has(packet.seq)
      )
        return null;
      const aad = utf8.encode(
        JSON.stringify([1, sessionId, direction, packet.seq]),
      );
      const payload = JSON.parse(
        text.decode(
          await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: unb64(packet.iv), additionalData: aad },
            key,
            unb64(packet.data),
          ),
        ),
      );
      seen.add(packet.seq);
      if (seen.size > 8192)
        throw Error("Session message limit reached. Reconnect.");
      return payload;
    },
  };
}
