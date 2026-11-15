import { identity } from "./crypto.js";
import { vanityEstimate } from "./address.js";
import { BznHost } from "./protocol.js";
const $ = (s) => document.querySelector(s),
  app = $("#app");
let generated = null,
  worker = null,
  host = null;
const escape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
const duration = (n) =>
  !Number.isFinite(n)
    ? "Measuring…"
    : n < 60
      ? Math.max(1, Math.round(n)) + " seconds"
      : n < 3600
        ? (n / 60).toFixed(1) + " minutes"
        : n < 86400
          ? (n / 3600).toFixed(1) + " hours"
          : n < 31536000
            ? (n / 86400).toFixed(1) + " days"
            : (n / 31536000).toFixed(1) + " years";
function state(message, kind = "idle") {
  const el = $("#state");
  if (el) {
    el.textContent = message;
    el.dataset.state = kind;
  }
}
async function copy(value, button) {
  try {
    await navigator.clipboard.writeText(value);
    button.textContent = "Copied";
    setTimeout(() => {
      if (button.isConnected) button.textContent = "Copy";
    }, 1500);
  } catch {
    state(
      "Clipboard unavailable. Select the value and copy it manually.",
      "error",
    );
  }
}
function route(page) {
  if (host?.running && !confirm("Stop hosting and leave this page?")) return;
  host?.stop();
  host = null;
  worker?.terminate();
  worker = null;
  history.pushState(null, "", "/bzn/" + page);
  render(page);
}
document.querySelectorAll("[data-route]").forEach(
  (a) =>
    (a.onclick = (e) => {
      e.preventDefault();
      route(a.dataset.route);
    }),
);
addEventListener("popstate", () => {
  host?.stop();
  host = null;
  worker?.terminate();
  render(location.pathname.includes("/host") ? "host" : "address");
});
addEventListener("pagehide", () => {
  host?.stop();
  worker?.terminate();
  generated = null;
});
addEventListener("beforeunload", (e) => {
  if (host?.running) {
    e.preventDefault();
    e.returnValue = "";
  }
});
function render(page) {
  document.title =
    "Browzen Network · " + (page === "host" ? "Host" : "Address");
  document
    .querySelectorAll("[data-route]")
    .forEach((a) =>
      a.setAttribute(
        "aria-current",
        a.dataset.route === page ? "page" : "false",
      ),
    );
  if (!isSecureContext) {
    app.innerHTML =
      "<h1>HTTPS required</h1><p>Use HTTPS or localhost to protect private keys and enable browser cryptography.</p>";
    return;
  }
  page === "host" ? renderHost() : renderAddress();
}
function renderAddress() {
  app.innerHTML = `<div class="eyebrow">Browzen Network</div><h1>Your address. Your key.</h1><p>Create a public-key address for a website you control. No registration. No Puter account.</p><div class="grid"><section class="card accent"><h2>Create one address</h2><p>Leave the prefix empty for a random address, or choose a vanity prefix.</p><label for="prefix">Vanity prefix · optional</label><input id="prefix" maxlength="8" placeholder="e.g. nxlab" autocomplete="off" spellcheck="false"><div class="hint">Letters a–z and digits 2–7. Each extra character takes about 32× more work.</div><div class="row"><button id="generate" class="primary">Generate address</button><button id="cancel" hidden>Cancel</button></div><div id="state" class="status" role="status">Ready to generate</div><div id="progress" class="metric"></div></section><section class="card"><h2>What is a BZN address?</h2><p>A 52-character encoding of your full X25519 public key, followed by <code>.bzn</code>: 56 characters in total. Open it inside Browzen Web.</p><p>The private key proves ownership. Keep a backup: losing it means losing this address.</p><div class="notice">Vanity estimates are based on your device's measured speed. Search is random, not a countdown. A long prefix can take days or years.</div><p class="hint">This compact address has no typo checksum. Browzen never silently guesses a different public key.</p></section></div><section id="result" class="card accent" hidden><h2>Your website identity</h2><div class="label-row"><label>Address</label><button id="copy-address">Copy</button></div><div id="address-result" class="key-output"></div><div class="label-row"><label>Private key</label><button id="copy-key">Copy</button></div><div id="key-result" class="key-output"></div><div class="notice warning">Anyone with this private key can impersonate your website. It is not uploaded to Neutron or saved automatically. Save it before leaving.</div><div class="row"><button id="download">Download key</button><button id="open-host" class="primary">Host this address →</button></div></section>`;
  $("#generate").onclick = () => {
    try {
      const prefix = $("#prefix").value.trim().toLowerCase();
      vanityEstimate(prefix, 1);
      $("#prefix").value = prefix;
      worker?.terminate();
      worker = new Worker("/asset/bzn/generator-worker.js", { type: "module" });
      $("#generate").disabled = true;
      $("#cancel").hidden = false;
      $("#result").hidden = true;
      generated = null;
      state("Generating · Private keys stay on this device", "busy");
      $("#progress").textContent = "Measuring this device…";
      worker.onmessage = ({ data }) => {
        if (data.type === "progress") {
          $("#progress").textContent =
            data.attempts.toLocaleString() +
            " attempts · " +
            data.rate.toFixed(0) +
            "/sec\nAverage search time at this speed: " +
            duration(data.expected) +
            " · Elapsed: " +
            duration(data.seconds);
        } else {
          worker.terminate();
          worker = null;
          $("#generate").disabled = false;
          $("#cancel").hidden = true;
          if (data.type === "error") {
            state(data.error, "error");
            return;
          }
          generated = { address: data.address, secret: data.secret };
          showResult();
          state("One address generated", "live");
          $("#progress").textContent =
            data.attempts.toLocaleString() +
            " attempts · " +
            duration(data.seconds);
        }
      };
      worker.onerror = (e) => {
        worker?.terminate();
        worker = null;
        $("#generate").disabled = false;
        $("#cancel").hidden = true;
        state(e.message || "Generator failed.", "error");
      };
      worker.postMessage({ prefix });
    } catch (error) {
      state(error.message, "error");
    }
  };
  $("#cancel").onclick = () => {
    worker?.terminate();
    worker = null;
    $("#generate").disabled = false;
    $("#cancel").hidden = true;
    state("Search cancelled. No address saved.");
  };
  $("#copy-address").onclick = (e) => copy(generated.address, e.target);
  $("#copy-key").onclick = (e) => copy(generated.secret, e.target);
  $("#download").onclick = () => {
    const url = URL.createObjectURL(
        new Blob(
          [JSON.stringify({ format: "bzn-identity/1", ...generated }, null, 2)],
          { type: "application/json" },
        ),
      ),
      a = document.createElement("a");
    a.href = url;
    a.download = generated.address + ".key.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  $("#open-host").onclick = () => route("host");
  if (generated) showResult();
}
function showResult() {
  $("#result").hidden = false;
  $("#address-result").textContent = generated.address;
  $("#key-result").textContent = generated.secret;
}
function renderHost() {
  const origin = location.origin;
  app.innerHTML = `<div class="eyebrow">Browzen Network</div><h1>Bring localhost online.</h1><p>Your local website. Your public-key address. Encrypted through Neutron.</p><div class="grid"><section class="card accent"><h2>Host a website</h2><label for="port">Local HTTP port</label><input id="port" type="number" min="1" max="65535" value="3000"><div class="hint">Only http://127.0.0.1 on this port is exposed. Redirects to other services are blocked.</div><label for="private-key">Private key</label><textarea id="private-key" placeholder="bzn1.…" autocomplete="off" spellcheck="false"></textarea><div class="row"><label class="button" for="key-file">Import key file</label><input id="key-file" type="file" accept=".json,.txt" hidden></div><label>Your BZN address</label><div id="host-address" class="key-output">Import a private key to see its address.</div><div class="row"><button id="start" class="primary">Start hosting</button><button id="stop" disabled>Stop hosting</button></div><div id="state" class="status" role="status">Offline</div><div class="notice warning">Starting exposes this service to BZN visitors, including its write APIs. Use a dedicated website, not an admin panel. Keep this page and device awake. Neutron is not an anonymity network.</div></section><section class="card"><h2>Allow this Browzen origin</h2><p>Your local server must allow CORS for the exact origin below. This is detected from the page you opened, including alternate Browzen domains.</p><div class="key-output">${escape(origin)}</div><p class="hint">Your browser may also ask for local-network access. Allow it only for a Browzen deployment you trust. This permission does not replace CORS.</p><details open><summary>CORS response headers</summary><pre id="cors"></pre><button id="copy-cors">Copy</button><p class="hint">Handle OPTIONS with 204 and include CORS headers on errors too. Add only request headers your app needs. Do not reflect arbitrary origins. Credentials are omitted; your normal localhost login cookies are never forwarded.</p></details><details><summary>Express example</summary><pre id="express"></pre></details><details><summary>Host with code · no web agent</summary><p>Use the same BZN protocol directly from your application. No AI agent and no Puter transport are involved.</p><pre id="api-example"></pre><p>The current adapter is browser-based. A Node/Python host needs a compatible Neutron OPAQUE/crypto adapter, not just an HTTP call.</p><a href="/BrowzenNetwork.md" target="_blank" rel="noopener">Protocol, API and limitations ↗</a></details></section></div>`;
  const cors = `Access-Control-Allow-Origin: ${origin}\nAccess-Control-Allow-Methods: GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS\nAccess-Control-Allow-Headers: Content-Type\nAccess-Control-Expose-Headers: Content-Type, Content-Disposition, Location\nVary: Origin`;
  $("#cors").textContent = cors;
  $("#copy-cors").onclick = (e) => copy(cors, e.target);
  $("#express").textContent =
    `// Install cors in your local website: npm install cors\nimport cors from 'cors';\napp.use(cors({\n  origin: ${JSON.stringify(origin)},\n  methods: ['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS'],\n  allowedHeaders: ['Content-Type'],\n  exposedHeaders: ['Content-Type','Content-Disposition','Location'],\n  credentials: false\n}));\n// Add your website routes after this middleware.`;
  $("#api-example").textContent =
    `import { BznHost } from ${JSON.stringify(origin + "/asset/bzn/protocol.js")};\nconst host = await new BznHost({\n  secret: privateKey, // Never put keys in URLs\n  port: 3000,\n  onState: console.log,\n  onError: console.error\n}).start();\n// host.stop();`;
  let revision = 0;
  $("#private-key").oninput = async () => {
    const token = ++revision;
    try {
      const value = $("#private-key").value.trim();
      if (!value) {
        $("#host-address").textContent =
          "Import a private key to see its address.";
        return;
      }
      const result = await identity(value);
      if (token === revision) $("#host-address").textContent = result.address;
    } catch (error) {
      if (token === revision) $("#host-address").textContent = error.message;
    }
  };
  $("#key-file").onchange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 4096) throw Error("Key file is too large.");
      const raw = await file.text();
      let secret = raw.trim();
      if (secret.startsWith("{")) secret = JSON.parse(raw).secret;
      if (typeof secret !== "string") throw Error("Invalid key file.");
      $("#private-key").value = secret;
      await $("#private-key").oninput();
    } catch (error) {
      state(error.message, "error");
    }
  };
  $("#start").onclick = async () => {
    $("#start").disabled = true;
    $("#port").disabled = true;
    $("#private-key").disabled = true;
    $("#stop").disabled = false;
    state("Checking local service…", "busy");
    try {
      host = new BznHost({
        secret: $("#private-key").value.trim(),
        port: $("#port").value,
        onState: (message, details) => {
          state(
            message,
            details ? "live" : message === "Offline" ? "idle" : "busy",
          );
          if (details) $("#host-address").textContent = details.address;
        },
        onError: (error) =>
          state("Connection issue · " + error.message, "error"),
      });
      await host.start();
    } catch (error) {
      host?.stop();
      host = null;
      state(
        "Could not start · " +
          error.message +
          ". Check the port, CORS and local-network permission.",
        "error",
      );
      $("#start").disabled = false;
      $("#port").disabled = false;
      $("#private-key").disabled = false;
      $("#stop").disabled = true;
    }
  };
  $("#stop").onclick = () => {
    host?.stop();
    host = null;
    $("#start").disabled = false;
    $("#port").disabled = false;
    $("#private-key").disabled = false;
    $("#stop").disabled = true;
  };
  if (generated) {
    $("#private-key").value = generated.secret;
    $("#host-address").textContent = generated.address;
  }
}
render(location.pathname.includes("/host") ? "host" : "address");
