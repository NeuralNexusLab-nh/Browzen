<p align="center">
  <img src="logo.svg" width="520" alt="Browzen">
</p>

<h1 align="center">Browzen</h1>

<h2 align="center"><strong>Beyond the surface. In control.</strong></h2>

<p align="center">
  Browzen is a security-focused, Tor-powered Windows browser built on real Chromium rendering.<br>
  Connect before browsing, explore .onion services, inspect your route, and choose the protection level you need.<br>
  Modern animated tabs, DuckDuckGo search, DevTools, and area screenshots—all in one movable EXE.<br>
  No installer, Browzen account, telemetry service, or cloud sync is required.
</p>

<p align="center">
  <a href="https://drive.proton.me/urls/T2R2NN5E84#GBTHUHCbGxbL">
    <img src="download-button.svg" width="560" alt="Download Browzen for Windows">
  </a>
</p>

<p align="center"><sub>No installer. Open Browzen, connect to Tor, and browse.</sub></p>

## Why we made Browzen

We wanted security controls to be part of everyday browsing: a visible Tor connection, understandable relay routes, isolated tabs, and protection levels you can actually change. Browzen brings those tools together without requiring an installer, Browzen account, telemetry service, or cloud sync.

## How Browzen is different

Browzen is a single movable executable you can run from a folder or USB drive. A Tor connection screen establishes the network before opening the browser. Tor Route displays the relays for a confirmed connection, with country flags, Guard and Exit labels, and the destination. Onion connections show the client-side rendezvous point instead of an exit relay.

Sites advertising a valid `Onion-Location` over HTTPS get a clickable **.onion available** button. Tor Route opened from Settings uses the recent website and lets you select another open destination.

Search settings offer DuckDuckGo (default), DuckDuckGo .onion, Google, Bing (Microsoft Edge), Brave, Yandex, Yahoo, Startpage, Baidu and 360 Search. Your selection applies to both the address bar and New Tab for this session only. The interface includes animated tab transitions, smooth scrolling, dark and light themes, and reduced-motion controls. Each launch starts in a non-maximized window with viewport letterboxing enabled.

**New circuit for this site** retires confirmed destination circuits, including linked Conflux paths, and reloads matching tabs without clearing logins. **New identity** separately closes website tabs and replaces their private profiles. Destination-host isolation is not Tor Browser's full first-party isolation.

## Security built in

- Tor-only browser routing by default, with no automatic direct fallback. Bridge controls support bundled obfs4 and Snowflake transports.
- Separate memory-only profiles for manually opened Tor tabs. Website-opened tabs share their opener's temporary profile for links and sign-in flows; unsolicited popups are blocked. Third-party cookies are blocked, and **New identity** closes website tabs and replaces all profiles, including site storage.
- Engine-level Canvas readback and WebGL blocking, disabled Local Font Access API, viewport letterboxing, reduced language variation, disabled DNS prefetch and hyperlink auditing, and WebRTC UDP restrictions.
- Camera, microphone and location blocked by default; optional per-request prompts. Clipboard APIs, plugins, automatic media playback and external protocol launches are restricted.
- **Standard**, **Safer**, and **Safest** content settings. Higher levels disable more scripts and graphics; Settings explains the exact behavior.

Preferences, bridge settings and website state are session-only. Browzen does not read or create `~/Browzen`, restore an old profile, or maintain a vault, backup or reusable Tor cache. Engine and Tor working files are temporary and removed on a normal close. The EXE is movable without companion profile files. Explicitly exported screenshots/pages are files you choose to keep.

This is not zero-trace computing: the one-file EXE extracts runtime files while running, and a crash, Windows paging, driver caches or operating-system records may retain traces. Old-version data is not silently imported. Forgetting Tor guard state on exit also gives up Tor Browser's stable-guard strategy and makes startup slower; no persistence is a tradeoff, not a claim of stronger anonymity.

## Security boundaries

Browzen implements concrete defenses in Chromium; it does not include all of Tor Browser's Firefox engine patches or its full first-party circuit isolation. Window letterboxing and blocked Canvas readback do not eliminate fingerprinting. With website scripts enabled, timezone, hardware, screen properties, audio and font metrics remain relevant. **Browzen is not fingerprint-free or verified equivalent to Tor Browser.** See [Security design and current limits](SECURITY.md) and [privacy test results](PRIVACY_TESTS.md).

## Responsible use

Use Browzen only in compliance with applicable laws and third-party rights. You are responsible for your activity. Browzen is provided “as is,” without warranties. To the maximum extent permitted by law, NXLabTW and contributors are not liable for loss, damage, data loss, or claims arising from its use.

## Made by NXLabTW

Browzen is created by [NXLabTW](https://nxlabtw.com).

## Run

```powershell
.\Browzen.exe
```

Use `Ctrl+T` for a new tab, `Ctrl+L` for the address bar, `Ctrl+Shift+S` for area capture, and `F12` for Developer Tools. Settings controls themes, motion, scrolling, zoom, security levels, permissions, letterboxing and bridges.

The Windows executable is provided through the download button above and is not stored in this repository.

## License

Licensed under the Apache License 2.0.
