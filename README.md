<p align="center">
  <img src="logo.svg" width="520" alt="Browzen">
</p>

<h1 align="center">Browzen</h1>

<h2 align="center"><strong>Private routes. Clear control.</strong></h2>

<p align="center">
  Browzen is a portable, Tor-powered Windows browser built on real Chromium rendering.<br>
  Private routing, .onion support, circuit controls, familiar tabs, DevTools, and modern website support—all in one movable EXE.<br>
  No installer, Browzen account, telemetry service, or cloud sync is required.
</p>

<p align="center">
  <a href="https://drive.proton.me/urls/WFQATFBMRR#GS2xemqNwFeY">
    <img src="download-button.svg" width="560" alt="Download Browzen for Windows">
  </a>
</p>

<p align="center"><sub>No installer. Download, open, and browse.</sub></p>

## Why we made Browzen

We wanted a browser that is easy to carry, simple to understand, and respectful of the person using it—without requiring an installer, Browzen account, telemetry service, or cloud sync. Privacy should be a visible default, not a buried option.

## How Browzen is different

Browzen is a single movable executable. Run it from a folder or USB drive. Tor mode routes browser traffic through Tor, supports `.onion` sites, shows the active relay route, and provides new-identity and bridge controls. If Tor is unavailable, Browzen does not silently fall back to a direct connection.

## Privacy

Browzen sends no Browzen telemetry and uses no Browzen cloud sync. Tor browsing uses a private in-memory profile, while normal browsing data remains on this device in an encrypted local vault after a normal close. The browser never substitutes a direct connection when Tor is unavailable.

## Security boundaries

Tor protects network privacy; it does not make an identity magically anonymous. Signing in, sharing identifying information, or trusting a malicious site can still identify you. Browzen is not affiliated with the Tor Project and does not replace Tor Browser's complete anti-fingerprinting protections.

## Responsible use

Use Browzen only in compliance with applicable laws and third-party rights. You are responsible for your activity. Browzen is provided “as is,” without warranties. To the maximum extent permitted by law, NXLabTW and contributors are not liable for loss, damage, data loss, or claims arising from its use.

## Made by NXLabTW

Browzen is created by [NXLabTW](https://nxlabtw.com).

## Run

```powershell
.\Browzen.exe
```

Use `Ctrl+T` for a new tab, `Ctrl+Shift+N` for Incognito, `Ctrl+L` for the address bar, `Ctrl+H` for History, and `F12` for Developer Tools.

The Windows executable is provided through the download button above and is not stored in this repository.

## License

Licensed under the Apache License 2.0.
