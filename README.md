<p align="center">
  <img src="logo.svg" width="360" alt="Browzen">
</p>

# Browzen

Browzen is an agent-native browser runtime built on Playwright and Chromium.
It gives AI agents multi-tab browsing, structured interaction, screenshots, and DevTools through MCP.
Humans can safely watch and scroll the live read-only Viewer.
Everything runs locally on `127.0.0.1:7023` by default.

## Install

### Windows

Download `Browzen.exe` from this repository and run it.

```powershell
.\Browzen.exe
```

Viewer: `http://127.0.0.1:7023/`

MCP: `http://127.0.0.1:7023/mcp`

### Python

```powershell
pip install -r requirements.txt
python browzen.py
```

If Chrome or Edge is not installed, install Playwright Chromium once:

```powershell
playwright install chromium
```

## License

Licensed under the Apache License 2.0.
