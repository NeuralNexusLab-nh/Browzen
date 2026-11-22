// Virtual embedding policy. Network and origin permissions are never relaxed.
export function assertEmbeddable(headers, url, ancestors) {
  if (!ancestors.length) return;
  const origin = new URL(url).origin;
  const policies = String(headers['content-security-policy'] || '').split(',');
  let enforced = false;
  for (const policy of policies) {
    const directive = policy.split(';').map(s => s.trim()).find(s => /^frame-ancestors(?:\s|$)/i.test(s));
    if (!directive) continue;
    enforced = true;
    const sources = directive.split(/\s+/).slice(1);
    if (!ancestors.every(ancestor => sources.some(source => {
      if (source === "'none'") return false;
      if (source === "'self'") return ancestor === origin;
      if (source === '*') return /^https?:/.test(ancestor);
      if (/^https?:$/.test(source)) return new URL(ancestor).protocol === source;
      try {
        const candidate = new URL(source.replace('://*.', '://wildcard.'));
        const a = new URL(ancestor);
        if (candidate.protocol !== a.protocol || candidate.port !== a.port) return false;
        if (candidate.hostname.startsWith('wildcard.')) return a.hostname.endsWith('.' + candidate.hostname.slice(9));
        return candidate.origin === a.origin;
      } catch { return false; }
    }))) throw new Error('This website disallows embedding (CSP frame-ancestors).');
  }
  if (enforced) return;
  const xfo = String(headers['x-frame-options'] || '').trim().toUpperCase();
  if (xfo === 'DENY' || xfo === 'SAMEORIGIN' && ancestors.some(a => a !== origin) || xfo.includes(',')) {
    throw new Error('This website disallows embedding (X-Frame-Options).');
  }
}

export function acceptsMessage(targetOrigin, destinationURL, sourceURL) {
  if (targetOrigin === '*') return true;
  if (targetOrigin === '/') return new URL(sourceURL).origin === new URL(destinationURL).origin;
  try { return new URL(targetOrigin).origin === new URL(destinationURL).origin; } catch { return false; }
}

export function boundedRect(rect) {
  const values = ['x', 'y', 'width', 'height'].map(k => Number(rect?.[k]));
  if (values.some(n => !Number.isFinite(n) || Math.abs(n) > 100000)) throw new Error('Invalid child frame bounds.');
  const [x, y, width, height] = values;
  return { x, y, width: Math.max(0, Math.min(8192, width)), height: Math.max(0, Math.min(8192, height)) };
}
