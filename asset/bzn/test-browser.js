import { identity, b64, utf8 } from "./crypto.js";
import { BznHost, BznClient } from "./protocol.js";
import { createOpaqueHost } from "../single/host.js";
import { validateRemote } from "../url-policy.js";
const out = document.querySelector("#results");
let host, client, engine;
function rooms() {
  const map = new Map();
  return (pin) => ({
    async start(handler) {
      this.pin = pin;
      this.handler = handler;
      if (!map.has(pin)) map.set(pin, new Set());
      map.get(pin).add(this);
      return this;
    },
    async send(data) {
      for (const room of map.get(pin) || [])
        queueMicrotask(() =>
          Promise.resolve(room.handler(structuredClone(data))).catch(() => {}),
        );
    },
    close() {
      map.get(this.pin)?.delete(this);
    },
  });
}
const fixture = `<!doctype html><html><head><title>BZN rendered test</title><link rel="stylesheet" href="/style.css"></head><body><h1>BZN rendered test</h1><img src="/image.svg" alt="BZN image"><button id="post">Test encrypted POST</button><pre id="post-result"></pre><script>document.querySelector('#post').onclick=async()=>{const res=await fetch('/api/echo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({hello:'BZN'})});document.querySelector('#post-result').textContent=await res.text();};</script></body></html>`;
document.querySelector("#run").onclick = async (e) => {
  e.target.disabled = true;
  out.textContent = "Starting…";
  try {
    host?.stop();
    client?.close();
    engine?.destroy();
    const key = await identity(),
      makeRoom = rooms();
    host = await new BznHost({
      secret: key.secret,
      port: 3000,
      makeRoom,
      serve: async (request) => {
        const css = request.url === "/style.css",
          image = request.url === "/image.svg",
          echo = request.url === "/api/echo";
        return {
          status: 200,
          headers: {
            "content-type": css
              ? "text/css"
              : image
                ? "image/svg+xml"
                : echo
                  ? "application/json"
                  : "text/html",
          },
          body: b64(
            utf8.encode(
              css
                ? "body{background:#141d2c;color:#eaf0fa;font:18px system-ui;padding:25px}h1{color:rgb(135,216,233)}"
                : image
                  ? '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="70"><rect width="200" height="70" fill="#b2a5ff"/></svg>'
                  : echo
                    ? JSON.stringify({
                        method: request.method,
                        body: request.body
                          ? new TextDecoder().decode(
                              Uint8Array.from(
                                atob(
                                  request.body
                                    .replaceAll("-", "+")
                                    .replaceAll("_", "/"),
                                ),
                                (c) => c.charCodeAt(0),
                              ),
                            )
                          : "",
                      })
                    : fixture,
            ),
          ),
        };
      },
    }).start();
    client = await new BznClient(key.address, { makeRoom }).connect();
    out.textContent =
      "PASS: browser HPKE + encrypted handshake. Rendering HTML, CSS, image and JS…";
    const frame = document.createElement("iframe");
    frame.sandbox = "allow-scripts allow-forms";
    frame.title = "BZN test website";
    frame.width = "900";
    frame.height = "400";
    document.querySelector("#view").replaceChildren(frame);
    const record = { id: "test", frame, abort: new AbortController() };
    engine = createOpaqueHost({
      record,
      transport: (data) => client.request(data),
      validate: validateRemote,
      siteAction: () => {},
      emit: (event) => {
        if (event.type === "engine-error")
          out.textContent += "\nFAIL: " + event.error;
        if (event.type === "tab-update" && event.loading === false)
          out.textContent += "\nPASS: encrypted resources rendered.";
      },
    });
    await engine.command({
      type: "navigate",
      url: "https://" + key.address + "/",
      zoom: 100,
    });
  } catch (error) {
    out.textContent += "\nFAIL: " + error.message;
  } finally {
    e.target.disabled = false;
  }
};
addEventListener("pagehide", () => {
  host?.stop();
  client?.close();
  engine?.destroy();
});
