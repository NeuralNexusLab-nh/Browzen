# Browzen Web

Static web version. Requires Puter sign-in; **no Tor**. DuckDuckGo is the default. Serve `index.html` and `/asset` over HTTPS at `browzen.nxlabtw.com`. No wildcard DNS, wildcard certificate, application server or target-proxy server is required. Localhost is development-only.

## Isolation and requests

The trusted Browzen interface retains the Puter session. Each website document runs in `sandbox="allow-scripts allow-forms"`, **without `allow-same-origin`**, using an opaque security origin. The forms flag permits submit events; native `form-action 'none'` still blocks unmediated submission. Website code cannot read the interface DOM, account cookies or native account-origin storage. A private MessageChannel links the website to a validated request/action broker; it never supplies a Puter token to the website.

Website HTML, scripts, styles and resources are fetched through Puter. The broker validates HTTP(S) targets and redirect destinations, rejects local/reserved literal addresses and names, strips unsafe transport headers, limits requests/body sizes and has no direct-fetch fallback. Target DNS resolution and infrastructure remain Puter's responsibility; DNS rebinding and its resolver-side SSRF policy have not been independently audited.

The content document's native CSP blocks direct Fetch/XHR, workers, nested frames, forms, plugins and ordinary remote resource URLs. Rewritten resources use Blob/data URLs. The outer document also constrains frame navigation. A missed URL rewrite should fail rather than fall back to a local request. Opaque cross-origin images can be rendered using parent-created Blob URLs without supplying their bytes to the page. Cross-origin script/style source requires the server's CORS approval; unsupported CORS preflights are rejected. This is intentionally more restrictive than a normal browser.

Nested browsing contexts are disabled to avoid uninstrumented realms. WebRTC, WebTransport, WebSockets, SharedWorkers, website Service Workers and local-device APIs are unavailable. These restrictions break some websites. **This is not an audited operating-system network boundary or a guarantee against all browser/DNS leaks.**

## State and controls

Cookies use per-tab, per-top-host memory jars with domain/path/Secure/HttpOnly checks. Third-party embedded requests do not receive cookies by default. Local/session storage is virtual and memory-only, partitioned by top host and origin. IndexedDB and CacheStorage compatibility is in-memory per document and is not persistent across navigation. Browzen never deletes the parent origin's Puter storage to clear a website.

Managed links, window.open (including blank-then-navigate), basic named popups, close/focus, GET/POST forms, standard inputs, history/hash changes, Fetch/XHR and rewritten classic/module scripts are supported on a best-effort basis. Clipboard operations require an explicit prompt each time; notifications also require browser permission. Camera, microphone and location cannot be enabled inside this opaque static environment and are shown as unavailable rather than falsely reporting success.

Reload creates a fresh website session. Refresh Identity closes all website tabs, releases their in-memory state and Blob URLs, and keeps Puter signed in. The outer browser, OS and Puter can retain account/session/network records. Garbage collection and storage-device secure erasure are not guaranteed.

NoScript blocks target scripts while retaining the trusted navigation/permission bridge. Safer additionally blocks scripts on HTTP sites; Safest blocks all target scripts. Device permissions are not relaxed by these settings.

## Fingerprinting and limits

Best-effort JS guards block WebRTC and canvas/WebGL/audio readback, reduce hardware/language reports and use UTC. Viewport buckets reduce layout variation. **These are not engine-level anti-fingerprinting protections.** CSS font measurement, physical screen/DPI, host browser behavior, account sign-ins and information shared with sites can still distinguish users. Do not use Browzen Web for anonymity-critical activity or assume Tor Browser equivalence.

Compatibility is incomplete: nested frames, native device access, synchronous XHR, streaming/range-heavy media, DRM, full browser extensions, arbitrary popup DOM access, transferable messages, complex import maps and some script-generated URLs are unsupported or limited. Native CSP may block resources the converter does not understand. Tests on selected sites do not establish general browser compatibility.

Local tests: `node --test asset/test-policy.mjs asset/test-session-id.mjs asset/single/test-single.mjs asset/single/test-host.mjs`. See `single/NOTICE.md` for current renderer dependencies and source/build notes. The older files under `runtime/` are retained as historical source/vendor notices; the website entry no longer loads their Service Worker/Scramjet pipeline.
