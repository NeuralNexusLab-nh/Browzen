# Browzen security design

Browzen is a Tor-powered Chromium browser. The protections below are implemented
in Browzen; this document does not claim equivalence to official Tor Browser.

## Connections and routes

The browser window opens after Tor reports bootstrap completion. Browser traffic
uses a loopback SOCKS5 proxy. An unavailable proxy causes requests to fail; there
is no automatic direct-connection fallback. Chromium QUIC and DNS prefetch are
disabled, and WebRTC is restricted from using non-proxied UDP.

Route queries run in background workers. Tor STREAM events associate destination
hosts with actual circuit IDs; a generic prebuilt circuit is not presented as the
page's route. An expired or unconfirmed circuit is shown as unavailable. Circuit
information describes a last confirmed connection branch, not every simultaneous
subresource connection. Onion routes show the client side and rendezvous point;
the service-side guards and its server IP are not exposed by Tor.

The SOCKS listener uses `IsolateDestAddr`: different destination hosts do not
share circuits. This is destination-host isolation, not Tor Browser's first-party
isolation (where third-party requests are keyed by the top-level site).
**New circuit for this site** closes confirmed three-hop circuits for the chosen
destination and reloads matching tabs. Linked Conflux legs are retired together;
Tor selects replacement paths. Cookies, storage and logins are not reset. This
does not issue a global NEWNYM signal, guarantee a new exit IP, or change guards
on demand. Unknown routes produce an error rather than a false success.

`Onion-Location` is accepted only from a non-onion HTTPS page. The advertised
target must use HTTP or HTTPS and contain a valid v3 onion address. Browzen
validates the version and checksum and rejects embedded credentials. The same
rules apply to an HTML `meta http-equiv="onion-location"` announcement.

## Website isolation and content protection

Manually opened Tor tabs have separate off-the-record Chromium profiles,
including cookies, localStorage, IndexedDB, service workers and caches.
Website-opened tabs reuse their opener's temporary profile, preserving native
`window.open`, delayed navigation and sign-in flows. These related tabs can share
logins and site storage; independent manually opened tabs do not. The isolation
boundary is a browsing group, not a first party: navigating between sites within
one group uses the same private profile. The profile is released after its last
page closes. Unsolicited popups are blocked; mouse- or keyboard-initiated new-window
requests are allowed. Normal Chromium same-origin and opener protections remain
in effect.
New identity closes website tabs and replaces the private profiles, then requests
Tor's NEWNYM signal. Tor may rate-limit rapid identity requests.

All Tor levels block third-party cookies and WebGL, restrict WebRTC
UDP, disable DNS prefetch and hyperlink auditing, and require a user gesture for
media playback. Canvas readback and device permissions are blocked by default.
Browser plugins and external protocol launches are disabled. Letterboxing rounds
the actual website viewport in 200-by-100 pixel steps by default; it does not
spoof every screen property. The Local Font Access API is disabled; this does
not stop CSS/font-metric enumeration. Launches use a non-maximized window rather
than restoring geometry from disk. HTTP public-web requests are upgraded to HTTPS.
HTTP onion services remain supported over Tor's encrypted onion connection.

| Level | Website JavaScript | WebGL | Built-in PDF viewer |
| --- | --- | --- | --- |
| Standard | Enabled | Disabled | Enabled |
| Safer | HTTPS pages only | Disabled | Enabled |
| Safest | Disabled | Disabled | Disabled |

Internal Browzen settings remain functional at every level. Levels are modeled
after Tor Browser's approach, but do not reproduce all of its font, media,
NoScript and Firefox settings. More restrictive levels can break websites.

The anchored Control Panel offers a built-in NoScript switch, not the NoScript
extension. It disables page JavaScript for the current origin; it cannot override
a stricter security level. It is not an independently audited all-context script
or service-worker blocker. The panel also controls clipboard, microphone, camera,
notifications and Canvas readback. These five start blocked for every origin.
Enabling a device or clipboard switch allows a native permission prompt, not an
automatic grant. Requests from other embedded origins, location, screen capture,
mouse lock and local-font access remain denied. Canvas readback is a page-wide
engine setting, including embedded frames; enabling it weakens fingerprint
protection. Controls are reapplied on navigation, reset by New Identity and exit,
and are never saved to disk. Changing a control reloads matching-origin pages with
a GET navigation instead of silently resubmitting form data.

## No reusable application data

Preferences, window geometry and bridge configuration live in process memory.
Every Chromium profile is off the record, with memory HTTP cache and no persistent
cookies or permissions. Any engine working paths are redirected into a unique
temporary session directory. Qt shader/pipeline and QML disk caches are disabled.

Browzen no longer reads or creates `~/Browzen`, migrates old profiles, restores
vaults, creates backups, or saves Tor state/cache for another launch. The legacy
direct/persistent mode is removed; `--direct` cannot bypass Tor. Bridge changes
reconnect Tor within the current session and are forgotten on exit.

Tor requires temporary configuration, authentication, guard and directory files
while running. The one-file EXE also extracts bundled runtime components.
On a normal close, browser pages/profiles are destroyed, Tor stops, and the
temporary session directory is removed without a backup. Cleanup failures are
reported rather than described as successful erasure. Previously installed
versions may have left data that requires separate removal; it is not imported.
Explicit screenshot/page exports remain where the user chooses to save them.

This is **not** a no-write or secure-erasure guarantee. A forced kill, crash,
power loss, OS paging, dumps, filesystem journals, Windows execution records or
GPU-driver caches can retain traces outside application control. An ordinary
Windows EXE cannot guarantee absence of forensic evidence.

Not retaining Tor guard metadata is an explicit no-persistence tradeoff. Official
Tor Browser deliberately preserves stable guards to limit exposure to new entry
relays. Starting fresh every time loses that strategy and requires a cold Tor
bootstrap; it is not inherently more anonymous or safer.

## Current engine limits

Browzen does not implement Tor Browser's complete fingerprint normalization,
font isolation, timezone treatment, NoScript integration, or per-first-party
SOCKS credential/circuit isolation. With scripts enabled, Web Audio, CPU/memory
properties, screen information, timezone, Client Hints and speech/font metrics
remain observable. Safest disables website scripts but does not make the browser
indistinguishable from Tor Browser or hide its network/TLS characteristics.
See [privacy tests](PRIVACY_TESTS.md) for actual results, including failed and
incomplete checks. Browser fingerprinting, malicious websites,
account logins, identifying content, compromised endpoints and traffic correlation
remain relevant. Tor protects routed browser connections, not other applications.
Neither an IP test nor a successful onion load constitutes an anonymity audit.

Browzen is developed independently by NXLabTW and is not affiliated with the
Tor Project. Users needing Tor Browser's full threat model should use official
Tor Browser.

## Primary references

- [Tor Browser fingerprinting protections](https://support.torproject.org/tor-browser/features/fingerprinting-protections/)
- [Tor Browser security levels](https://support.torproject.org/tor-browser/features/security-levels/)
- [Tor guard design](https://support.torproject.org/tor-browser/security/guard-relay/)
- [Onion-Location requirements](https://community.torproject.org/onion-services/advanced/onion-location/)
- [Tor Browser identity management](https://support.torproject.org/tor-browser/features/managing-identities/)
