# Static browser frame compatibility

The web entry point uses `frame-host.js` and `frame-bundle.js`. Child documents
run in opaque frames owned by the trusted host, not uninstrumented website
iframes. Documents and supported network requests still use Puter.

## Important boundaries

- Native `connect-src` and `frame-src` remain `none`; no direct-network fallback.
- Classic same-origin/Blob Workers use mediated Fetch. Their native network
  access remains CSP-blocked. Module Workers, SharedWorkers and dynamic
  importScripts are unsupported.
- Embedding checks honor virtual-origin X-Frame-Options/frame-ancestors.
- Messages check target origin, real parent identity and document epoch.
  Delivery uses a browser-generated postMessage event. `isTrusted` is never
  assigned, and no CAPTCHA response or provider decision is fabricated.
- Zero-sized frames stay scheduled but clipped and non-interactive; hidden
  overlays cannot cover the browser chrome. Frame dimensions follow attributes.
- Frame depth/count and shared byte/request limits bound resource consumption.
- Embedded device permissions are denied. Top-level permission controls remain.
- Detailed page/message/caught-error diagnostics require explicit `debug:true`
  in the local test harness; the application does not enable that option.

## Build and test

Install esbuild as a development dependency, then run:

    node asset/single/build-frame-experiment.mjs
    node --test --test-concurrency=1 asset/single/test-frame-*.mjs

`BROWZEN_ESBUILD_MODULE` can point to an external esbuild module. The historical
build-script filename is retained. Open `/asset/test-fixtures/frames.html`
from a local HTTP server for interactive checks; external tests need Puter.

## Verified in Edge, 2026-11-22

- Google official demo: actual image challenge completed and the demo server
  returned `Verification Success... Hooray!`.
- Google official v2 test key: successful callback reached its parent page.
- Cloudflare official test widget: init/extraParams/execute/complete exchanged
  and its success callback reached the parent.
- Cloudflare's public Workers demo: successful submission, including through
  the Browzen main interface; server response had `success:true`, no error
  codes, and `metadata.result_with_testing_key:true`.
- Worker messaging and native worker XHR blocked by CSP: passed.
- Parent/sibling origin checks, MessagePort transfers, stale epochs, blank
  intrinsics, frame cloning and viewport clipping have focused automated tests.

The Cloudflare demo uses testing keys, not a production reputation challenge.
These checks do not guarantee every production CAPTCHA will accept Puter's IP,
TLS behavior, browser signals or this virtual-origin environment. This is not
an anonymity guarantee or a comprehensive network-leak/security audit.

References: [Google testing keys](https://developers.google.com/recaptcha/docs/faq),
[Cloudflare testing keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/),
[Cloudflare official demo](https://github.com/cloudflare/turnstile-demo-workers).
