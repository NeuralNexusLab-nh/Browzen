# Browzen Web

Static web version. Requires Puter sign-in; no Tor. DuckDuckGo is the default. No application server or server-side target proxy is included.

## Hosting

Serve index.html and /asset over HTTPS. The main origin is https://browzen.nxlabtw.com. Each content tab uses a fresh https://bzn-<16 hex digits>.browzen.nxlabtw.com origin serving this same static build. Configure the main domain and *.browzen.nxlabtw.com in the hosting platform, DNS and HTTPS certificates. DNS alone is insufficient. Do not redirect content hosts to the main origin. Serve /asset/runtime/ files with correct JavaScript and WebAssembly MIME types, not an HTML fallback.

Hostnames are configured in config.js. Content refuses to run on the main account origin. Without working isolated hosts, website tabs fail to start rather than share the Puter login origin. localhost support is development-only and is not required in production. Live DNS/TLS has not been verified.

## Controls and boundaries

Puter delivers website requests without a direct fallback. Managed links, JavaScript popups, GET/POST popup forms, basic opener postMessage and close/focus are supported. Transferable cross-tab messages, document.write into popup handles, WebSockets, site Service Workers, Blob Workers, DRM and some downloads remain unsupported or limited.

Camera, microphone, location, clipboard and notifications require Browzen approval and may also require native browser permission. Clipboard access is mediated for each operation. Native device approvals have not been comprehensively verified and can expose local information. Blocked device requests do not repeatedly prompt until changed in Control Panel.

Refresh Identity retires tabs and attempts client-side deletion of website storage, caches and service workers, without signing out of Puter. Blocked deletion is reported as pending. Closing/crashing the outer browser does not guarantee cleanup. The outer browser can retain history, permissions, caches and the Puter account session. Secure erasure is not promised.

JavaScript guards restrict WebRTC, canvas/audio/WebGL readback and some hardware APIs, with UTC and reduced hardware/language reports in controlled tests. These are not engine-level protections and can be bypassed. CSS font probing, native screen/DPI and engine differences remain relevant. No comprehensive DNS/STUN/IPv6 capture audit or Tor-equivalent anonymity claim is made. Do not use for anonymity-critical activity.

Local Edge tests covered NXLabTW Project to AtlasNote, Docs/Back, inputs/selects, popups, GET/POST forms, bidirectional opener messages and permission blocking. See runtime/NOTICE.md for third-party licensing.
