import test from "node:test";
import assert from "node:assert/strict";
import { mappedRequest, mappedResponse, displayURL } from "./mapped-site.js";
import { addressToURL } from "./url-policy.js";
import { readFile } from "node:fs/promises";
test("display names stay in the address bar while transport uses the actual HTTPS origin", () => {
  assert.equal(
    addressToURL("nxlabtw.bzn/projects?q=1"),
    "https://nxlabtw.bzn/projects?q=1",
  );
  const request = mappedRequest(
    {
      url: "https://nxlabtw.bzn/projects?q=1",
      method: "POST",
      headers: { Origin: "https://nxlabtw.bzn" },
      body: new Uint8Array([1]).buffer,
    },
    "nxlabtw.bzn",
  );
  assert.equal(request.url, "https://nxlabtw.com/projects?q=1");
  assert.equal(request.headers.Origin, "https://nxlabtw.com");
  assert.equal(
    displayURL("https://nxlabtw.com/projects", "nxlabtw.bzn"),
    "https://nxlabtw.bzn/projects",
  );
});
test("relative resources, redirects and cookie domains retain the virtual origin", () => {
  const response = mappedResponse(
    {
      status: 302,
      headers: {
        location: "/next",
        "access-control-allow-origin": "https://nxlabtw.com",
        "set-cookie": [
          "a=1; Domain=.nxlabtw.com; Secure",
          "b=2; Domain=other.example",
        ],
      },
    },
    "nxlabtw.bzn",
    "https://nxlabtw.com/old",
  );
  assert.equal(response.headers.location, "https://nxlabtw.bzn/next");
  assert.equal(
    response.headers["access-control-allow-origin"],
    "https://nxlabtw.bzn",
  );
  assert.deepEqual(response.headers["set-cookie"], [
    "a=1; Domain=nxlabtw.bzn; Secure",
    "b=2; Domain=other.example",
  ]);
  assert.equal(
    mappedRequest({ url: "https://cdn.example/x.js" }, "nxlabtw.bzn").url,
    "https://cdn.example/x.js",
  );
  assert.equal(
    displayURL("https://nxlabtw.com.evil.example/x", "nxlabtw.bzn"),
    "https://nxlabtw.com.evil.example/x",
  );
});
test("mapping paths cannot change the chosen upstream and do not replace outer location", async () => {
  assert.equal(
    new URL(
      mappedRequest(
        { url: "https://nxlabtw.bzn//evil.example/" },
        "nxlabtw.bzn",
      ).url,
    ).origin,
    "https://nxlabtw.com",
  );
  const browser = await readFile(
      new URL("./browser.js", import.meta.url),
      "utf8",
    ),
    doc = await readFile(
      new URL("../BrowzenNetwork.md", import.meta.url),
      "utf8",
    );
  assert.doesNotMatch(browser, /if\(bzn\?\.alias\)\{location\.assign/);
  assert.doesNotMatch(
    doc,
    /nxlabtw\.bzn|browzen\.bzn|acmtn\.bzn|neutron\.bzn|Built-in HTTPS shortcuts/,
  );
});
