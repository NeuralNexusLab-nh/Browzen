<p align="center">
  <img src="logo.svg" width="420" alt="Browzen">
</p>

<h1 align="center">A real browser for AI agents.</h1>

<p align="center">
  Browzen gives AI agents a real local Chromium browser with multi-tab control, structured interaction, screenshots, and DevTools through MCP.<br>
  Humans can watch, switch, scroll, and close tabs safely in the live Viewer.<br>
  Everything stays on your computer and listens on <code>127.0.0.1:7023</code> by default.
</p>

<p align="center">
  <a href="https://github.com/NeuralNexusLab-nh/Browzen/raw/refs/heads/main/Browzen.exe">
    <img src="https://img.shields.io/badge/DOWNLOAD_BROWZEN-WINDOWS_EXE-6C63FF?style=for-the-badge&logo=windows11&logoColor=white" alt="Download Browzen for Windows">
  </a>
</p>

<p align="center"><sub>No installer. No cloud account. Just download and run.</sub></p>

## Why agents work better with Browzen

Browzen turns a fully rendered page into compact, structured context that an AI can understand and act on directly. Agents spend less context on noisy HTML, avoid brittle selector guessing, and recover safely when a page changes—all while you can watch their work locally.

| Typical agent browsing | With Browzen |
| --- | --- |
| Raw HTML, large DOM trees, or screenshots alone | Agent-friendly Markdown plus optional structured JSON |
| Fragile CSS selectors and coordinate guessing | Short element IDs with stale-element detection |
| Separate tools for tabs, actions, screenshots, and debugging | One consistent MCP toolset for the complete browser workflow |
| Hard to understand why an action failed | Console, network, cookies, storage, and page errors through DevTools |
| Agent activity is difficult to follow | A live Viewer for watching, switching, scrolling, and closing tabs |

## Run

```powershell
.\Browzen.exe
```

Viewer: [http://127.0.0.1:7023/](http://127.0.0.1:7023/)

MCP: `http://127.0.0.1:7023/mcp`

Only the ready-to-run Windows executable is distributed in this repository.

## License

Licensed under the Apache License 2.0.
