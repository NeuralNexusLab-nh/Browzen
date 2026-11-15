// Local development only. Never deploy this HTTP server as an Internet proxy.
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, stat } from "node:fs/promises";
const root = fileURLToPath(new URL("../../", import.meta.url)),
  port = Number(process.env.BZN_DEV_PORT || 7360),
  samplePort = port + 1;
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".wasm": "application/wasm",
  ".md": "text/plain",
  ".json": "application/json",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let full = path.resolve(root, "." + pathname);
      if (
        !full.startsWith(path.resolve(root) + path.sep) &&
        full !== path.resolve(root)
      )
        throw Error("Invalid path");
      if ((await stat(full)).isDirectory())
        full = path.join(full, "index.html");
      const body = await readFile(full);
      res
        .writeHead(200, {
          "Content-Type":
            mime[path.extname(full)] || "application/octet-stream",
          "Cache-Control": "no-store",
        })
        .end(body);
    } catch {
      res.writeHead(404).end("Not found");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log("Browzen: http://127.0.0.1:" + port + "/bzn/address"),
  );
http
  .createServer(async (req, res) => {
    const allowed = "http://127.0.0.1:" + port;
    if (req.headers.origin && req.headers.origin !== allowed) {
      res.writeHead(403).end();
      return;
    }
    res.setHeader("Access-Control-Allow-Origin", allowed);
    res.setHeader("Vary", "Origin");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.writeHead(204).end();
      return;
    }
    if (req.url === "/style.css") {
      res.setHeader("Content-Type", "text/css");
      res.end(
        "body{background:#101725;color:#eaf0fa;font:18px system-ui;padding:40px}a,button{color:#87d8e9}",
      );
      return;
    }
    if (req.url === "/image.svg") {
      res.setHeader("Content-Type", "image/svg+xml");
      res.end(
        '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="100"><rect width="240" height="100" fill="#b2a5ff"/><text x="24" y="60" font-size="28">BZN image</text></svg>',
      );
      return;
    }
    if (req.url === "/api/echo") {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          method: req.method,
          body: Buffer.concat(chunks).toString(),
        }),
      );
      return;
    }
    res.setHeader("Content-Type", "text/html");
    res.end(
      '<!doctype html><html><head><title>BZN live test</title><link rel="stylesheet" href="/style.css"></head><body><h1>BZN live test</h1><p id="loaded">HTML delivered through Neutron.</p><img src="/image.svg" alt="BZN test image"><p><a href="/second">Open another page</a></p><button id="echo">Test POST</button><pre id="result"></pre><script>document.querySelector("#echo").onclick=async()=>{const r=await fetch("/api/echo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({hello:"BZN"})});document.querySelector("#result").textContent=await r.text();};</script></body></html>',
    );
  })
  .listen(samplePort, "127.0.0.1", () =>
    console.log("Sample localhost website: port " + samplePort),
  );
