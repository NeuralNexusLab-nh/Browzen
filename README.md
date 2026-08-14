<p align="center">
  <img src="logo.svg" width="420" alt="Browzen">
</p>

<h1 align="center">A real browser for AI agents.</h1>

<p align="center">
  Browzen gives AI agents a real local Chromium browser with multi-tab control, structured interaction, screenshots, and DevTools through MCP.<br>
  Humans can watch, switch tabs, and scroll safely in the live read-only Viewer.<br>
  Everything stays on your computer and listens on <code>127.0.0.1:7023</code> by default.
</p>

<p align="center">
  <a href="https://github.com/NeuralNexusLab-nh/Browzen/raw/refs/heads/main/Browzen.exe">
    <img src="https://img.shields.io/badge/DOWNLOAD_BROWZEN-WINDOWS_EXE-6C63FF?style=for-the-badge&logo=windows11&logoColor=white" alt="Download Browzen for Windows">
  </a>
</p>

<p align="center"><sub>No installer. No cloud account. Just download and run.</sub></p>

## Why Browzen?

Many agent browsers run remotely or hide the browser behind automation APIs. Browzen runs a real Chromium browser locally, renders full JavaScript and CSS, and gives you a live Viewer while the agent works.

| Typical agent browser | Browzen |
| --- | --- |
| Remote or hidden browser session | Real Chromium running on your computer |
| Limited visibility into agent activity | Live Viewer with tab switching, scrolling, and safe tab closing |
| Browser data may leave the device | Localhost-only by default |
| Automation-first debugging | Structured page view, screenshots, console, network, cookies, storage, and errors |

## Run

```powershell
.\Browzen.exe
```

Viewer: [http://127.0.0.1:7023/](http://127.0.0.1:7023/)

MCP: `http://127.0.0.1:7023/mcp`

Only the ready-to-run Windows executable is distributed in this repository.

## License

Licensed under the Apache License 2.0.
