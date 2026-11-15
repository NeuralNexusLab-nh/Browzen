# Browzen Network

Public-key website addresses, encrypted end-to-end through Neutron. Built for **Browzen Web**, independently of the desktop Tor browser. This is an experimental application protocol, not DNS, Tor, or an anonymity guarantee.

[Create an address](https://browzen.nxlabtw.com/bzn/address) · [Host a website](https://browzen.nxlabtw.com/bzn/host) · [Open Browzen Web](https://browzen.nxlabtw.com/) · [Back to README](README.md)

## Addresses and keys

Each address is the full 32-byte X25519 public key encoded as **52 lowercase, unpadded Base32 characters**, followed by `.bzn`: **56 characters total**. Alphabet: `a–z`, `2–7`. The final character must use canonical zero padding bits. The address has **no checksum**. Surrounding whitespace and uppercase letters can be normalized; an altered key is never silently corrected into another website.

Generate **one** random address, or search for a vanity prefix. Generation runs in a cancellable local Worker. The page displays the address and copyable private key, offers a JSON backup, and carries the key directly into Host **in memory**, never in a URL. Refreshing or closing the page loses an unexported key. The `bzn1.` private-key format stores a 32-byte seed used by HPKE's deterministic X25519 key derivation; it is not an Ed25519 key or a Tor onion-service key.

Anyone holding the private key can impersonate the site. Import keys only into a Browzen deployment whose code and operator you trust. HTTPS protects delivery in transit, not against malicious code served by the deployment. There is no key recovery or revocation registry.

### Vanity estimates

For an unrestricted leading prefix of length `n`, expected work is `32^n` key pairs. Four characters average 1,048,576 attempts; five average 33,554,432. The page measures the actual device's rate and estimates average total search time. These are probabilities, not a progress percentage, deadline, or guarantee. Prefixes are limited to eight characters to avoid accidental unbounded input; even shorter searches can be impractically long. Cancel stops the Worker.

### Built-in HTTPS shortcuts

| Shortcut | Destination |
| --- | --- |
| `nxlabtw.bzn` | `https://nxlabtw.com/` |
| `browzen.bzn` | `https://browzen.nxlabtw.com/` |
| `neutron.bzn` | `https://neutron.nxlabtw.com/` |
| `acmtn.bzn` | `https://neutron.nxlabtw.com/` |

These are reserved local shortcuts, **not** public-key sites. They open the actual HTTPS destination directly in the outer browser, showing its real URL, without Puter or Neutron. Ordinary network/IP visibility applies. Other browsers do not resolve BZN names; enter them inside Browzen Web.

## Host a local website

1. Run a dedicated local HTTP website on a port such as `3000`.
2. Open `/bzn/host`, import the private key, and enter the port.
3. Configure the website's CORS using the exact origin shown on that page. It is detected from `location.origin`, so alternate Browzen domains and local development ports work without a hard-coded primary domain.
4. Grant browser local-network access if requested, then choose **Start hosting**.
5. Wait for **Hosting**. Keep the Host page open and the computer awake.

Host probes the configured service before joining the public mailbox. It uses only `http://127.0.0.1:<selected-port>`; arbitrary hostnames, other ports and redirects are blocked. Starting exposes that service's routes, including write APIs, to visitors. Do not expose an admin panel, development debugger, credential store or sensitive personal service.

The Host page provides copyable CORS headers and an Express example for the current origin. Respond to `OPTIONS` with 204, include CORS on error responses, and allow only headers your application needs. Use an explicit list of trusted Browzen origins, never unrestricted Origin reflection. A local-network permission prompt does **not** bypass CORS.

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

This is not an AI/browser automation agent. BZN does not use Puter Fetch or a Puter account. Neutron's current adapter uses browser Web Crypto, OPAQUE/WASM and HTTP polling. A native Node/Python host requires a compatible adapter implementing Neutron's authentication and cryptography; a plain HTTP POST is insufficient. `makeRoom(pin)` can inject such an adapter: it supplies async `start(onMessage)`, async `send(json)` and `close()`.

### Wire format v1

Public mailbox messages use `{app:"bzn/1",type:"hello",enc,ciphertext}`. Encrypted handshake plaintext uses `{v:1,address,sid,input,output,seed,challenge,expires}`. Private-room envelopes use `{app:"bzn/1",v:1,sid,dir,seq,iv,data}`. AES-GCM AAD is UTF-8 JSON `[1,sid,dir,seq]`.

Encrypted payloads carry transfer parts `{type:"part",id,i,n,hash,part}` or `{type:"ack",ids:["transferId:index"]}`. Completed transfers decode to JSON `session.confirm`, `ping`, `pong`, `request`, or `response`. Request/response IDs bind results to callers. Do not execute received JSON as code. See the implementation for canonical encoding, validation, bounds and HKDF domain separators.

## Limits and deployment

Neutron currently retains messages for about 15 seconds, recommends application payloads below 8 KB, and does not guarantee delivery. BZN uses 2 KB binary chunks with an initial six-chunk send window and retransmission after five seconds. Transfer timeout: 180 seconds; handshake expiry: 90 seconds. Default browser Host limits: eight sessions, four active requests per session, 1 MB request body, 5 MB resource, 8 MB encoded transfer. This is for small sites, not video streaming, large downloads, WebSockets, WebRTC or arbitrary TCP. Background throttling and relay outages can interrupt hosting.

Website rendering reuses Browzen Web's existing restricted content engine and compatibility limits. It is not native browser origin support for a new Internet TLD. Runtime website state remains temporary; private keys and Host settings are not automatically persisted. Copies, key backups and OS/browser traces are outside that guarantee.

Serve the repository as static files. `/bzn/address` and `/bzn/host` must resolve to their corresponding `index.html`; if the host lacks directory-index handling, add exact rewrites for these two paths. No wildcard DNS is needed. Allow the page's documented Neutron module/WASM/API requests in any additional deployment CSP; Host also needs loopback access. Do not grant this access to rendered website frames.

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
