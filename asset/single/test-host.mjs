import test from 'node:test';import assert from 'node:assert/strict';import {createOpaqueHost}from'./host.js';import {validateRemote}from'../url-policy.js';
// Broker unit tests. The fake frame does not execute HTML; native isolation is
// separately exercised by test-fixtures/single.html in a real browser.
test('trusted broker: redirects, CORS, cookies, scope binding and cleanup',async t=>{
 const oldDocument=globalThis.document,oldFetch=globalThis.fetch;
 globalThis.document={createElement(){return {innerHTML:'',content:{querySelector(){return null;},querySelectorAll(){return [];}}};}};
 globalThis.fetch=async()=>new Response('// synthetic bootstrap');
 const calls=[],events=[];let child,documentReady,requestID=0,frameHTML='';const pending=new Map();
 let resolveDocument;documentReady=new Promise(r=>resolveDocument=r);
 const frame={contentWindow:{postMessage(data,origin,ports){child=ports[0];child.onmessage=e=>{if(e.data.type==='document')resolveDocument(e.data);if(e.data.rpc){pending.get(e.data.rpc)?.(e.data);pending.delete(e.data.rpc);}};child.start();child.postMessage({type:'ready'});}},get srcdoc(){return frameHTML;},set srcdoc(value){frameHTML=value;if(value)queueMicrotask(()=>this.onload?.());}};
 const record={id:'synthetic-tab',frame,abort:new AbortController()};let lastScope;
 const host=createOpaqueHost({record,validate:validateRemote,emit:e=>events.push(e),siteAction:async d=>{lastScope=d.scope;return {allowed:false};},transport:async d=>{
  calls.push(d);if(d.url.includes('/redirect'))return {status:302,headers:{location:'http://127.0.0.1/private'},body:new ArrayBuffer(0)};
  const headers={'content-type':d.url.endsWith('.js')?'text/javascript':'text/html'};
  if(d.url==='https://example.com/')headers['set-cookie']=['secret=server; Secure; HttpOnly; Path=/','visible=yes; Secure; Path=/'];
  if(d.url.includes('/cors'))headers['access-control-allow-origin']='*';
  return {status:200,headers,body:new TextEncoder().encode('<p>synthetic</p>').buffer};
 }});
 function rpc(type,data){return new Promise((resolve,reject)=>{const id=++requestID;const timer=setTimeout(()=>{pending.delete(id);reject(Error('Broker reply timeout'));},1500);pending.set(id,v=>{clearTimeout(timer);resolve(v);});child.postMessage({type,rpc:id,...data});});}
 try{
  await host.command({type:'navigate',url:'https://example.com/'});const doc=await documentReady;
  await t.test('HttpOnly is not supplied to the content document',()=>{assert.equal(doc.cookies,'visible=yes');assert.doesNotMatch(frame.srcdoc,/allow-same-origin/);});
  await t.test('same-origin requests use website cookies only',async()=>{const r=await rpc('fetch',{url:'https://example.com/data',method:'GET'});assert.equal(r.result.status,200);assert.match(calls.at(-1).headers.Cookie,/secret=server/);assert.equal(calls.at(-1).headers.Authorization,undefined);});
  await t.test('cross-origin reads require CORS and omit third-party cookies',async()=>{const r=await rpc('fetch',{url:'https://example.net/no-cors',method:'GET'});assert.match(r.error.message,/did not allow/);assert.equal(calls.at(-1).headers.Cookie,undefined);const ok=await rpc('fetch',{url:'https://example.net/cors',method:'GET'});assert.equal(ok.result.status,200);});
  await t.test('cross-origin preflight requests are rejected before transport',async()=>{const n=calls.length;const r=await rpc('fetch',{url:'https://example.net/cors',method:'DELETE'});assert.match(r.error.message,/preflight/);assert.equal(calls.length,n);});
  await t.test('redirect targets are validated before network access',async()=>{const r=await rpc('fetch',{url:'https://example.com/redirect',method:'GET'});assert.match(r.error.message,/Private|reserved|Local/);assert.ok(calls.every(c=>!c.url.includes('127.0.0.1')));});
  await t.test('the content cannot forge its website permission origin',async()=>{await rpc('site-action',{action:'permission',scope:{origin:'https://forged.example'}});assert.equal(lastScope.origin,'https://example.com');assert.equal(lastScope.id,doc.scope);});
  await t.test('uncorsed image bytes are not returned to content',async()=>{const r=await rpc('resource',{url:'https://example.net/image.png',kind:'binary'});const image=r.result.resources.find(v=>v.id===r.result.id);assert.match(image.opaqueURL,/^blob:/);assert.equal(image.body,undefined);});
  await t.test('uncorsed script source is not returned to content',async()=>{const r=await rpc('resource',{url:'https://example.net/private.js',kind:'script'});assert.match(r.error.message,/Cross-origin source/);});
  await host.command({type:'clear'});assert.ok(events.some(e=>e.type==='cleanup-result'&&e.clean));
 }finally{host.destroy();child?.close();globalThis.document=oldDocument;globalThis.fetch=oldFetch;}
});
