"""Browzen v0.1.0 - an agent-native Chromium runtime with a read-only viewer."""

from __future__ import annotations

import argparse
import asyncio
import contextlib
import os
import socket
import sys
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from typing import Any, Literal

import uvicorn
from mcp.server.fastmcp import FastMCP, Image
from playwright.async_api import Browser, BrowserContext, Locator, Page, Playwright, async_playwright
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.requests import Request
from starlette.responses import HTMLResponse, JSONResponse, Response
from starlette.routing import Mount, Route

VERSION = "0.1.0"
HOST = "127.0.0.1"
DEFAULT_PORT = 7023
LOG_LIMIT = 250


# ---------------------------------------------------------------------------
# Browser runtime
# ---------------------------------------------------------------------------

EXTRACT_SCRIPT = r"""
() => {
  const visible = el => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    return s.visibility !== 'hidden' && s.display !== 'none' && r.width > 0 && r.height > 0;
  };
  const esc = s => CSS.escape(s);
  const selector = el => {
    if (el.id && document.querySelectorAll('#' + esc(el.id)).length === 1) return '#' + esc(el.id);
    const parts = [];
    while (el && el.nodeType === 1 && el !== document.documentElement) {
      let part = el.tagName.toLowerCase();
      const parent = el.parentElement;
      if (parent) {
        const same = [...parent.children].filter(x => x.tagName === el.tagName);
        if (same.length > 1) part += `:nth-of-type(${same.indexOf(el) + 1})`;
      }
      parts.unshift(part); el = parent;
    }
    return 'html > ' + parts.join(' > ');
  };
  const name = el => (el.getAttribute('aria-label') || el.getAttribute('alt') ||
    el.getAttribute('title') || (el.labels && [...el.labels].map(x => x.innerText).join(' ')) ||
    el.innerText || el.value || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ').slice(0, 180);
  const query = 'a[href],button,input,textarea,select,[role="button"],[role="link"],[role="checkbox"],[role="radio"],[contenteditable="true"],[tabindex]:not([tabindex="-1"])';
  const elements = [...document.querySelectorAll(query)].filter(visible).slice(0, 300).map(el => ({
    selector: selector(el), tag: el.tagName.toLowerCase(), type: (el.getAttribute('type') || '').toLowerCase(),
    role: el.getAttribute('role') || '', name: name(el), disabled: !!el.disabled,
    checked: 'checked' in el ? !!el.checked : null, value: ['password','file'].includes(el.type) ? '' : (el.value || '')
  }));
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).slice(0, 80)
    .map(el => ({level: Number(el.tagName[1]), text: name(el)})).filter(x => x.text);
  const text = (document.body?.innerText || '').replace(/\n{3,}/g, '\n\n').trim().slice(0, 12000);
  return {title: document.title, url: location.href, headings, text, elements,
    viewport: {x: scrollX, y: scrollY, width: innerWidth, height: innerHeight,
      pageWidth: document.documentElement.scrollWidth, pageHeight: document.documentElement.scrollHeight}};
}
"""


class BrowzenRuntime:
    def __init__(self) -> None:
        self.playwright: Playwright | None = None
        self.browser: Browser | None = None
        self.context: BrowserContext | None = None
        self.pages: dict[str, Page] = {}
        self.page_ids: dict[Page, str] = {}
        self.snapshots: dict[str, dict[str, dict[str, Any]]] = defaultdict(dict)
        self.logs: dict[str, dict[str, deque[dict[str, Any]]]] = defaultdict(
            lambda: {name: deque(maxlen=LOG_LIMIT) for name in ("console", "network", "errors")}
        )
        self.counter = 0
        self.browser_name = ""
        self.viewer_port = DEFAULT_PORT
        self.lock = asyncio.Lock()

    async def start(self) -> None:
        self.playwright = await async_playwright().start()
        launch_error: Exception | None = None
        for channel, label in (("chrome", "Google Chrome"), ("msedge", "Microsoft Edge"), (None, "Playwright Chromium")):
            try:
                kwargs: dict[str, Any] = {"headless": True}
                if channel:
                    kwargs["channel"] = channel
                self.browser = await self.playwright.chromium.launch(**kwargs)
                self.browser_name = label
                break
            except Exception as exc:
                launch_error = exc
        if not self.browser:
            raise RuntimeError(
                "No Chromium-family browser is available. Install Chrome/Edge or run: playwright install chromium"
            ) from launch_error
        self.context = await self.browser.new_context(viewport={"width": 1440, "height": 900})
        self.context.set_default_timeout(10_000)
        self.context.set_default_navigation_timeout(30_000)
        self.context.on("page", lambda page: asyncio.create_task(self._register(page)))
        await self._register(await self.context.new_page())

    async def stop(self) -> None:
        if self.context:
            await self.context.close()
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()

    async def _register(self, page: Page) -> str:
        if page in self.page_ids:
            return self.page_ids[page]
        self.counter += 1
        tab_id = f"t{self.counter}"
        self.pages[tab_id] = page
        self.page_ids[page] = tab_id
        page.on("console", lambda msg: self._log(tab_id, "console", {
            "type": msg.type, "text": msg.text, "location": msg.location
        }))
        page.on("pageerror", lambda error: self._log(tab_id, "errors", {"message": str(error)}))
        page.on("request", lambda request: self._log(tab_id, "network", {
            "event": "request", "method": request.method, "url": request.url, "resourceType": request.resource_type
        }))
        page.on("response", lambda response: self._log(tab_id, "network", {
            "event": "response", "status": response.status, "url": response.url
        }))
        page.on("requestfailed", lambda request: self._log(tab_id, "network", {
            "event": "failed", "method": request.method, "url": request.url, "failure": request.failure
        }))
        page.on("close", lambda: self._forget(tab_id))
        return tab_id

    def _log(self, tab_id: str, section: str, item: dict[str, Any]) -> None:
        self.logs[tab_id][section].append(item)

    def _forget(self, tab_id: str) -> None:
        page = self.pages.pop(tab_id, None)
        if page:
            self.page_ids.pop(page, None)
        self.snapshots.pop(tab_id, None)

    def page(self, tab_id: str) -> Page:
        page = self.pages.get(tab_id)
        if not page or page.is_closed():
            raise ValueError(f"TAB_NOT_FOUND: {tab_id}")
        return page

    async def tab_list(self) -> list[dict[str, Any]]:
        result = []
        for tab_id, page in list(self.pages.items()):
            if not page.is_closed():
                result.append({"id": tab_id, "title": await page.title(), "url": page.url})
        return result

    async def open(self, url: str = "about:blank") -> dict[str, Any]:
        assert self.context
        async with self.lock:
            page = await self.context.new_page()
            tab_id = await self._register(page)
            if url != "about:blank":
                await page.goto(normalize_url(url), wait_until="domcontentloaded")
            return {"id": tab_id, "title": await page.title(), "url": page.url}

    async def close(self, tab_id: str) -> dict[str, Any]:
        async with self.lock:
            page = self.page(tab_id)
            await page.close()
            if not self.pages and self.context:
                await self._register(await self.context.new_page())
            return {"closed": tab_id}

    async def navigate(self, tab_id: str, url: str) -> dict[str, Any]:
        async with self.lock:
            page = self.page(tab_id)
            response = await page.goto(normalize_url(url), wait_until="domcontentloaded")
            self.snapshots.pop(tab_id, None)
            return {"id": tab_id, "title": await page.title(), "url": page.url,
                    "status": response.status if response else None}

    async def view(self, tab_id: str) -> dict[str, Any]:
        async with self.lock:
            page = self.page(tab_id)
            data = await page.evaluate(EXTRACT_SCRIPT)
            refs: dict[str, dict[str, Any]] = {}
            public = []
            for number, element in enumerate(data.pop("elements"), 1):
                element_id = f"e{number}"
                refs[element_id] = element
                public.append({"id": element_id, **{k: v for k, v in element.items() if k != "selector"}})
            self.snapshots[tab_id] = refs
            data["elements"] = public
            return data

    async def resolve(self, tab_id: str, element_id: str) -> tuple[Page, Locator, dict[str, Any]]:
        page = self.page(tab_id)
        descriptor = self.snapshots.get(tab_id, {}).get(element_id)
        if not descriptor:
            raise ValueError(f"STALE_ELEMENT: {element_id}. Call browzen_view again.")
        locator = page.locator(descriptor["selector"])
        if await locator.count() != 1:
            raise ValueError(f"STALE_ELEMENT: {element_id} no longer resolves uniquely. Call browzen_view again.")
        current = await locator.evaluate(
            "el => ({tag: el.tagName.toLowerCase(), type: (el.getAttribute('type') || '').toLowerCase()})"
        )
        if current["tag"] != descriptor["tag"] or current["type"] != descriptor["type"]:
            raise ValueError(f"STALE_ELEMENT: {element_id} now refers to a different control. Call browzen_view again.")
        return page, locator, descriptor

    async def act(self, tab_id: str, element_id: str, action: str, value: Any = None) -> dict[str, Any]:
        async with self.lock:
            page, locator, descriptor = await self.resolve(tab_id, element_id)
            tag, input_type = descriptor["tag"], descriptor["type"]
            if action == "click":
                await locator.click()
            elif action == "fill":
                if tag == "select":
                    await locator.select_option(str(value))
                elif input_type in ("checkbox", "radio"):
                    if as_bool(value):
                        await locator.check()
                    else:
                        await locator.uncheck()
                elif input_type == "file":
                    await locator.set_input_files(as_files(value))
                else:
                    await locator.fill("" if value is None else str(value))
            elif action == "clear":
                if tag == "select":
                    await locator.select_option(value="")
                elif input_type in ("checkbox", "radio"):
                    await locator.uncheck()
                else:
                    await locator.fill("")
            elif action == "select":
                await locator.select_option(str(value))
            elif action == "check":
                await locator.check()
            elif action == "uncheck":
                await locator.uncheck()
            elif action == "press":
                await locator.press(str(value))
            elif action == "hover":
                await locator.hover()
            elif action == "upload":
                await locator.set_input_files(as_files(value))
            else:
                raise ValueError(f"UNSUPPORTED_ACTION: {action}")
            with contextlib.suppress(Exception):
                await page.wait_for_load_state("domcontentloaded", timeout=2_000)
            self.snapshots.pop(tab_id, None)
            return {"ok": True, "tabId": tab_id, "elementId": element_id, "action": action, "url": page.url}


def normalize_url(url: str) -> str:
    url = url.strip()
    if not url:
        raise ValueError("URL_REQUIRED")
    if "://" not in url and not url.startswith(("about:", "data:")):
        url = "https://" + url
    return url


def as_bool(value: Any) -> bool:
    if isinstance(value, bool):
        return value
    return str(value).lower() in {"1", "true", "yes", "on", "checked"}


def as_files(value: Any) -> list[str]:
    values = value if isinstance(value, list) else [value]
    paths = [os.path.abspath(os.fspath(item)) for item in values if item]
    if not paths or any(not os.path.isfile(path) for path in paths):
        raise ValueError("UPLOAD_FILE_NOT_FOUND")
    return paths


runtime = BrowzenRuntime()


# ---------------------------------------------------------------------------
# MCP tools
# ---------------------------------------------------------------------------

mcp = FastMCP(
    "Browzen",
    instructions=(
        "Use Browzen to operate a real Chromium browser. Call browzen_tabs first, then browzen_view before "
        "browzen_act. Element IDs belong to the latest view and may become stale after navigation or DOM changes."
    ),
    host=HOST,
    port=DEFAULT_PORT,
    streamable_http_path="/",
    stateless_http=True,
    json_response=True,
)


@mcp.tool(description="List all live browser tabs and their short IDs.")
async def browzen_tabs() -> dict[str, Any]:
    return {
        "tabs": await runtime.tab_list(),
        "browser": runtime.browser_name,
        "viewer": f"http://{HOST}:{runtime.viewer_port}/",
    }


@mcp.tool(description="Open a new tab, optionally navigating it to a URL.")
async def browzen_open(url: str = "about:blank") -> dict[str, Any]:
    return await runtime.open(url)


@mcp.tool(description="Close a browser tab. Browzen always keeps at least one tab open.")
async def browzen_close(tab_id: str) -> dict[str, Any]:
    return await runtime.close(tab_id)


@mcp.tool(description="Navigate a tab to a URL and wait for its DOM to be ready.")
async def browzen_navigate(tab_id: str, url: str) -> dict[str, Any]:
    return await runtime.navigate(tab_id, url)


@mcp.tool(description="Read a rendered page as agent-friendly Markdown or structured JSON with short element IDs.")
async def browzen_view(tab_id: str, format: Literal["markdown", "json"] = "markdown") -> str | dict[str, Any]:
    data = await runtime.view(tab_id)
    if format == "json":
        return data
    lines = [f"# {data['title'] or 'Untitled'}", "", f"URL: {data['url']}", ""]
    if data["elements"]:
        lines.extend(["## Interactive elements", ""])
        for element in data["elements"]:
            kind = element["role"] or element["type"] or element["tag"]
            state = " checked" if element["checked"] is True else ""
            lines.append(f"- [{element['id']}] {kind}{state}: {element['name'] or '(unnamed)'}")
        lines.append("")
    lines.extend(["## Page text", "", data["text"] or "(No visible text)"])
    return "\n".join(lines)


@mcp.tool(description="Act on an element ID from the latest view. Fill adapts to text, select, checkbox, radio, and file inputs.")
async def browzen_act(
    tab_id: str,
    element_id: str,
    action: Literal["click", "fill", "clear", "select", "check", "uncheck", "press", "hover", "upload"],
    value: Any = None,
) -> dict[str, Any]:
    return await runtime.act(tab_id, element_id, action, value)


@mcp.tool(description="Capture a PNG screenshot of a tab or an element from the latest view.")
async def browzen_screenshot(tab_id: str, full_page: bool = False, element_id: str | None = None) -> Image:
    async with runtime.lock:
        page = runtime.page(tab_id)
        if element_id:
            _, locator, _ = await runtime.resolve(tab_id, element_id)
            data = await locator.screenshot(type="png")
        else:
            data = await page.screenshot(type="png", full_page=full_page)
        return Image(data=data, format="png")


@mcp.tool(description="Read structured console, network, cookie, storage, and page error diagnostics.")
async def browzen_devtools(
    tab_id: str,
    sections: list[Literal["console", "network", "cookies", "storage", "errors"]] | None = None,
    clear: bool = False,
) -> dict[str, Any]:
    requested = sections or ["console", "network", "cookies", "storage", "errors"]
    async with runtime.lock:
        page = runtime.page(tab_id)
        result: dict[str, Any] = {"tabId": tab_id, "url": page.url}
        for section in requested:
            if section in ("console", "network", "errors"):
                result[section] = list(runtime.logs[tab_id][section])
                if clear:
                    runtime.logs[tab_id][section].clear()
            elif section == "cookies":
                assert runtime.context
                result[section] = await runtime.context.cookies([page.url])
            elif section == "storage":
                result[section] = await page.evaluate("""() => {
                  const items = s => Object.fromEntries([...Array(s.length)].map((_, i) => [s.key(i), s.getItem(s.key(i))]));
                  try { return {local: items(localStorage), session: items(sessionStorage)}; }
                  catch (e) { return {error: String(e)}; }
                }""")
        return result


# ---------------------------------------------------------------------------
# Read-only human viewer
# ---------------------------------------------------------------------------

VIEWER_HTML = r"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Browzen Viewer</title><style>
:root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,sans-serif;background:#0b0d12;color:#edf1f7}
*{box-sizing:border-box}body{margin:0;height:100vh;display:grid;grid-template-rows:54px 1fr;overflow:hidden}
header{display:flex;align-items:center;gap:14px;padding:0 18px;background:#11151d;border-bottom:1px solid #242b38}
.brand{font-weight:750;letter-spacing:.2px}.status{font-size:12px;color:#8390a5}.dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#64d98b;margin-right:6px}
#tabs{display:flex;gap:6px;min-width:0;overflow:auto;flex:1}.tab{border:1px solid #293142;background:#181e29;color:#aeb8c8;border-radius:7px;padding:7px 11px;max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}.tab.active{background:#273248;color:white;border-color:#49618d}
main{position:relative;display:grid;place-items:center;background:#080a0e;overflow:hidden}.frame{max-width:100%;max-height:100%;object-fit:contain;box-shadow:0 0 0 1px #28303e;user-select:none}.empty{color:#778297}.hint{position:absolute;right:14px;bottom:12px;background:#111722dd;border:1px solid #2a3548;border-radius:7px;padding:7px 10px;font-size:12px;color:#9eabc0;pointer-events:none}
</style></head><body><header><div class="brand">Browzen</div><div id="tabs"></div><div class="status"><span class="dot"></span>Read-only Viewer</div></header>
<main id="stage"><div class="empty">Waiting for a browser tab...</div><div class="hint">Switch tabs above - Scroll with mouse wheel</div></main>
<script>
let selected=null, busy=false, serial=0;
async function tabs(){try{const d=await (await fetch('/api/tabs')).json();if(!selected||!d.tabs.some(t=>t.id===selected))selected=d.tabs[0]?.id||null;
document.querySelector('#tabs').innerHTML=d.tabs.map(t=>`<button class="tab ${t.id===selected?'active':''}" data-id="${t.id}" title="${escapeHtml(t.url)}">${escapeHtml(t.id+' - '+(t.title||'Untitled'))}</button>`).join('');
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{selected=b.dataset.id;serial++;tabs();frame()});}catch(e){}}
function frame(){const stage=document.querySelector('#stage');if(!selected)return;let img=stage.querySelector('img');if(!img){stage.querySelector('.empty')?.remove();img=document.createElement('img');img.className='frame';img.draggable=false;stage.prepend(img)}img.src=`/api/frame/${selected}.png?v=${Date.now()}-${serial}`}
document.querySelector('#stage').addEventListener('wheel',async e=>{e.preventDefault();if(!selected||busy)return;busy=true;try{await fetch(`/api/scroll/${selected}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({dx:e.deltaX,dy:e.deltaY})});serial++;frame()}finally{setTimeout(()=>busy=false,80)}},{passive:false});
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
setInterval(tabs,1500);setInterval(frame,850);tabs().then(frame);
</script></body></html>"""


async def viewer(_: Request) -> HTMLResponse:
    return HTMLResponse(VIEWER_HTML, headers={"Cache-Control": "no-store"})


async def viewer_tabs(_: Request) -> JSONResponse:
    return JSONResponse({"tabs": await runtime.tab_list(), "browser": runtime.browser_name})


async def viewer_frame(request: Request) -> Response:
    tab_id = request.path_params["tab_id"]
    try:
        async with runtime.lock:
            data = await runtime.page(tab_id).screenshot(type="jpeg", quality=72)
        return Response(data, media_type="image/jpeg", headers={"Cache-Control": "no-store"})
    except ValueError as exc:
        return JSONResponse({"error": str(exc)}, status_code=404)


async def viewer_scroll(request: Request) -> JSONResponse:
    tab_id = request.path_params["tab_id"]
    body = await request.json()
    async with runtime.lock:
        page = runtime.page(tab_id)
        dx = max(-2000, min(2000, float(body.get("dx", 0))))
        dy = max(-2000, min(2000, float(body.get("dy", 0))))
        await page.evaluate("([x,y]) => scrollBy(x,y)", [dx, dy])
    return JSONResponse({"ok": True})


@asynccontextmanager
async def lifespan(_: Starlette):
    await runtime.start()
    async with mcp.session_manager.run():
        yield
    await runtime.stop()


def create_app() -> Starlette:
    return Starlette(
        routes=[
            Route("/", viewer),
            Route("/api/tabs", viewer_tabs),
            Route("/api/frame/{tab_id}.png", viewer_frame),
            Route("/api/scroll/{tab_id}", viewer_scroll, methods=["POST"]),
            Mount("/mcp", app=mcp.streamable_http_app()),
        ],
        middleware=[Middleware(TrustedHostMiddleware, allowed_hosts=["127.0.0.1", "localhost", "testserver"])],
        lifespan=lifespan,
    )


def create_viewer_app() -> Starlette:
    """Viewer-only app used while MCP communicates over stdio."""
    return Starlette(
        routes=[
            Route("/", viewer),
            Route("/api/tabs", viewer_tabs),
            Route("/api/frame/{tab_id}.png", viewer_frame),
            Route("/api/scroll/{tab_id}", viewer_scroll, methods=["POST"]),
        ],
        middleware=[Middleware(TrustedHostMiddleware, allowed_hosts=["127.0.0.1", "localhost", "testserver"])],
    )


app = create_app()


async def run_stdio_mode(port: int) -> None:
    """Run MCP on stdio while keeping the human Viewer on localhost."""
    viewer_port = available_port(port)
    runtime.viewer_port = viewer_port
    await runtime.start()
    server = uvicorn.Server(
        uvicorn.Config(create_viewer_app(), host=HOST, port=viewer_port, log_level="warning", access_log=False)
    )
    viewer_task = asyncio.create_task(server.serve())
    try:
        for _ in range(200):
            if server.started:
                break
            if viewer_task.done():
                raise RuntimeError(f"Viewer could not start on {HOST}:{viewer_port}")
            await asyncio.sleep(0.01)
        else:
            raise RuntimeError(f"Viewer timed out while starting on {HOST}:{viewer_port}")
        if viewer_port != port:
            print(f"Port {port} is in use; Viewer moved to http://{HOST}:{viewer_port}/", file=sys.stderr)
        else:
            print(f"Browzen {VERSION} plugin mode - Viewer http://{HOST}:{viewer_port}/", file=sys.stderr)
        await mcp.run_stdio_async()
    finally:
        server.should_exit = True
        with contextlib.suppress(Exception):
            await viewer_task
        await runtime.stop()


def available_port(preferred: int) -> int:
    """Return the preferred localhost port or the next available one."""
    for port in range(preferred, min(preferred + 20, 65_536)):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
            try:
                probe.bind((HOST, port))
            except OSError:
                continue
            return port
    raise RuntimeError(f"No available Viewer port found near {preferred}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Browzen agent-native browser runtime")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help=f"localhost port (default: {DEFAULT_PORT})")
    parser.add_argument("--stdio", action="store_true", help="run MCP over stdio for plugin hosts")
    parser.add_argument("--version", action="version", version=f"Browzen {VERSION}")
    args = parser.parse_args()
    if args.stdio:
        asyncio.run(run_stdio_mode(args.port))
        # The MCP stdio transport owns and closes stdout. Avoid PyInstaller's
        # interpreter shutdown trying to flush that closed stream.
        os._exit(0)
    else:
        print(f"Browzen {VERSION}\nViewer  http://{HOST}:{args.port}/\nMCP     http://{HOST}:{args.port}/mcp")
        uvicorn.run(app, host=HOST, port=args.port, log_level="info")


if __name__ == "__main__":
    main()
