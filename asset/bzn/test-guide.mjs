import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { createHmac, pbkdf2Sync, createHash } from "node:crypto";
const guide = await readFile(
  new URL("../../BrowzenNetwork.md", import.meta.url),
  "utf8",
);
const snippets = [...guide.matchAll(/```(\w+)\r?\n([\s\S]*?)```/g)];
test('guide examples are discovered with LF and Windows CRLF line endings',()=>{
  for(const source of [guide,guide.replace(/\r?\n/g,'\r\n')]){
    const blocks=[...source.matchAll(/```(\w+)\r?\n([\s\S]*?)```/g)];
    assert.ok(blocks.some(([,lang])=>lang==='js'));
    assert.ok(blocks.some(([,lang])=>lang==='python'));
  }
});
test("agent guide covers native hosting, both cryptographic layers and real HTTP routes without CORS examples", () => {
  for (const route of [
    "/api/auth/register/start",
    "/api/auth/register/finish",
    "/api/auth/login/start",
    "/api/auth/login/finish",
    "/api/message/prepare",
    "/api/message/claim",
    "/api/room",
    "/api/message",
  ])
    assert.ok(guide.includes(route));
  for (const marker of [
    "Implementation checklist",
    "Python example",
    "actual `fetch`",
    "HKDF-SHA256",
    "P-256",
    "DHKEM DeriveKeyPair",
    "session.confirm",
    "deliverables",
  ])
    assert.ok(guide.toLowerCase().includes(marker.toLowerCase()), marker);
  for (const [, lang, source] of snippets) {
    assert.doesNotMatch(
      source,
      /access-control-allow|npm install cors|app\.use\(cors/i,
    );
    if (lang === "js") {
      const result = spawnSync(
        process.execPath,
        ["--check", "--input-type=module"],
        { input: source, encoding: "utf8" },
      );
      assert.equal(result.status, 0, result.stderr);
    }
  }
});
test("both pages link directly to the canonical guide and main repository", async () => {
  for (const page of ["address", "host"]) {
    const html = await readFile(
      new URL("../../bzn/" + page + "/index.html", import.meta.url),
      "utf8",
    );
    assert.match(
      html,
      /href="https:\/\/github\.com\/NeuralNexusLab-nh\/Browzen\/blob\/main\/BrowzenNetwork\.md"/,
    );
    assert.match(
      html,
      /href="https:\/\/github\.com\/NeuralNexusLab-nh\/Browzen"/,
    );
  }
});
test("documented JavaScript fetch examples sign requests and reject unverified server keys", async () => {
  const source = snippets.find(
    ([, lang, body]) => lang === "js" && body.includes("const NEUTRON ="),
  )[2];
  const api = await import(
    "data:text/javascript;base64," +
      Buffer.from(
        source + "\nexport {prepare,claim,upload,listMessages};",
      ).toString("base64")
  );
  const key = Buffer.alloc(32, 7),
    room = {
      roomHash: "A".repeat(43),
      sessionId: "test-session",
      sessionKey: key,
    };
  const hash = "B".repeat(43),
    createdAt = "2026-11-15T00:00:00.000Z",
    publicKey = "C".repeat(87),
    descriptor = { messageHash: hash, createdAt };
  let corrupt = false;
  const hmac = (value) =>
    createHmac("sha256", key).update(value).digest("base64url");
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, options = {}) => {
    assert.equal(options.credentials, "omit");
    const path = new URL(url).pathname;
    if (path === "/api/room")
      return Response.json({ v: 2, messages: [descriptor] });
    const body = JSON.parse(options.body),
      purpose = path.endsWith("/prepare")
        ? "prepare"
        : path.endsWith("/claim")
          ? "download"
          : "upload";
    assert.equal(
      body.proof,
      hmac(
        [
          purpose,
          room.roomHash,
          body.messageHash || "",
          body.clientPublicKey || "",
        ].join("\n"),
      ),
    );
    if (purpose === "upload")
      return Response.json({ accepted: true }, { status: 202 });
    const result = {
      messageHash: hash,
      createdAt,
      publicKey,
      nonce: "test",
      ciphertext: "encrypted",
    };
    result.proof = corrupt
      ? "A".repeat(43)
      : hmac(
          [
            "server-" +
              (purpose === "prepare" ? "upload" : "download") +
              "-key",
            room.roomHash,
            hash,
            createdAt,
            publicKey,
          ].join("\n"),
        );
    return Response.json(result);
  };
  try {
    assert.deepEqual(await api.listMessages(room.roomHash), [descriptor]);
    const prepared = await api.prepare(room);
    assert.equal(prepared.messageHash, hash);
    assert.equal(
      (await api.claim(room, descriptor, "fresh-key")).createdAt,
      createdAt,
    );
    assert.deepEqual(
      await api.upload(room, prepared, {
        clientPublicKey: "ephemeral",
        nonce: "nonce",
        ciphertext: "ciphertext",
      }),
      { accepted: true },
    );
    corrupt = true;
    await assert.rejects(
      () => api.prepare(room),
      /Invalid Neutron server proof/,
    );
  } finally {
    globalThis.fetch = previous;
  }
});
test(
  "documented Python derives the same room material and HMAC proof",
  { timeout: 20000 },
  (t) => {
    const source = snippets.find(([, lang]) => lang === "python")[2],
      python =
        process.env.BZN_PYTHON ||
        (process.platform === "win32" ? "python3.13" : "python3");
    const command =
      'import sys,json\nns={}\nexec(compile(sys.stdin.read(),"guide-example.py","exec"),ns)\nh,r=ns["room_material"]("documentation-test-PIN")\nprint(json.dumps({"hash":h,"root":ns["b64url"](r),"proof":ns["proof"](bytes([7])*32,"prepare",h)}))';
    const result = spawnSync(python, ["-c", command], {
      input: source,
      encoding: "utf8",
      timeout: 15000,
    });
    if (result.error?.code === "ENOENT") {
      t.skip("Python unavailable");
      return;
    }
    assert.equal(result.status, 0, result.stderr || String(result.error));
    const actual = JSON.parse(result.stdout),
      material = pbkdf2Sync(
        "documentation-test-PIN",
        "NEUTRON/room-root/v2",
        600000,
        64,
        "sha256",
      ),
      hash = createHash("sha256")
        .update(
          Buffer.concat([
            Buffer.from("NEUTRON/room-lookup/v2"),
            material.subarray(0, 32),
          ]),
        )
        .digest("base64url");
    assert.deepEqual(actual, {
      hash,
      root: material.subarray(32).toString("base64url"),
      proof: createHmac("sha256", Buffer.alloc(32, 7))
        .update("prepare\n" + hash + "\n\n")
        .digest("base64url"),
    });
  },
);
