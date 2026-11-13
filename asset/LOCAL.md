# Browzen Web

Static web version. Requires Puter sign-in; **no Tor**. DuckDuckGo is the default. Serve `index.html` and `/asset` over HTTPS at `browzen.nxlabtw.com`. No wildcard DNS, wildcard certificate, application server or target-proxy server is required. Localhost is development-only.

## Isolation and requests

The trusted Browzen interface retains the Puter session. Each website document runs in `sandbox="allow-scripts allow-forms"`, **without `allow-same-origin`**, using an opaque security origin. The forms flag permits submit events; native `form-action 'none'` still blocks unmediated submission. Website code cannot read the interface DOM, account cookies or native account-origin storage. A private MessageChannel links the website to a validated request/action broker; it never supplies a Puter token to the website.

Website HTML, scripts, styles and resources are fetched through Puter. The broker validates HTTP(S) targets and redirect destinations, rejects local/reserved literal addresses and names, strips unsafe transport headers, limits requests/body sizes and has no direct-fetch fallback. Target DNS resolution and infrastructure remain Puter's responsibility; DNS rebinding and its resolver-side SSRF policy have not been independently audited.

The content document's native CSP blocks direct Fetch/XHR, workers, nested frames, forms, plugins and ordinary remote resource URLs. Rewritten resources use Blob/data URLs. The outer document also constrains frame navigation. A missed URL rewrite should fail rather than fall back to a local request. Cross-origin image bytes are not supplied to page code. Module scripts, explicitly CORS-enabled scripts, and Fetch/XHR reads still require server CORS approval. Fetch preflights send credential-free OPTIONS with a broker-assigned Origin; unapproved methods/headers and preflight redirects are rejected. no-cors probes return opaque responses without body/status/header disclosure, and same-origin mode is checked again on redirects. This compatibility layer is not a complete Fetch Standard implementation.

Classic scripts and CSS may be embedded across origins without CORS, as ordinary sites commonly require. The broker checks their MIME types and any supplied integrity hashes, does not send third-party cookies, and transfers the converted code into the opaque renderer. **This does not reproduce native source-opacity for those JS/CSS responses**: a hostile page can inspect its own renderer. This web implementation is not a full browser-engine implementation of the same-origin policy. Fetch/XHR is not given a general-purpose CORS bypass, and no Puter account credentials are transferred to a website.

HTML is displayed before optional resources finish. Script conversions run in a trusted parser Worker (target code is never evaluated there); classic blocking/defer/async and module scheduling have separate queues. Resources are deduplicated within a document and sent as deltas. CSS font fallbacks prefer WOFF2 to avoid downloading every font format. These are memory-only optimizations, not a persistent website cache. Timing attributes on website iframes expose document/first-content/DOM-ready/load timings and counts for diagnostics; first-content is a render opportunity after DOM attachment, not a paint-trace benchmark.

Stylesheet relations are parsed as token lists, including `preload stylesheet`, with alternate stylesheets kept alternate. Root/body styling metadata is retained when full HTML is converted into fragments. Recognized Rocket Loader scheduling metadata is normalized so the original scripts run through Browzen's own queues, without executing the scheduling wrapper or unlocking `document.write`. This is not support for bypassing Cloudflare security challenges. Site API calls can still fail CORS, preflight or unsupported browser-feature checks even when CSS and application scripts load.

Nested browsing contexts are disabled to avoid uninstrumented realms. WebRTC, WebTransport, WebSockets, SharedWorkers, website Service Workers and local-device APIs are unavailable. These restrictions break some websites. **This is not an audited operating-system network boundary or a guarantee against all browser/DNS leaks.**

## State and controls

The development build supports mediated URL downloads, attachment responses, and generated Blob/data downloads up to 32 MB, with a confirmation prompt and sanitized filenames. Files are saved by the outer browser and are not executed automatically. Downloads remain on disk after Refresh Identity; they are not part of temporary website storage. Large/streaming downloads are not implemented.

Cookies use per-tab, per-top-host memory jars with domain/path/Secure/HttpOnly checks. Third-party embedded requests do not receive cookies by default. Local/session storage is virtual and memory-only, partitioned by top host and origin. IndexedDB and CacheStorage compatibility is in-memory per document and is not persistent across navigation. Browzen never deletes the parent origin's Puter storage to clear a website.

Managed links, window.open (including blank-then-navigate), basic named popups, close/focus, GET/POST forms, standard inputs, history/hash changes, Fetch/XHR and rewritten classic/module scripts are supported on a best-effort basis. Clipboard operations require an explicit prompt each time; notifications also require browser permission. Camera, microphone and location cannot be enabled inside this opaque static environment and are shown as unavailable rather than falsely reporting success.

Reload creates a fresh website session. Refresh Identity closes all website tabs, releases their in-memory state and Blob URLs, and keeps Puter signed in. The outer browser, OS and Puter can retain account/session/network records. Garbage collection and storage-device secure erasure are not guaranteed.

NoScript blocks target scripts while retaining the trusted navigation/permission bridge. Safer additionally blocks scripts on HTTP sites; Safest blocks all target scripts. Device permissions are not relaxed by these settings.

## Fingerprinting and limits

Best-effort JS guards block WebRTC and canvas/WebGL/audio readback, reduce hardware/language reports and use UTC. Viewport buckets reduce layout variation. **These are not engine-level anti-fingerprinting protections.** CSS font measurement, physical screen/DPI, host browser behavior, account sign-ins and information shared with sites can still distinguish users. Do not use Browzen Web for anonymity-critical activity or assume Tor Browser equivalence.

Compatibility is incomplete: nested frames, native device access, synchronous XHR, streaming/range-heavy media, DRM, full browser extensions, arbitrary popup DOM access, transferable messages, complex import maps and some script-generated URLs are unsupported or limited. Native CSP may block resources the converter does not understand. Tests on selected sites do not establish general browser compatibility.

Local tests: `node --test asset/test-policy.mjs asset/test-session-id.mjs asset/single/test-*.mjs`. The rendering fixture checks cross-origin classic code, blocking/defer/async/module order, event attributes and progressive images; a local development server may deliberately delay slow-image.svg to exercise the latter. See `single/NOTICE.md` for current renderer dependencies and source/build notes. The older files under `runtime/` are retained as historical source/vendor notices; the website entry no longer loads their Service Worker/Scramjet pipeline.
