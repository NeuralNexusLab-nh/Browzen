import { identity } from "./crypto.js";
import { vanityEstimate } from "./address.js";
self.onmessage = async ({ data }) => {
  try {
    const prefix = String(data.prefix || "").toLowerCase();
    vanityEstimate(prefix, 1);
    const started = performance.now();
    let attempts = 0,
      last = started;
    while (true) {
      const result = await identity();
      attempts++;
      const now = performance.now();
      if (result.address.startsWith(prefix)) {
        self.postMessage({
          type: "result",
          address: result.address,
          secret: result.secret,
          attempts,
          seconds: (now - started) / 1000,
        });
        return;
      }
      if (now - last > 300) {
        last = now;
        const rate = attempts / ((now - started) / 1000);
        self.postMessage({
          type: "progress",
          attempts,
          rate,
          seconds: (now - started) / 1000,
          expected: vanityEstimate(prefix, rate).seconds,
        });
      }
      if (attempts % 32 === 0) await new Promise((r) => setTimeout(r, 0));
    }
  } catch (error) {
    self.postMessage({ type: "error", error: error.message });
  }
};
