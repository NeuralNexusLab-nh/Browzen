importScripts('/asset/runtime/vendor/scramjet/scramjet.guarded.js');
const {ScramjetServiceWorker}=$scramjetLoadWorker(),engine=new ScramjetServiceWorker();
const BROWSING_SUSPENDED=false;
const POLICY="default-src 'none'; connect-src 'self'; script-src 'self' data: blob: 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; img-src 'self' data: blob:; media-src 'self' data: blob:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; frame-src 'self'; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; sandbox allow-scripts allow-same-origin allow-forms";
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>event.respondWith((async()=>{
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return new Response('Direct connections blocked',{status:403});
 await engine.loadConfig();
 if(engine.route(event)){
  const virtual=decodeURIComponent(url.pathname.slice('/asset/runtime/p/'.length));
  if(BROWSING_SUSPENDED&&!virtual.startsWith('https://browzen.test/')&&!virtual.startsWith('blob:'))return new Response('Browsing suspended pending local verification.',{status:503});
  const r=await engine.fetch(event),h=new Headers(r.headers);
  if(!(r.status>=300&&r.status<400)&&['document','iframe'].includes(event.request.destination)&&!/^text\/(html|plain)\b|^application\/json\b/i.test(h.get('content-type')||''))return new Response('This document type is blocked in the web preview.',{status:415,headers:{'Content-Type':'text/plain','Content-Security-Policy':POLICY}});
  h.set('Content-Security-Policy',POLICY);h.set('X-DNS-Prefetch-Control','off');h.set('Referrer-Policy','no-referrer');
  h.delete('Link');h.delete('Refresh');h.delete('Report-To');h.delete('NEL');
  let body=r.body;
  if(/^text\/html\b/i.test(h.get('content-type')||'')){
   const html=(await r.text()).replace(/^\s*<!doctype[^>]*>/i,'');
   // Also protect HTML error pages and pages that bypass the normal HTML injector.
   body='<!doctype html><script src="/asset/runtime/privacy-guard.js"></script><script>__browzenPrivacy.install(globalThis);</script>'+html;
   h.set('Content-Type','text/html; charset=utf-8');h.delete('Content-Length');h.delete('Content-Encoding');
  }
  return new Response(body,{status:r.status,statusText:r.statusText,headers:h});
 }
 // Only runtime assets may bypass the virtual network broker.
 if(!/^\/asset\/runtime\/(vendor\/|(?:sw|privacy-guard|runtime|site-bridge|source-normalizer)\.js$|index\.html$)/.test(url.pathname))return new Response('Unknown runtime resource',{status:403});
 return fetch(event.request);
})()));

