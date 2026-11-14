# Opaque-origin renderer

Browzen's host.js, compiler.js, compile-client.js, compiler-worker.js, resource-policy.js, css-rewrite.js and content-entry.js are project source. The compiler Worker parses and rewrites scripts without executing website code. This renderer does not run the historical Scramjet client or require a Service Worker/content subdomain.

Vendored dependencies retain their own licenses (included alongside this file):

- Acorn 8.15.0, MIT: https://github.com/acornjs/acorn
- tough-cookie 6.0.1, BSD-3-Clause: https://github.com/salesforce/tough-cookie
- tldts / tldts-core 7.5.1, MIT: https://github.com/remusao/tldts
- fake-indexeddb 6.2.8, Apache-2.0: https://github.com/dumbmatter/fakeIndexedDB

vendor.js is an ES-module bundle of Acorn, tough-cookie (including tldts) and fake-indexeddb. idb.js is the standalone fake-indexeddb ES-module bundle used by the content build. Both retain source-module names and license comments. content.js is the generated browser IIFE: runtime/privacy-guard.js followed by the bundled content-entry.js. No npm packages or Node process are required by the hosted site.

To regenerate the content bundle from repository source, use esbuild 0.28.2 (MIT) on content-entry.js with `--bundle --platform=browser --format=iife`, then prepend the existing runtime/privacy-guard.js. To regenerate vendor.js, bundle an entry exporting `parse` from Acorn, `CookieJar` from tough-cookie and `IDBFactory`/`IDBKeyRange` from fake-indexeddb with `--format=esm`. To regenerate idb.js, bundle only the latter exports. Install build dependencies in an external temporary directory, not as runtime or repository-root requirements. Retain the pinned versions and their license files.

No dependency is relicensed by Browzen's project license. The runtime directory's separate vendor notices continue to apply to those historical files.

html-parser-vendor.js bundles htmlparser2 10.0.0 (MIT), domutils 3.2.2, domhandler 5.0.3, domelementtype 2.3.0, entities 4.5.0/6.0.1 (BSD notices), and dom-serializer 2.0.0 (MIT). See HTML-PARSER-LICENSES.txt. It exports parseDocument from htmlparser2 and getInnerHTML from domutils, bundled with esbuild 0.28.2 using --bundle --platform=browser --format=esm. The parser constructs only data nodes; it does not execute scripts or fetch website resources. It is not a complete browser HTML tree builder. document-parser.js preserves head/body structure before the existing sanitizer and opaque renderer run.

Compatibility mode retains native fonts, graphics, canvas, audio and hardware information. Instrumented JavaScript defaults to UTC and en-US; this is not an engine-level uniform fingerprint. Website cookies and local storage share an in-memory session with domain/origin checks; sessionStorage stays tab-local. IndexedDB remains document-local and is not a complete native persistent-storage implementation.

Renderable images, media and fonts use a MIME-restricted asset route and are materialized inside the opaque document. Cross-origin asset requests omit website cookies; HTML/JSON/script payloads are rejected by that route. This does not reproduce native cross-origin canvas taint or source-opacity semantics. Fetch/module CORS checks and the generic opaque binary route remain distinct. Native direct network transports and account-origin access remain restricted.

