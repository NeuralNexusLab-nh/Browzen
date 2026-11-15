import { aliases } from "./bzn/address.js?v=20261115-guide1";

// Keep a local display name inside the existing renderer. Never navigate the
// outer window or send the virtual hostname to a public DNS resolver.
export function displayURL(value, name) {
  const upstream = aliases[name];
  if (!upstream) return value;
  const url = new URL(value),
    target = new URL(upstream);
  if (url.origin === target.origin) {
    url.protocol = "https:";
    url.host = name;
  }
  return url.href;
}
export function mappedRequest(data, name) {
  if (!aliases[name]) throw Error("Unknown local site mapping.");
  const url = new URL(data.url),
    target = new URL(aliases[name]),
    virtual = "https://" + name;
  if (url.origin !== virtual) return data;
  url.protocol = target.protocol;
  url.host = target.host;
  const headers = { ...data.headers };
  for (const k of Object.keys(headers)) {
    if (k.toLowerCase() === "origin" && headers[k] === virtual)
      headers[k] = target.origin;
    if (k.toLowerCase() === "referer")
      try {
        const ref = new URL(headers[k]);
        if (ref.origin === virtual) {
          ref.protocol = target.protocol;
          ref.host = target.host;
          headers[k] = ref.href;
        }
      } catch {}
  }
  return { ...data, url: url.href, headers };
}
export function mappedResponse(response, name, requestURL) {
  const target = new URL(aliases[name]),
    headers = { ...response.headers };
  for (const key of Object.keys(headers)) {
    const lower = key.toLowerCase(),
      value = headers[key];
    if (lower === "location" && typeof value === "string")
      headers[key] = displayURL(new URL(value, requestURL).href, name);
    if (lower === "access-control-allow-origin" && value === target.origin)
      headers[key] = "https://" + name;
    if (lower === "set-cookie") {
      const rewrite = (cookie) =>
        typeof cookie === "string"
          ? cookie.replace(
              /(\bDomain\s*=\s*)\.?([^;]+)/i,
              (all, prefix, domain) =>
                domain.trim().toLowerCase() === target.hostname
                  ? prefix + name
                  : all,
            )
          : cookie;
      headers[key] = Array.isArray(value) ? value.map(rewrite) : rewrite(value);
    }
  }
  return { ...response, headers };
}
