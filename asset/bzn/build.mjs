import { build } from "esbuild";
await build({
  stdin: {
    contents:
      "export {CipherSuite,HkdfSha256,Aes256Gcm} from '@hpke/core';export {DhkemX25519HkdfSha256} from '@hpke/dhkem-x25519';",
    resolveDir: new URL(".", import.meta.url).pathname.replace(
      /^\/([A-Za-z]:)/,
      "$1",
    ),
  },
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "es2022",
  outfile: new URL("vendor/hpke.js", import.meta.url).pathname.replace(
    /^\/([A-Za-z]:)/,
    "$1",
  ),
  legalComments: "eof",
});
