<p align="center">
  <img src="logo.svg" width="128" alt="Browzen logo">
</p>

# Browzen

**Beyond the surface. In control.**

<p align="center">
  Browzen is a security-focused, Tor-powered portable browser.<br>
  Connect before browsing, explore .onion services, inspect your route, and choose the protection level you need.<br>
  Modern animated tabs, DuckDuckGo .onion search, DevTools, and area screenshots—in a movable executable.<br>
  No installer, Browzen account, telemetry service, or cloud sync is required.
</p>

<p align="center">
  <a href="https://drive.proton.me/urls/C4CPKQBZDR#bhvHs86uvOHu">
    <img src="download-button.svg" width="560" alt="Download Browzen for Windows">
  </a>
</p>

<p align="center"><sub>No installer. Open Browzen, connect to Tor, and browse.</sub></p>

<p align="center">
  <a href="https://drive.proton.me/urls/5S7CX0CRAC#9KbgPA2Mmb9J">
    <img src="download-linux-button.svg" width="560" alt="Download Browzen for Linux x86_64">
  </a>
</p>

<p align="center"><sub>Linux x86_64 · Tested on Debian 13 · <a href="LINUX.md">Compatibility, tests and SHA-256</a></sub></p>

## Why we made Browzen

We wanted security controls to be part of everyday browsing: a visible Tor connection, understandable relay routes, isolated tabs, and protection levels you can actually change. Browzen brings those tools together without requiring an installer, Browzen account, telemetry service, or cloud sync.

## How Browzen is different

Browzen is a single movable executable you can run from a folder or USB drive. A Tor connection screen establishes the network before opening the browser. The upper-right **Control Panel** combines the confirmed Tor route, a built-in NoScript switch, and site permissions. Routes show country flags, Guard and Exit labels, and the destination. Onion connections show the client-side rendezvous point instead of an exit relay.

Sites advertising a valid `Onion-Location` over HTTPS get a clickable **.onion available** button. The Control Panel opened from Settings can show a recent website's route; permission switches are enabled only on website tabs.

NoScript starts off (green, JavaScript allowed); switching it on (red) disables page JavaScript unless a stricter security level already blocks it. This is Browzen's built-in control, not the NoScript extension. Clipboard, microphone, camera, notifications and Canvas readback start blocked. Exceptions apply to the current origin for this session only; device and clipboard access still require a permission prompt, while Canvas readback applies to the page and its embedded frames. Location remains blocked. Loading feedback includes a moving progress rail, tab spinner and elapsed waiting time; the rail is an estimate, not proof of an established Tor circuit.

Search-engine selectors sit to the left of the address bar and the New Tab search input, and stay in sync without clearing what you typed. DuckDuckGo .onion is the default; DuckDuckGo, Google, Bing (Microsoft Edge), Brave, Yandex, Yahoo, Startpage, Baidu and 360 Search are also available. Your selection lasts for this session only. The interface includes animated tab transitions, smooth scrolling, dark and light themes, and reduced-motion controls. Each launch starts in a non-maximized window with viewport letterboxing enabled.

**New circuit for this site** retires confirmed destination circuits, including linked Conflux paths, and reloads matching tabs without clearing logins. **New identity** separately closes website tabs and replaces their private profiles. Destination-host isolation is not Tor Browser's full first-party isolation.

## Security built in

- Tor-only browser routing by default, with no automatic direct fallback. Bridge controls support bundled obfs4 and Snowflake transports.
- Separate memory-only profiles for manually opened Tor tabs. Website-opened tabs share their opener's temporary profile for links and sign-in flows; unsolicited popups are blocked. Third-party cookies are blocked, and **New identity** closes website tabs and replaces all profiles, including site storage.
- Canvas readback blocked by default, WebGL blocking, disabled Local Font Access API, viewport letterboxing, reduced language variation, disabled DNS prefetch and hyperlink auditing, and WebRTC UDP restrictions.
- Clipboard, camera, microphone and notifications blocked by default, with per-site temporary prompt exceptions. Location stays blocked. Plugins, automatic media playback and external protocol launches are restricted.
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

### Windows

```powershell
.\Browzen.exe
```

### Linux x86_64

```sh
chmod +x Browzen-linux-x86_64
./Browzen-linux-x86_64
```

The Linux build uses the native Tor Browser engine with Browzen's interface.
A compatible Linux desktop and system libraries are required; see [Linux details](LINUX.md).
No macOS build is available yet.

Use `Ctrl+T` for a new tab, `Ctrl+L` for the address bar, `Ctrl+Shift+S` for area capture, and `F12` for Developer Tools. Use Control Panel for site permissions, page scripts and routes. Settings controls themes, motion, scrolling, zoom, security levels, letterboxing and bridges.

The Windows and Linux executables are provided through the download buttons above and are not stored in this repository.

## License

Licensed under the Apache License 2.0.
