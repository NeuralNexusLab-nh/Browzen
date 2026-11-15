// BZN v1: a full 256-bit X25519 public key, unpadded lowercase Base32.
export const aliases = Object.freeze({
  "nxlabtw.bzn": "https://nxlabtw.com/",
  "browzen.bzn": "https://browzen.nxlabtw.com/",
  "neutron.bzn": "https://neutron.nxlabtw.com/",
  "acmtn.bzn": "https://neutron.nxlabtw.com/",
});
const alphabet = "abcdefghijklmnopqrstuvwxyz234567";
export function base32(bytes) {
  let bits = 0,
    value = 0,
    out = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits) out += alphabet[(value << (5 - bits)) & 31];
  return out;
}
export function unbase32(text) {
  if (!/^[a-z2-7]{52}$/.test(text))
    throw Error(
      "Invalid BZN address: expected 52 lowercase Base32 characters.",
    );
  let bits = 0,
    value = 0,
    out = [];
  for (const char of text) {
    value = (value << 5) | alphabet.indexOf(char);
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  const bytes = new Uint8Array(out);
  if (bytes.length !== 32 || base32(bytes) !== text)
    throw Error("Invalid BZN address encoding.");
  return bytes;
}
export function addressFromPublic(bytes) {
  if (bytes.length !== 32) throw Error("Invalid public key.");
  return base32(bytes) + ".bzn";
}
export function parseBzn(value) {
  let input = String(value).trim();
  if (!/^[a-z][\w+.-]*:/i.test(input)) input = "https://" + input;
  const url = new URL(input);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.port
  )
    throw Error("Invalid BZN URL.");
  const host = url.hostname.toLowerCase();
  if (!host.endsWith(".bzn")) return null;
  if (aliases[host])
    return {
      alias: true,
      address: host,
      url: new URL(url.pathname + url.search + url.hash, aliases[host]).href,
    };
  const publicKey = unbase32(host.slice(0, -4));
  return {
    alias: false,
    address: host,
    publicKey,
    url: "https://" + host + url.pathname + url.search + url.hash,
  };
}
export const isBzn = (value) => {
  try {
    return new URL(value).hostname.toLowerCase().endsWith(".bzn");
  } catch {
    return false;
  }
};
export function vanityEstimate(prefix, rate) {
  if (!/^[a-z2-7]{0,8}$/.test(prefix))
    throw Error("Use up to 8 letters a–z or digits 2–7.");
  return {
    attempts: 32 ** prefix.length,
    seconds: rate > 0 ? 32 ** prefix.length / rate : Infinity,
  };
}
