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
information describes a last confirmed connection, not every simultaneous
subresource connection. Onion routes show the client side and rendezvous point;
the service-side guards and its server IP are not exposed by Tor.

`Onion-Location` is accepted only from a non-onion HTTPS page. The advertised
target must use HTTP or HTTPS and contain a valid v3 onion address. Browzen
validates the version and checksum and rejects embedded credentials. The same
rules apply to an HTML `meta http-equiv="onion-location"` announcement.

## Website isolation and content protection

Tor tabs have separate off-the-record Chromium profiles, including cookies,
localStorage, IndexedDB, service workers and caches. Logins therefore do not
automatically carry between tabs. The isolation boundary is a tab, not a first
party: navigating between sites within one tab uses that tab's private profile.
New identity closes website tabs and replaces the private profiles, then requests
Tor's NEWNYM signal. Tor may rate-limit rapid identity requests.

All Tor levels block third-party cookies and Canvas readback, restrict WebRTC
UDP, disable DNS prefetch and hyperlink auditing, and require a user gesture for
media playback. Device permissions are blocked by default. Clipboard access,
browser plugins and external protocol launches are disabled. Letterboxing rounds
the actual website viewport in 200-by-100 pixel steps by default; it does not
spoof every screen property. HTTP public-web requests are upgraded to HTTPS.
HTTP onion services remain supported over Tor's encrypted onion connection.

| Level | Website JavaScript | WebGL | Built-in PDF viewer |
| --- | --- | --- | --- |
| Standard | Enabled | Enabled | Enabled |
| Safer | HTTPS pages only | Disabled | Enabled |
| Safest | Disabled | Disabled | Disabled |

Internal Browzen settings remain functional at every level. Levels are modeled
after Tor Browser's approach, but do not reproduce all of its font, media,
NoScript and Firefox settings. More restrictive levels can break websites.

## What remains on disk

Browzen does not persist Tor website profiles or browsing history. Profiles and
HTTP caches are in memory. Tor's working directory is temporary and removed on a
normal close. This is application cleanup, not a secure-erasure guarantee:
operating-system paging, crash dumps or an interrupted shutdown may retain traces.

The following do persist in the Windows user's `Browzen` folder:

- Appearance, protection preferences, bridge configuration and window geometry.
- Tor guard state and directory/microdescriptor cache, encrypted with Windows
  DPAPI. Only an allowlist of Tor metadata files is included; browsing streams,
  cookies, website databases and logs are not included.
- Existing data from older Browzen versions is not silently deleted. The explicit
  `--direct` legacy mode still uses its local encrypted browser vault.

Stable guards are deliberately retained, following Tor's guard design. Cached
network information can reduce repeated bootstrap work; network conditions still
determine connection speed. DPAPI protection follows the Windows user account,
not the location of the EXE, and is not a defense against malware running as that
same user. Bridge settings are local configuration, not an encrypted secret vault.
Downloads remain disabled in Tor mode; explicitly saved screenshots are files
the user chooses to keep.

## Current engine limits

Browzen does not implement Tor Browser's complete fingerprint normalization,
font isolation, timezone treatment, NoScript integration, or per-first-party
SOCKS credential/circuit isolation. Browser fingerprinting, malicious websites,
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
