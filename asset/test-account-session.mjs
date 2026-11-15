import test from "node:test";
import assert from "node:assert/strict";
import { endPuterSession } from "./account-session.js";
import { readFile } from "node:fs/promises";
test("logout clears pages, awaits actual Puter signOut, then locks the app", async () => {
  const events = [];
  let signed = true;
  await endPuterSession({
    auth: {
      async signOut() {
        events.push("signOut");
        await new Promise((r) => setTimeout(r, 5));
        signed = false;
        events.push("signedOut");
      },
      isSignedIn: () => signed,
    },
    clear: async () => events.push("clear"),
    lock: () => events.push("lock"),
  });
  assert.deepEqual(events, ["clear", "signOut", "signedOut", "lock"]);
});
test("failed or unavailable sign-out is not reported as successful", async () => {
  let locked = false;
  await assert.rejects(
    () =>
      endPuterSession({
        auth: {},
        clear: () => {},
        lock: () => {
          locked = true;
        },
      }),
    /unavailable/,
  );
  await assert.rejects(
    () =>
      endPuterSession({
        auth: { signOut: async () => {}, isSignedIn: () => true },
        clear: () => {},
        lock: () => {
          locked = true;
        },
      }),
    /still signed in/,
  );
  assert.equal(locked, false);
});
test("sign-in gate has exactly one button and menu logout is after Refresh Identity", async () => {
  const html = await readFile(
      new URL("../index.html", import.meta.url),
      "utf8",
    ),
    browser = await readFile(new URL("./browser.js", import.meta.url), "utf8"),
    gate = html.slice(html.indexOf('<section id="auth-gate"'));
  assert.equal((gate.match(/<button\b/g) || []).length, 1);
  assert.doesNotMatch(gate, /network-only|data-bzn-page/);
  assert.doesNotMatch(browser, /\$\('#network-only'\)/);
  assert.ok(
    browser.indexOf("logoutButton.id='logout'") >
      browser.indexOf("identityButton.textContent='Refresh Identity'"),
  );
  assert.match(browser, /await endPuterSession/);
});
