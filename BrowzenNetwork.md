# Browzen Network

## Start here — instructions for an integration agent

**Purpose:** give this document to the coding agent maintaining your website and ask it to make that website available at a public-key `.bzn` address. This is an integration guide, not just a product introduction. The Host and Address pages link to this document on GitHub.

Keep the existing HTTP website and normal domain working. Add a BZN host process/adapter beside it; do not replace DNS, rename the existing domain, expose an admin interface, or send the private key to Neutron. A backend written in Python, Go, Rust, JavaScript or another language may call Neutron directly over HTTPS. It does not need an AI/browser automation agent, an open Host tab, Puter, or changes to the website's cross-origin response policy. A real background process must remain running to serve visitors.

### Implementation checklist

1. Ask the owner for a **dedicated public website port** and an existing BZN private-key file, or generate one identity locally using [Address](https://browzen.nxlabtw.com/bzn/address). Display the derived address. Keep the key outside source control and logs, with owner-controlled permissions. Do not invent a human-readable domain: public website identities use the full public-key address encoding.
2. Choose an existing compatible implementation or implement **both** layers below: Neutron room authentication/encryption and the BZN website protocol. Reuse the reference algorithms and wire encoding exactly; a generic chat client or an HTTP fetch proxy is not a BZN host.
3. Join the public room whose PIN is the 52-character address stem, **without `.bzn`**. Poll descriptors and claim/decrypt messages. HPKE-open only valid `bzn/1` hello packets with the website's private key.
4. Validate the hello, join its independent `.input` and `.output` rooms, derive direction keys and send the challenge-bound encrypted confirmation. Never accept private room PINs in plaintext from the public mailbox.
5. Reassemble authenticated BZN requests. Check that their virtual URL belongs to this exact BZN address, then call only the configured local HTTP service. Return status, safe headers and binary body through the encrypted output channel. Keep relative resource paths working; do not let visitors choose arbitrary upstream hosts or ports.
6. Implement ACKs, retransmission, bounded request deduplication, heartbeats, expiry, memory/size limits and clean shutdown. A replayed POST must not execute twice within the live session. Never silently switch failed BZN traffic to public direct connections or Puter.
7. Test HTML, stylesheets, images, JavaScript, a form/API POST, page navigation, malformed messages, wrong keys, disconnected Neutron and duplicate requests. Report what was actually tested; do not claim DNS registration, Tor anonymity, forward secrecy or universal browser compatibility.

**Deliverables:** runnable host adapter/process, dependency versions and reproducible start command, owner-controlled key loading, derived `.bzn` address, application configuration and integration tests. Explain any missing cryptographic dependency explicitly instead of replacing it with dummy code.

### Two ways to host — do not confuse them

| Mode | What runs | Local website changes |
| --- | --- | --- |
| Browser Host | Owner keeps `/bzn/host` open; browser reads localhost | Browser-enforced local-network permission and cross-origin access setup are required; the page explains them |
| Native/API host | Owner runs an adapter beside the website, calling Neutron HTTPS APIs | No browser CORS configuration is needed for server-to-server HTTP; still enforce the configured upstream boundary |

The bundled `BznHost` is currently a **browser implementation**, not a ready-made Python/Go/Node hosting daemon. Native integration is the implementation task described here. The direct HTTP examples below are real transport examples, but are **not falsely presented as a complete host**: OPAQUE and the encryption layers must also be implemented using compatible libraries.

## Overview

Public-key website addresses, encrypted end-to-end through Neutron. Built for **Browzen Web**, independently of the desktop Tor browser. This is an experimental application protocol, not DNS, Tor, or an anonymity guarantee.

[Main repository](https://github.com/NeuralNexusLab-nh/Browzen) · [Create an address](https://browzen.nxlabtw.com/bzn/address) · [Host a website](https://browzen.nxlabtw.com/bzn/host) · [Open Browzen Web](https://browzen.nxlabtw.com/) · [README](README.md)

## Addresses and keys

Each address is the full 32-byte X25519 public key encoded as **52 lowercase, unpadded Base32 characters**, followed by `.bzn`: **56 characters total**. Alphabet: `a–z`, `2–7`. The final character must use canonical zero padding bits. The address has **no checksum**. Surrounding whitespace and uppercase letters can be normalized; an altered key is never silently corrected into another website.

Generate **one** random address, or search for a vanity prefix. Generation runs in a cancellable local Worker. The page displays the address and copyable private key, offers a JSON backup, and carries the key directly into Host **in memory**, never in a URL. Refreshing or closing the page loses an unexported key. The `bzn1.` private-key format stores a 32-byte seed used by HPKE's deterministic X25519 key derivation; it is not an Ed25519 key or a Tor onion-service key.

To share a working site with visitors, use `https://browzen.nxlabtw.com/?bzn=<full-public-key-address.bzn>` with the generated **public** address URL-encoded as the parameter. This BZN entry does not require Puter. The ordinary web-browsing sign-in screen intentionally shows only the Puter login button; never put a private key or session secret in a shared URL.

Anyone holding the private key can impersonate the site. Import keys only into a Browzen deployment whose code and operator you trust. HTTPS protects delivery in transit, not against malicious code served by the deployment. There is no key recovery or revocation registry.

### Vanity estimates

For an unrestricted leading prefix of length `n`, expected work is `32^n` key pairs. Four characters average 1,048,576 attempts; five average 33,554,432. The page measures the actual device's rate and estimates average total search time. These are probabilities, not a progress percentage, deadline, or guarantee. Prefixes are limited to eight characters to avoid accidental unbounded input; even shorter searches can be impractically long. Cancel stops the Worker.

## Host a local website

1. Run a dedicated local HTTP website on a port such as `3000`.
2. Open `/bzn/host`, import the private key, and enter the port.
3. Configure the website's CORS using the exact origin shown on that page. It is detected from `location.origin`, so alternate Browzen domains and local development ports work without a hard-coded primary domain.
4. Grant browser local-network access if requested, then choose **Start hosting**.
5. Wait for **Hosting**. Keep the Host page open and the computer awake.

Host probes the configured service before joining the public mailbox. It uses only `http://127.0.0.1:<selected-port>`; arbitrary hostnames, other ports and redirects are blocked. Starting exposes that service's routes, including write APIs, to visitors. Do not expose an admin panel, development debugger, credential store or sensitive personal service.

The Host page provides the browser-only setup headers for the current origin, separately from the API examples. Respond to `OPTIONS` with 204, include required headers on error responses, and allow only request headers your application needs. Use an explicit list of trusted Browzen origins, never unrestricted Origin reflection. A local-network permission prompt does **not** bypass CORS. None of this is required for a native server-to-server host, and the integration code examples do not install or configure CORS middleware.

Requests omit normal localhost cookies and strip sensitive/local transport headers, including Authorization. Browser Fetch does not expose Set-Cookie or allow arbitrary Host/Origin/Cookie headers. Accordingly, this browser-only host is suitable for public/static sites and compatible APIs, **not a transparent replacement for every HTTP server or authentication flow**. Local redirects are currently rejected, including same-origin redirects; configure routes to return their final response. Absolute localhost asset URLs must be changed to relative URLs.

## Encrypted connection

The public address stem is the Neutron mailbox PIN. Anyone can join that public mailbox; it provides rendezvous, **not access control**. Sensitive handshake data is encrypted before it reaches the mailbox.

- HPKE: **DHKEM(X25519, HKDF-SHA256), HKDF-SHA256, AES-256-GCM** using the bundled hpke-js implementation.
- The initial encrypted handshake contains protocol version, recipient address, a random session ID, two independent 32-byte random PINs (Base64URL plus `.input`/`.output`), a random session secret, a challenge and an expiry.
- `input` means visitor → Host; `output` means Host → visitor. Independent direction keys are derived with HKDF-SHA256. Every packet uses AES-256-GCM, a random 96-bit nonce, and authenticated protocol/session/direction/sequence metadata.
- Host returns an encrypted `session.confirm` bound to the original challenge and address. Website requests do not start before confirmation.
- Sequence replay protection, request IDs, bounded duplicate-response caching, SHA-256 transfer integrity, fragmentation, encrypted ACKs and retries handle duplicated, reordered or missed packets. Mutating requests reuse their request ID for transport retries; the Host caches each result within the live session.
- Pings run every 10 seconds; a session closes after approximately 45 seconds without authenticated inbound traffic. A sleeping/background-throttled tab may require a new connection.
- A failed BZN connection never falls back to Puter or a direct website connection. External-origin resources are blocked for a BZN site in this implementation; host required assets under the BZN site's own origin.

**Safe · Encrypted connection** means the channel has confirmed possession of the addressed key and encrypts content between visitor and Host. It does not certify the content, exclude malicious scripts, promise anonymity, or assert that Neutron is unreachable by an attacker.

This initial static-recipient-key handshake **does not provide forward secrecy against later compromise of the Host private key**: a party that recorded handshakes and later obtains that key may recover those sessions. Neutron and its infrastructure can observe source IPs, timing, sizes and room activity. Neutron's own extra encryption layers do not change these facts. No independent security audit has been completed.

## Host with code — no web agent

The same exported API can be called directly from a **trusted browser application**:

```js
import { BznHost } from './asset/bzn/protocol.js';

const host = await new BznHost({
  secret: privateKey, // bzn1.…; never put this in a URL
  port: 3000,
  onState: (message, details) => console.log(message, details),
  onError: error => console.error(error.message)
}).start();

// Later:
host.stop();
```

Import from your trusted Browzen deployment, not a random third-party copy. `onState` does not log the key. A custom trusted `serve(request)` adapter can replace localhost Fetch; it receives `{port, url, method, headers, body, signal}` and returns `{status, statusText, headers, body}` with body encoded as unpadded Base64URL. The Host checks the BZN target origin before calling it. An adapter is privileged code: preserve target restrictions and response limits.

Client API:

```js
import { BznClient } from './asset/bzn/protocol.js';
const client = await new BznClient(address, { onState: console.log }).connect();
const response = await client.request({
  url: `https://${address}/`, method: 'GET', headers: {}
});
// response.body is an ArrayBuffer.
client.close();
```

This is not an AI/browser automation agent. BZN does not use Puter Fetch or a Puter account. Neutron's current adapter uses browser Web Crypto, OPAQUE/WASM and HTTP polling. `makeRoom(pin)` can inject a compatible transport: it supplies async `start(onMessage)`, async `send(json)` and `close()`. A native host must also adapt browser-dependent cryptography/HTTP entry points; simply importing this browser module in Node is not sufficient. See the language-neutral specification and direct HTTP examples below.

### Wire format v1

Public mailbox messages use `{app:"bzn/1",type:"hello",enc,ciphertext}`. Encrypted handshake plaintext uses `{v:1,address,sid,input,output,seed,challenge,expires}`. Private-room envelopes use `{app:"bzn/1",v:1,sid,dir,seq,iv,data}`. AES-GCM AAD is UTF-8 JSON `[1,sid,dir,seq]`.

Encrypted payloads carry transfer parts `{type:"part",id,i,n,hash,part}` or `{type:"ack",ids:["transferId:index"]}`. Completed transfers decode to JSON `session.confirm`, `ping`, `pong`, `request`, or `response`. Request/response IDs bind results to callers. Do not execute received JSON as code. See the implementation for canonical encoding, validation, bounds and HKDF domain separators.

## Direct Neutron HTTPS API — no Host page or web agent

Base URL: **`https://neutron.nxlabtw.com`**. Requests below go directly to this service, not through Puter. POST bodies are UTF-8 JSON with `Content-Type: application/json`. There is no API-key/Bearer-token shortcut: authenticate each room using OPAQUE. Never send the room PIN, BZN private key, root key or OPAQUE session key as an HTTP field.

All binary values use unpadded Base64URL. In the specification below, `||` means byte concatenation, `UTF8` is UTF-8 encoding, and HMAC/digest results are raw bytes until explicitly encoded. Preserve the exact server-provided `createdAt` string. JSON must be encoded once into UTF-8 before encryption; lengths are **byte lengths**, not character counts.

### 1. Derive a room locally

PINs are case-sensitive ASCII strings, 1–255 characters. Use the public address stem only for the public mailbox; private PINs must have high entropy.

```text
material = PBKDF2-HMAC-SHA256(UTF8(PIN), UTF8("NEUTRON/room-root/v2"), 600000, 64 bytes)
roomHash = Base64URL(SHA256(UTF8("NEUTRON/room-lookup/v2") || material[0:32]))
rootKey = material[32:64]
```

`roomHash` is the API's `hash` field; it is **not** the raw PIN. `rootKey` stays local. Keep separate room/session state for the public, input and output rooms.

### 2. Register/login with compatible OPAQUE

The reference uses **`@47ng/opaque-client` 2.1.5** and its WASM serialization. Another language must produce compatible messages; do not substitute a different OPAQUE ciphersuite, a password hash or an invented challenge. The [reference client](https://github.com/NeuralNexusLab-nh/ACMTN/blob/main/public/scripts/crypto.js) and [Neutron integration specification](https://github.com/NeuralNexusLab-nh/ACMTN/blob/main/docs/NEUTRON-INTEGRATION.md) are the compatibility source of truth.

| Step | HTTP request and JSON fields | Local operation / result |
| --- | --- | --- |
| Register start | `POST /api/auth/register/start` `{hash, request}` | `request = Base64URL(Registration.start(PIN))`; 200 returns `{nonce,response}` |
| Register finish | `POST /api/auth/register/finish` `{nonce, record}` | `record = Base64URL(Registration.finish(PIN, decode(response)))`; expect 204 |
| Login start | `POST /api/auth/login/start` `{hash, request}` | `request = Base64URL(Login.start(PIN))`; returns `{nonce,response}` |
| Login finish | `POST /api/auth/login/finish` `{nonce, final}` | `final = Base64URL(Login.finish(PIN, decode(response)))`; returns `{sessionId,expiresInMs}` |

A 409 on register start means the room credential exists: proceed to login. Obtain `sessionKey = Login.getSessionKey()` locally before freeing the login object, and use it only after the server accepts login finish. Renew before the roughly 10-minute session expires. A restarted server can lose credentials: register/login again. No cookie login is involved.

### 3. Send an already BZN-encrypted packet through Neutron

For each request proof, compute:

```text
proof(purpose, messageHash, publicKey) = Base64URL(
  HMAC-SHA256(sessionKey,
    UTF8(purpose + "\n" + roomHash + "\n" + messageHash + "\n" + publicKey)))
```

1. **Prepare:** `POST /api/message/prepare` with `{hash:roomHash,sessionId,proof:proof("prepare","","")}`. Receive `{messageHash,createdAt,publicKey,proof}`. The key is a 65-byte uncompressed P-256 public key, not a BZN X25519 key.
2. **Verify the returned server key**, before encryption: its proof must equal `Base64URL(HMAC-SHA256(sessionKey, UTF8("server-upload-key\n" + roomHash + "\n" + messageHash + "\n" + createdAt + "\n" + publicKey)))`. Use constant-time verification.
3. **Encrypt Neutron content.** Let `salt = SHA256(UTF8(messageHash + "|" + createdAt))`. Add `messageHash` and `timestampUtc:createdAt` to the application packet. For layers `i = 1,2,3`, derive `Ki = HKDF-SHA256(rootKey,salt,UTF8("neutron/v2/content-layer/"+i),32 bytes)`, then AES-256-GCM encrypt the previous layer's bytes with a fresh random 12-byte nonce, a 16-byte tag and no AAD. Each ciphertext includes its trailing tag. Set `content = {nonces:[n1,n2,n3],ciphertext:outermostCiphertext}` with binary fields Base64URL encoded.
4. **Encrypt the upload envelope.** Generate a fresh P-256 ECDH pair. Compute the raw 32-byte ECDH shared secret with the verified prepare key. Derive `K = HKDF-SHA256(shared,salt,UTF8("neutron/v2/upload"),32 bytes)`. AES-256-GCM encrypt JSON `{v:2,messageHash,createdAt,content}` using a fresh random 12-byte nonce and no AAD. `clientPublicKey` is the Base64URL uncompressed public key; `nonce` and `ciphertext` encode this envelope, not the inner content.
5. **Upload:** `POST /api/message` with `{hash,sessionId,messageHash,clientPublicKey,nonce,ciphertext,proof:proof("upload",messageHash,clientPublicKey)}`. Expect **202** `{accepted:true}`. This means accepted by Neutron, **not received by the visitor**. Prepare tokens are one-use; use BZN IDs/ACKs for uncertain outcomes instead of replaying a consumed envelope blindly.

The BZN packet must be encrypted **before** these Neutron layers. A public-mailbox PIN is known to everyone and does not protect plaintext private room names or session secrets.

### 4. Receive, verify and decrypt

1. **List:** `GET /api/room?hash=<roomHash>` returns `{v:2,messages:[{v:2,messageHash,createdAt}]}`. No session is needed just to list these descriptors; they do not include message content.
2. For every unseen descriptor, generate a **fresh P-256 pair**. **Claim:** `POST /api/message/claim` with `{hash,sessionId,messageHash,clientPublicKey,proof:proof("download",messageHash,clientPublicKey)}`.
3. Expect `{v:2,messageHash,createdAt,publicKey,proof,nonce,ciphertext}`. Bind `messageHash` and `createdAt` to the descriptor. Verify the server HMAC using exactly the prepare verification string but with `server-download-key` instead of `server-upload-key`.
4. ECDH with the returned, verified key. Derive the envelope key using the same salt and HKDF info **`neutron/v2/download`**. Open AES-GCM to obtain `{v:2,messageHash,createdAt,content}`; validate all bound fields.
5. Derive the PIN/root content keys and open layers **3 → 2 → 1** with their matching nonces. Decode JSON, check `payload.messageHash` against the descriptor, then pass the still BZN-encrypted packet to the BZN decoder. Do not process failed tags or unverified fields.

Claim does not consume a message; the sender can receive its own packets too. Deduplicate descriptors and BZN transfer/request IDs. Poll serially around every 1–2 seconds, not with overlapping unbounded intervals. Messages expire after about 15 seconds; there is no history recovery.

### JavaScript example — actual `fetch`, not a browser-agent call

This transport example works in a browser with Web Crypto or a modern JavaScript runtime. `room` must come from **the room derivation and successful OPAQUE exchange above** and contain `{roomHash,sessionId,sessionKey}` with `sessionKey` as raw bytes. It demonstrates list, authenticated prepare, server-proof verification and upload of an envelope produced by step 3. It is not a complete OPAQUE or encryption implementation, and deliberately does not send plaintext as ciphertext.

```js
const NEUTRON = 'https://neutron.nxlabtw.com';
const enc = new TextEncoder();
const b64url = bytes => {
  let value = '';
  for (const byte of new Uint8Array(bytes)) value += String.fromCharCode(byte);
  return btoa(value).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
};
const decode64 = value => Uint8Array.from(
  atob(value.replaceAll('-', '+').replaceAll('_', '/') +
    '='.repeat((4 - value.length % 4) % 4)), c => c.charCodeAt(0));
async function hmacKey(room) {
  return crypto.subtle.importKey('raw', room.sessionKey,
    {name: 'HMAC', hash: 'SHA-256'}, false, ['sign', 'verify']);
}
async function proof(room, purpose, hash = '', publicKey = '') {
  const message = `${purpose}\n${room.roomHash}\n${hash}\n${publicKey}`;
  return b64url(await crypto.subtle.sign('HMAC', await hmacKey(room), enc.encode(message)));
}
async function post(path, payload) {
  const response = await fetch(NEUTRON + path, {
    method: 'POST', credentials: 'omit', cache: 'no-store',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload), signal: AbortSignal.timeout(15000)
  });
  const body = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(`Neutron ${response.status}: ${body?.error}`);
  return body;
}
async function listMessages(roomHash) {
  const response = await fetch(NEUTRON + '/api/room?hash=' + encodeURIComponent(roomHash), {
    credentials: 'omit', cache: 'no-store', signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`Neutron ${response.status}`);
  return (await response.json()).messages;
}
async function prepare(room) {
  const result = await post('/api/message/prepare', {
    hash: room.roomHash, sessionId: room.sessionId,
    proof: await proof(room, 'prepare')
  });
  const bound = `server-upload-key\n${room.roomHash}\n${result.messageHash}\n${result.createdAt}\n${result.publicKey}`;
  const valid = await crypto.subtle.verify('HMAC', await hmacKey(room),
    decode64(result.proof), enc.encode(bound));
  if (!valid) throw new Error('Invalid Neutron server proof');
  return result;
}
async function upload(room, prepared, envelope) {
  // envelope is produced by P-256 ECDH + HKDF + AES-GCM, NOT plain JSON.
  return post('/api/message', {
    hash: room.roomHash, sessionId: room.sessionId,
    messageHash: prepared.messageHash,
    clientPublicKey: envelope.clientPublicKey,
    nonce: envelope.nonce, ciphertext: envelope.ciphertext,
    proof: await proof(room, 'upload', prepared.messageHash, envelope.clientPublicKey)
  });
}
async function claim(room, descriptor, freshPublicKey) {
  const result = await post('/api/message/claim', {
    hash: room.roomHash, sessionId: room.sessionId,
    messageHash: descriptor.messageHash, clientPublicKey: freshPublicKey,
    proof: await proof(room, 'download', descriptor.messageHash, freshPublicKey)
  });
  if (result.messageHash !== descriptor.messageHash || result.createdAt !== descriptor.createdAt)
    throw new Error('Descriptor mismatch');
  const bound = `server-download-key\n${room.roomHash}\n${result.messageHash}\n${result.createdAt}\n${result.publicKey}`;
  if (!await crypto.subtle.verify('HMAC', await hmacKey(room), decode64(result.proof), enc.encode(bound)))
    throw new Error('Invalid Neutron server proof');
  return result; // Still encrypted: decrypt using step 4 before processing.
}
```

For OPAQUE registration, handle the documented 409 response explicitly instead of feeding it through this strict success-only `post` helper. On 401, reauthenticate; do not reuse a rejected proof indefinitely.

### Python example — direct HTTP, no browser required

This uses only the Python standard library for **HTTP, room derivation and HMAC**. The OPAQUE binding and AES-GCM/HPKE primitives are separate required dependencies; Python's standard library does not provide them. Supply a successful OPAQUE session with raw `session_key` bytes. Do not create fake session keys or use the BZN private key as a session key.

```python
import base64
import hashlib
import hmac
import json
from urllib.parse import urlencode
from urllib.request import Request, urlopen

NEUTRON = "https://neutron.nxlabtw.com"

def b64url(value):
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("ascii")

def room_material(pin):
    pin_bytes = pin.encode("ascii")
    if not 1 <= len(pin_bytes) <= 255:
        raise ValueError("Invalid room PIN length")
    material = hashlib.pbkdf2_hmac("sha256", pin_bytes,
        b"NEUTRON/room-root/v2", 600_000, dklen=64)
    room_hash = b64url(hashlib.sha256(
        b"NEUTRON/room-lookup/v2" + material[:32]).digest())
    return room_hash, material[32:]

def post(path, payload):
    request = Request(NEUTRON + path, method="POST",
        data=json.dumps(payload, separators=(",", ":")).encode("utf-8"),
        headers={"Content-Type": "application/json"})
    with urlopen(request, timeout=15) as response:
        return None if response.status == 204 else json.load(response)

def list_messages(room_hash):
    with urlopen(NEUTRON + "/api/room?" + urlencode({"hash": room_hash}), timeout=15) as response:
        return json.load(response)["messages"]

def proof(session_key, purpose, room_hash, message_hash="", public_key=""):
    value = "\n".join((purpose, room_hash, message_hash, public_key)).encode("utf-8")
    return b64url(hmac.digest(session_key, value, "sha256"))

def verify_server(session_key, purpose, room_hash, result):
    value = "\n".join(("server-" + purpose + "-key", room_hash,
        result["messageHash"], result["createdAt"], result["publicKey"])).encode("utf-8")
    expected = b64url(hmac.digest(session_key, value, "sha256"))
    if not hmac.compare_digest(expected, result["proof"]):
        raise ValueError("Invalid Neutron server proof")

def prepare(room_hash, session_id, session_key):
    result = post("/api/message/prepare", {
        "hash": room_hash, "sessionId": session_id,
        "proof": proof(session_key, "prepare", room_hash)})
    verify_server(session_key, "upload", room_hash, result)
    return result

def upload(room_hash, session_id, session_key, prepared, envelope):
    # envelope must already contain the encrypted P-256 transport envelope.
    return post("/api/message", {
        "hash": room_hash, "sessionId": session_id,
        "messageHash": prepared["messageHash"],
        "clientPublicKey": envelope["clientPublicKey"],
        "nonce": envelope["nonce"], "ciphertext": envelope["ciphertext"],
        "proof": proof(session_key, "upload", room_hash,
            prepared["messageHash"], envelope["clientPublicKey"])})

def claim(room_hash, session_id, session_key, descriptor, fresh_public_key):
    result = post("/api/message/claim", {
        "hash": room_hash, "sessionId": session_id,
        "messageHash": descriptor["messageHash"], "clientPublicKey": fresh_public_key,
        "proof": proof(session_key, "download", room_hash,
            descriptor["messageHash"], fresh_public_key)})
    if (result["messageHash"], result["createdAt"]) != (descriptor["messageHash"], descriptor["createdAt"]):
        raise ValueError("Descriptor mismatch")
    verify_server(session_key, "download", room_hash, result)
    return result  # Decrypt the envelope and content layers before use.
```

`urllib.error.HTTPError` exposes HTTP status via `.code`. Handle 409 only during registration, 401 by reauthentication, 404 claim as expired/missing data, 400/413 as an invalid/oversized request, and network/5xx failures with bounded backoff. Do not automatically retry a website mutation as a new request ID. Python/Go/Rust integrations need **the same** binary OPAQUE, HPKE and AES-GCM wire formats; language choice must not change the protocol.

## BZN host interoperability details

The Neutron APIs above carry application packets; the following is what makes those packets a **website host** rather than ordinary room chat. These fields and algorithm labels match the shipped v1 implementation.

| Item | Required format |
| --- | --- |
| Private identity | `bzn1.` + Base64URL(32-byte seed); derive X25519 using **RFC 9180 DHKEM DeriveKeyPair**, not raw clamping of the seed |
| Public mailbox | Neutron PIN is the address stem; packet `{app:"bzn/1",type:"hello",enc,ciphertext}` |
| HPKE suite | Base mode, KEM `0x0020`, KDF `0x0001`, AEAD `0x0002`; info is UTF8(`BROWZEN-NETWORK/v1/` + full lowercase address); empty AAD; one seal/open |
| Hello plaintext | `{v:1,address,sid,input,output,seed,challenge,expires}`; seed/challenge each encode 32 random bytes, sid encodes 16 random bytes |
| Private PINs | Independent 32 random bytes, Base64URL encoded, followed by `.input` and `.output`; do not derive both names from one exposed prefix |
| Hello expiry | Reject expired hellos or timestamps over 120 seconds ahead; current client sets 90 seconds |
| Direction key | HKDF-SHA256(IKM=decoded hello seed, salt=UTF8(sid), info=UTF8(`BZN/v1/input` or `BZN/v1/output`), length=32) |
| Session envelope | `{app:"bzn/1",v:1,sid,dir,seq,iv,data}`; AES-256-GCM, random 12-byte iv, 16-byte trailing tag; data is Base64URL ciphertext |
| Session AAD | UTF8 of compact JSON `[1,sid,dir,seq]`; positive integer sequence, independent monotonic sender counter per direction; reject replayed sequence values |
| Transfer encoding | Encode an application JSON object as UTF-8, SHA-256 it, split into chunks up to 2048 bytes; transfer ID encodes 16 random bytes |
| Transfer part | Encrypted `{type:"part",id,i,n,hash,part}`; i is zero-based, n is total chunks, hash is Base64URL SHA-256 of the **whole transfer**, part is Base64URL chunk |
| Transfer ACK | Encrypted `{type:"ack",ids:["transferId:index",...]}`; no ACK-of-ACK; retransmit missing chunks in freshly sealed envelopes |

After reassembly and hash verification, application messages are:

```json
{"type":"session.confirm","sid":"<original sid>","challenge":"<original challenge>","address":"<full .bzn address>"}
```

```json
{"type":"request","id":"<Base64URL of 16 random bytes>","url":"https://<52-character-stem>.bzn/path?query=1","method":"POST","headers":{"Content-Type":"application/json"},"body":"<Base64URL request bytes>"}
```

```json
{"type":"response","id":"<same request id>","status":200,"statusText":"OK","headers":{"content-type":"text/html"},"body":"<Base64URL response bytes>"}
```

For an application error send `{type:"response",id,error:"safe error text"}` instead of body/status. For an empty successful body send `body:""`. Omit a request body on GET/HEAD. Headers must be safe string values, never privileged local credentials. Heartbeats are `{type:"ping"}` and `{type:"pong"}`, passed through the same fragmented/encrypted message machinery. Do not send the old literal strings `password:verified`, `request:...` or `connection:live`; they are not this protocol.

Accept a hello only if its full address equals the host identity, version is 1, session ID/challenge/secret/PIN lengths and alphabets match, PINs are distinct and expiry is valid. Reject unexpected message types and oversized/malformed JSON. Request virtual origin must be exactly `https://<full address>` with no credentials or non-default port. Forward only the path/query to the configured upstream. Keep the virtual address in links and responses; do not replace it with localhost. Run at most one active host instance per identity unless implementing coordinated session ownership.

Reference implementations: [identity and BZN crypto](asset/bzn/crypto.js), [HPKE bundle and license](asset/bzn/vendor/), [Neutron room adapter](asset/bzn/neutron.js), [transfer/ACK layer](asset/bzn/link.js), [host/client protocol](asset/bzn/protocol.js). Validate a native port against these implementations and their tests before claiming compatibility. The guide describes wire requirements, not permission to weaken sandboxing or execute messages in the privileged host process.

## Limits and deployment

Neutron currently retains messages for about 15 seconds, recommends application payloads below 8 KB, and does not guarantee delivery. BZN uses 2 KB binary chunks with an initial six-chunk send window and retransmission after five seconds. Transfer timeout: 180 seconds; handshake expiry: 90 seconds. Default browser Host limits: eight sessions, four active requests per session, 1 MB request body, 5 MB resource, 8 MB encoded transfer. This is for small sites, not video streaming, large downloads, WebSockets, WebRTC or arbitrary TCP. Background throttling and relay outages can interrupt hosting.

Website rendering reuses Browzen Web's existing restricted content engine and compatibility limits. It is not native browser origin support for a new Internet TLD. Runtime website state remains temporary; private keys and Host settings are not automatically persisted. Copies, key backups and OS/browser traces are outside that guarantee.

Serve the repository as static files. `/bzn/address` and `/bzn/host` must resolve to their corresponding `index.html`; the included `edgeone.json` provides exact rewrites for EdgeOne. Other static hosts may use directory indexes or equivalent rewrites. No wildcard DNS is needed. Allow the page's documented Neutron module/WASM/API requests in any additional deployment CSP; Host also needs loopback access. Do not grant this access to rendered website frames.

Build the pinned local HPKE bundle and run tests:

```sh
cd asset/bzn
npm ci
npm run build
npm test
# Local app on :7360 and a dedicated test website on :7361:
node dev-server.mjs
```

Vendored HPKE source is reproducible from pinned dependencies and the lockfile; see `vendor/LICENSE.txt`. Neutron's browser module is currently loaded from its live HTTPS origin when connecting, so its operator and delivered code remain a trust dependency.

## Responsible use

Use only services and content you are authorized to host. Follow applicable laws and third-party rights. BZN does not make harmful content safe or guarantee anonymity, availability or freedom from loss. Provided as is under the project's license.

Made by [NXLabTW](https://nxlabtw.com). [Back to README](README.md).
