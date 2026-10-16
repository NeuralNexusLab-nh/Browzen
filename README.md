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
  <a href="https://drive.proton.me/urls/WFQATFBMRR#GS2xemqNwFeY">
    <img src="download-button.svg" width="560" alt="Download Browzen for Windows">
  </a>
</p>

<p align="center"><sub>No installer. Open Browzen, connect to Tor, and browse.</sub></p>

## Why we made Browzen

We wanted security controls to be part of everyday browsing: a visible Tor connection, understandable relay routes, isolated tabs, and protection levels you can actually change. Browzen brings those tools together without requiring an installer, Browzen account, telemetry service, or cloud sync.

## How Browzen is different

Browzen is a single movable executable you can run from a folder or USB drive. A Tor connection screen establishes the network before opening the browser. Tor Route displays the relays for a confirmed connection, with country flags, Guard and Exit labels, and the destination. Onion connections show the client-side rendezvous point instead of an exit relay.

Sites advertising a valid `Onion-Location` over HTTPS get a clickable **.onion available** button. Tor Route opened from Settings uses the recent website and lets you select another open destination.

Search settings offer DuckDuckGo (default), DuckDuckGo .onion, Google, Bing (Microsoft Edge), Brave, Yandex, Yahoo, Startpage, Baidu and 360 Search. Your selection is saved and applies to both the address bar and New Tab. The interface includes animated tab transitions, smooth scrolling, dark and light themes, and reduced-motion controls.

## Security built in

- Tor-only browser routing by default, with no automatic direct fallback. Bridge controls support bundled obfs4 and Snowflake transports.
- Separate memory-only browser profiles for Tor tabs. Third-party cookies are blocked, and **New identity** closes website tabs and replaces their profiles, including site storage.
- Engine-level Canvas readback blocking, viewport letterboxing, reduced language variation, disabled DNS prefetch and hyperlink auditing, and WebRTC UDP restrictions.
- Camera, microphone and location blocked by default; optional per-request prompts. Clipboard APIs, plugins, automatic media playback and external protocol launches are restricted.
- **Standard**, **Safer**, and **Safest** content settings. Higher levels disable more scripts and graphics; Settings explains the exact behavior.

Tor browsing history and website storage are not persisted by Browzen. Preferences and encrypted Tor network metadata do persist: stable guards and cached directory information improve reconnecting without retaining visited websites. The executable can move; Windows protects that network cache for the same user account.

## Security boundaries

Browzen implements concrete defenses in Chromium; it does not include all of Tor Browser's Firefox engine patches or its full first-party circuit isolation. Window letterboxing and blocked Canvas readback do not eliminate fingerprinting. See [Security design and current limits](SECURITY.md) for the implemented protections, stored data, and remaining differences.

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
