# Privacy checks — October 23, 2026

These are observations from the development build of Browzen itself, using its
Qt WebEngine views and bundled Tor. They are not an independent security audit,
an entropy measurement, or proof that a user cannot be recognized. The manually
hosted download may lag the development build documented here.

## External pages, with Standard security

| Check | Observed result | Meaning |
| --- | --- | --- |
| [BrowserLeaks Canvas](https://browserleaks.com/canvas) | `toDataURL` unavailable; signature and uniqueness not available | This canvas extraction path was blocked; not all fingerprinting was blocked. |
| [BrowserLeaks WebGL](https://browserleaks.com/webgl) | WebGL and WebGL 2 unavailable; renderer/hash fields empty | This page could not obtain a WebGL hardware fingerprint. |
| [BrowserLeaks WebRTC](https://browserleaks.com/webrtc) | No leak reported; local/public WebRTC addresses empty | No address leak was observed in this check; not an exhaustive network audit. |
| [BrowserLeaks JavaScript](https://browserleaks.com/javascript) | Browser/OS, timezone, screen, hardware, Client Hints, audio and speech information visible | Significant fingerprinting surfaces remain. Browzen is **not** fingerprint-free. |
| BrowserLeaks `/audio` | Page unavailable in this run | Not counted as a passed audio fingerprint test. |

The native engine probe also confirmed Canvas extraction and WebGL blocking,
and absence of the Local Font Access API. It found that OfflineAudioContext
remained usable. Proposed audio/timezone switches were tested; ineffective ones
were removed instead of being counted as protections. No JavaScript spoofing
shim was used to manufacture passing results. Device-specific values and raw
test records are not published here.

## Functional regression checks

The local automated suite covers private profile/storage isolation, shared popup
profiles, native link/button/window.open navigation, popup blocking, security
levels, search preferences, fresh-process preference reset, temporary Tor data
removal, destination isolation, circuit selection, linked Conflux replacement,
control-protocol data framing and the new-circuit UI action. All 24 tests passed.
Source-build and packaged-EXE startup/close smoke checks also passed.

The packaged EXE was also launched normally and closed with exit code zero.
A before/after inventory of the known legacy Browzen data locations found no
file/directory changes, and no newly created session directory remained after
exit. Existing old-version data was still present; this test does not count it
as deleted. This is a scoped application-data check, not a forensic disk audit.

A live Tor check against BrowserLeaks confirmed that the destination circuit ID
changed after the new-circuit operation while the same private profile and its
localStorage remained intact. Native new-tab links and delayed `window.open`
navigation also loaded successfully afterward. This proves that the operation
was not just a route-panel refresh; it does not prove a different exit IP or full
Tor Browser first-party isolation.

## Scope and limitations

An old NXLab onion address timed out during this run. A separate public-web
attempt was rejected with HTTP 403 by an exit-facing service. Neither is counted
as a passed connectivity test. A successful IP, Canvas or WebRTC test cannot
establish Tor Browser equivalence. TLS/network characteristics, font metrics,
account identities, compromised devices and traffic correlation remain relevant.

Official background: [Tor Browser fingerprinting protections](https://support.torproject.org/tor-browser/features/fingerprinting-protections/),
[identity and circuit management](https://support.torproject.org/tor-browser/features/managing-identities/),
[stable guards](https://support.torproject.org/tor-browser/security/guard-relay/),
[Tor control protocol](https://spec.torproject.org/control-spec/commands.html).
