---
name: use-browzen
description: Use Browzen when a task needs a real local Chromium browser, rendered web pages, multi-tab navigation, structured page interaction, screenshots, or browser DevTools diagnostics.
---

# Use Browzen

Browzen runs locally and exposes a read-only human Viewer, normally at `http://127.0.0.1:7023/`.
Use the `viewer` URL returned by `browzen_tabs`; Browzen selects another localhost port when 7023 is already in use.

## Workflow

1. Call `browzen_tabs` to discover the current tabs and their short IDs.
2. Use `browzen_open` for a new tab or `browzen_navigate` for an existing tab.
3. Call `browzen_view` before interacting. Prefer Markdown for reading and JSON when exact element metadata matters.
4. Pass an element ID from the latest view to `browzen_act`.
5. Call `browzen_view` again after every action because navigation or DOM updates can make element IDs stale.
6. Use `browzen_screenshot` when visual layout matters and `browzen_devtools` for console, network, cookie, storage, or page-error evidence.

## Interaction rules

- Never guess element IDs. Always obtain them from the latest `browzen_view` result.
- Treat `STALE_ELEMENT` as a normal recovery signal: view the page again, find the intended control, and retry once.
- Use `fill` for text-like inputs. Browzen also adapts `fill` to selects, checkboxes, radio buttons, and file inputs.
- Use explicit actions when intent matters: `select`, `check`, `uncheck`, `press`, `hover`, or `upload`.
- Keep user-impacting actions reviewable. Do not submit purchases, publish content, or confirm irreversible changes without the user's authorization.
- The Viewer is for observation, tab switching, and scrolling only; page controls are intentionally non-interactive for humans.
