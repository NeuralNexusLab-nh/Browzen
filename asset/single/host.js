import {CookieJar} from './vendor.js';
import {rewriteJS} from './compiler.js';
import {rewriteCSS} from './css-rewrite.js';
import {secureUUID} from '../session-id.js';
// Trusted-side transport. No target source executes in this realm.
const MAX_BYTES=96*1024*1024,MAX_RESOURCES=400;
const CSP="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' blob:; style-src 'unsafe-inline' blob:; img-src data: blob:; font-src data: blob:; media-src data: blob:; connect-src 'none'; frame-src 'none'; worker-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'";
let bootstrap;
export function createOpaqueHost({record,transport,siteAction,emit,validate}){
 let port,generation=0,resources=new Map(),bytes=0,count=0,requestCount=0,pageURL='',scope='',history=[],cursor=-1,stopped=false,noScript=false,level='standard';
 const parentBlobs=new Set();
 let documentAbort=new AbortController(),startupTimer;
 const jars=new Map(),stores=new Map();let partition;
 let concurrent=0;const waiting=[];
 async function transmit(data){if(waiting.length>=128)throw Error('Too many queued website requests.');if(concurrent>=8)await new Promise((resolve,reject)=>waiting.push({resolve,reject}));else concurrent++;try{if(stopped||record.retired||data.signal.aborted)throw Error('Website session closed.');return await transport(data,record);}finally{const next=waiting.shift();if(next)next.resolve();else concurrent--;}}
 function jar(){if(!jars.has(partition)){if(jars.size>=32)jars.delete(jars.keys().next().value);jars.set(partition,new CookieJar());}return jars.get(partition);}
 function target(value,base=pageURL){const u=new URL(value,base||undefined);return validate(u.href).href;}
 function update(data){emit({type:'tab-update',id:record.id,...data});}
 async function request(value,options={},depth=0){
  const epoch=generation,store=jar(),signal=documentAbort.signal;
  if(++requestCount>700)throw Error('This page exceeded its request limit.');
  if(stopped||record.retired)throw Error('Website session closed.');if(depth>8)throw Error('Too many website redirects.');
  const url=target(value);const headers={...options.headers};const method=(options.method||'GET').toUpperCase();
  if(!['GET','HEAD','POST','PUT','DELETE','PATCH','OPTIONS'].includes(method))throw Error('Unsupported HTTP method.');
  if(options.body&&(!(options.body instanceof ArrayBuffer)||options.body.byteLength>8*1024*1024))throw Error('Request body exceeds the 8 MB limit or has an unsupported format.');
  for(const k of Object.keys(headers))if(/^(cookie|host|origin|referer|sec-|proxy-)/i.test(k))delete headers[k];
  const credentials=options.credentials!=='omit'&&(options.credentials==='include'||new URL(url).origin===new URL(pageURL||url).origin);
  if(credentials){const cookie=jar().getCookieStringSync(url);if(cookie)headers.Cookie=cookie;}
  const response=await transmit({url,method,headers,body:options.body,signal});
  if(stopped||epoch!==generation)throw Error('Website document changed.');bytes+=response.body?.byteLength||0;if(bytes>MAX_BYTES)throw Error('This page exceeded the 96 MB session transfer limit.');
  const h=Object.fromEntries(Object.entries(response.headers||{}).map(([k,v])=>[k.toLowerCase(),v]));
  const cookies=h['set-cookie'];if(credentials&&cookies)for(const cookie of (Array.isArray(cookies)?cookies:[cookies]).slice(0,128))try{if(typeof cookie==='string'&&cookie.length<=4096)store.setCookieSync(cookie,url);}catch{}
  if([301,302,303,307,308].includes(response.status)&&h.location){const next=target(h.location,url);const change=response.status===303||([301,302].includes(response.status)&&method==='POST');return request(next,{...options,method:change?'GET':method,body:change?undefined:options.body},depth+1);}
  delete h['set-cookie'];delete h['set-cookie2'];return {...response,headers:h,url};
 }
 async function css(text,base,chain=new Set()){
  return rewriteCSS(text,base,resource,chain);
 }
 const inFlight=new Map();
 async function resource(raw,base,kind='binary',chain=new Set()){
  const epoch=generation;if(/^data:/i.test(raw))return raw;const url=target(raw,base),key=kind+':'+url;
  if(inFlight.has(key)){const old=inFlight.get(key);if(chain.has(key))return old.id;await old.promise;return old.id;}
  if(++count>MAX_RESOURCES)throw Error('This page exceeded the 400-resource limit.');
  const id='r'+count;let done,fail;const promise=new Promise((a,b)=>{done=a;fail=b;});promise.catch(()=>{});inFlight.set(key,{id,promise});
  try{const r=await request(url,{credentials:'same-origin'});if(r.status>=400)throw Error('Resource returned HTTP '+r.status);const type=String(r.headers['content-type']||'application/octet-stream');let body=r.body;const next=new Set([...chain,key]);let imports=[];
   const cross=new URL(r.url).origin!==new URL(pageURL).origin,allow=r.headers['access-control-allow-origin'];
   if(cross&&allow!=='*'&&allow!==new URL(pageURL).origin){if(kind!=='binary')throw Error('Cross-origin source was not permitted by its server.');const opaqueURL=URL.createObjectURL(new Blob([body],{type}));parentBlobs.add(opaqueURL);resources.set(id,{id,url:r.url,type,opaqueURL});done();return id;}
   if(kind==='style'){body=await css(new TextDecoder().decode(body),r.url,next);}
   if(kind==='script'||kind==='module'){const out=rewriteJS(new TextDecoder().decode(body),r.url,kind==='module');body=out.source;imports=out.imports;for(const dep of imports)dep.id=await resource(dep.url,r.url,'module',next);}
   if(epoch!==generation)throw Error('Website document changed.');resources.set(id,{id,url:r.url,type:kind==='style'?'text/css':kind==='script'||kind==='module'?'text/javascript':type,body,imports});done();return id;
  }catch(e){if(epoch===generation)inFlight.delete(key);fail(e);throw e;}
 }
 async function html(source,base){
  const template=document.createElement('template');template.innerHTML=source;const root=template.content;const scripts=[],jobs=[];let effective=base;
  const baseNode=root.querySelector('base[href]');if(baseNode)try{effective=target(baseNode.getAttribute('href'),base);}catch{}
  root.querySelectorAll('base,meta[http-equiv],iframe,frame,frameset,object,embed,portal').forEach(n=>n.remove());
  for(const el of root.querySelectorAll('*')){
   const tag=el.tagName.toLowerCase();
   for(const attr of [...el.attributes]){
    const k=attr.name.toLowerCase(),v=attr.value;
    if(k.startsWith('on')){el.removeAttribute(attr.name);if(!noScript)try{el.setAttribute('data-bzn-'+k,rewriteJS(v,effective).source);}catch{}continue;}
    if(k==='srcset'&&['img','source'].includes(tag)){el.removeAttribute(attr.name);const first=v.split(',')[0].trim().split(/\s+/)[0];if(first&&!first.startsWith('data:'))jobs.push(resource(first,effective).then(id=>el.setAttribute(tag==='source'?'srcset':'src','bzn-resource:'+id)).catch(()=>{}));continue;}
    if(['ping','integrity','nonce','crossorigin','srcdoc','manifest','background','codebase','archive','formaction','srcset','imagesrcset'].includes(k)){el.removeAttribute(attr.name);if(k==='formaction')el.setAttribute('data-bzn-formaction',v);continue;}
    if(k==='src'||k==='href'||k==='xlink:href'||k==='action'||k==='poster'||k==='data'){
     el.removeAttribute(attr.name);el.setAttribute('data-bzn-'+k,v);
     if((tag==='a'||tag==='area')&&k==='href'){el.setAttribute('href','#');continue;}
     if(tag==='script'||tag==='link'||tag==='form'||k==='action'||tag==='use')continue;
     if(/^data:/i.test(v)){el.setAttribute(k,v);continue;}
     if((k==='src'&&['img','audio','video','source','track','input'].includes(tag))||k==='poster'||(tag==='image'&&k.endsWith('href')))jobs.push(resource(v,effective).then(id=>el.setAttribute(k,'bzn-resource:'+id)).catch(()=>{}));
    }
   }
   if(el.hasAttribute('style'))jobs.push(css(el.getAttribute('style'),effective).then(v=>el.setAttribute('style',v)));
   if(tag==='style')jobs.push(css(el.textContent,effective).then(v=>el.textContent=v));
   if(tag==='link'){
    const rel=(el.getAttribute('rel')||'').toLowerCase(),href=el.getAttribute('data-bzn-href');if(rel==='stylesheet'&&href){el.removeAttribute('rel');jobs.push(resource(href,effective,'style').then(id=>{el.setAttribute('rel','stylesheet');el.setAttribute('href','bzn-resource:'+id);}).catch(()=>{}));}else el.remove();
   }
   if(tag==='script'){
    const type=(el.getAttribute('type')||'').toLowerCase(),module=type==='module';if(type&&!module&&!/^(text|application)\/(javascript|ecmascript)$/.test(type))continue;
    const placeholder=document.createElement('template'),index=scripts.length;placeholder.setAttribute('data-bzn-script',index);el.replaceWith(placeholder);
    if(noScript){scripts.push(null);continue;}const script={module,attrs:[...el.attributes].filter(a=>a.name!=='src').map(a=>[a.name,a.value]),source:'',url:effective,imports:[]};scripts.push(script);
    const src=el.getAttribute('data-bzn-src');jobs.push((async()=>{try{if(src){const id=await resource(src,effective,module?'module':'script');script.resource=id;script.url=resources.get(id).url;}else{const out=rewriteJS(el.textContent,effective,module);script.source=out.source;script.imports=out.imports;for(const dep of out.imports)dep.id=await resource(dep.url,effective,'module');}}catch(e){script.source='console.warn('+JSON.stringify('Browzen blocked a script: '+e.message)+')';}})());
   }
  }
  await Promise.all(jobs);return {html:template.innerHTML,scripts,base:effective};
 }
 function cookieText(){try{return jar().getCookieStringSync(pageURL,{http:false});}catch{return '';}}
 async function connect(payload,token){
  const code=await(bootstrap??=fetch('/asset/single/content.js').then(r=>{if(!r.ok)throw Error('Website sandbox bundle unavailable.');return r.text();}));if(token!==generation||stopped)return;
  const pair=new MessageChannel();port?.close();port=pair.port1;let unexpected=0;
  port.onmessage=async e=>{const d=e.data;if(!d||token!==generation||stopped)return;const reply=(result,error)=>{if(d.rpc)port.postMessage({rpc:d.rpc,result,error});};
   try{
    if(d.type==='ready'){clearTimeout(startupTimer);port.postMessage({type:'document',...payload});return;}
    if(d.type==='loaded'){update({url:pageURL,title:d.title||new URL(pageURL).hostname,loading:false});return;}
    if(d.type==='title'){update({title:String(d.title).slice(0,240)});return;}
    if(d.type==='navigate'){await navigate(d.url,{form:d.form});return;}
    if(d.type==='history'){const url=target(d.url);if(new URL(url).origin!==new URL(pageURL).origin)throw Error('History cannot change origin.');pageURL=url;update({url});return;}
    if(d.type==='cookie'){try{if(typeof d.value==='string'&&d.value.length<=4096)jar().setCookieSync(d.value,pageURL,{http:false});}catch{}port.postMessage({type:'cookies',value:cookieText()});return;}
    if(d.type==='store'){if(!['local','session'].includes(d.kind)||!d.values||typeof d.values!=='object')return;const text=JSON.stringify(d.values);if(text.length>1024*1024)throw Error('Website storage exceeds 1 MB.');if(stores.size>=64)stores.delete(stores.keys().next().value);stores.set(partition+':'+new URL(pageURL).origin+':'+d.kind,d.values);return;}
    if(d.type==='site-action'){reply(await siteAction({...d,scope:{id:scope,origin:new URL(pageURL).origin,topOrigin:new URL(pageURL).origin,isMain:true}}));return;}
    if(d.type==='compile'){if(typeof d.source!=='string'||d.source.length>4*1024*1024)throw Error('Script source exceeds the 4 MB limit.');reply(rewriteJS(d.source,target(d.base||pageURL),!!d.module));return;}
    if(d.type==='resource'){const id=await resource(d.url,d.base||pageURL,d.kind);reply({id,resources:[...resources.values()]});return;}
    if(d.type==='fetch'){
     const origin=new URL(pageURL).origin,url=target(d.url),cross=new URL(url).origin!==origin;
     const method=String(d.method||'GET').toUpperCase(),headers=new Headers(d.headers||{});
     // A proxied request must not bypass the remote site's CORS preflight.
     if(cross&&( !['GET','HEAD','POST'].includes(method)||[...headers.keys()].some(k=>!['accept','accept-language','content-language','content-type'].includes(k))||(headers.has('content-type')&&!/^(application\/x-www-form-urlencoded|multipart\/form-data|text\/plain)(;|$)/i.test(headers.get('content-type')))))throw new TypeError('Cross-origin preflight requests are not supported in this static sandbox.');
     const r=await request(url,{method,headers:Object.fromEntries(headers),body:d.body,credentials:d.credentials||'same-origin'});
     if(new URL(r.url).origin!==origin){const allowed=r.headers['access-control-allow-origin'];if(allowed!==origin&&!(allowed==='*'&&d.credentials!=='include'))throw new TypeError('The remote server did not allow this cross-origin request.');if(d.credentials==='include'&&r.headers['access-control-allow-credentials']!=='true')throw new TypeError('The remote server did not allow credentials.');}
     reply(r);return;
    }
    throw Error('Unsupported website message.');
   }catch(error){reply(undefined,{message:error.message,name:error.name});}
  };port.start();
  record.frame.onload=()=>{if(token!==generation)return;if(unexpected++){port.close();record.frame.srcdoc='';update({loading:false,title:'Page navigation blocked'});return;}record.frame.contentWindow.postMessage({type:'browzen-port'},'*',[pair.port2]);};
  record.frame.srcdoc='<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="'+CSP+'"><meta name="referrer" content="no-referrer"></head><body><script>'+code.replace(/<\/script/gi,'<\\/script')+'</script></body></html>';
  clearTimeout(startupTimer);startupTimer=setTimeout(()=>{if(token===generation&&!stopped)emit({type:'engine-error',id:record.id,error:'The isolated website frame did not initialize. Reload this tab to retry.'});},15000);
 }
 async function navigate(raw,options={}){
  documentAbort.abort();documentAbort=new AbortController();clearTimeout(startupTimer);
  const token=++generation;pageURL=target(raw);partition=new URL(pageURL).hostname;bytes=0;count=0;requestCount=0;resources=new Map();inFlight.clear();for(const u of parentBlobs)URL.revokeObjectURL(u);parentBlobs.clear();scope=secureUUID();noScript=!!(options.noScript??requestedNoScript)||level==='safest'||(level==='safer'&&pageURL.startsWith('http:'));
  emit({type:'site-document',id:record.id,isMain:true,scopeId:scope,origin:new URL(pageURL).origin});update({url:pageURL,loading:true});
  try{
   let form=options.form,body,method='GET',headers={};if(form){method=(form.method||'get').toUpperCase();const params=new URLSearchParams();for(const [k,v]of form.entries||[])params.append(k,typeof v==='string'?v:v.name);if(method==='GET'){const u=new URL(pageURL);u.search=params.toString();pageURL=u.href;}else if(form.enctype==='multipart/form-data'){const data=new FormData();for(const [k,v]of form.entries||[])data.append(k,v);const encoded=new Response(data);body=await encoded.arrayBuffer();headers['Content-Type']=encoded.headers.get('content-type');}else if(form.enctype==='text/plain'){body=new TextEncoder().encode([...params].map(([k,v])=>k+'='+v).join('\r\n')+'\r\n').buffer;headers['Content-Type']='text/plain';}else{body=new TextEncoder().encode(params.toString()).buffer;headers['Content-Type']='application/x-www-form-urlencoded';}}
   const response=await request(pageURL,{method,headers,body,credentials:'include'});if(token!==generation)return;pageURL=response.url;const contentType=String(response.headers['content-type']||'');let documentSource=new TextDecoder().decode(response.body);
   if(!/text\/html|application\/xhtml\+xml/.test(contentType))documentSource='<pre>'+documentSource.replaceAll('&','&amp;').replaceAll('<','&lt;')+'</pre>';
   const payload=await html(documentSource,pageURL);if(token!==generation)return;
   if(!options.traverse){history=history.slice(0,cursor+1);history.push(pageURL);cursor=history.length-1;}
   await connect({...payload,url:pageURL,id:record.id,scope,noScript,zoom:options.zoom||100,cookies:cookieText(),local:stores.get(partition+':'+new URL(pageURL).origin+':local')||{},session:stores.get(partition+':'+new URL(pageURL).origin+':session')||{},resources:[...resources.values()],opener:options.opener},token);
  }catch(e){if(token===generation){update({loading:false});emit({type:'engine-error',error:e.message,id:record.id});}}
 }
 function destroy(){stopped=true;generation++;documentAbort.abort();clearTimeout(startupTimer);port?.close();resources.clear();jars.clear();stores.clear();for(const item of waiting.splice(0))item.reject(Error('Website session closed.'));for(const u of parentBlobs)URL.revokeObjectURL(u);parentBlobs.clear();}
 let requestedNoScript=false;
 return {async command(d){if(stopped)return;if(d.type==='clear'){destroy();record.frame.srcdoc='';emit({type:'cleanup-result',clean:true});return;}if(d.type==='navigate'){requestedNoScript=!!d.noScript;level=d.level||level;return navigate(d.url,d);}if(d.type==='reload')return navigate(pageURL,{noScript:requestedNoScript});if(d.type==='back'||d.type==='forward'){const next=cursor+(d.type==='back'?-1:1);if(next>=0&&next<history.length){cursor=next;return navigate(history[cursor],{traverse:true,noScript:requestedNoScript});}return;}if(d.type==='scripts'||d.type==='security'){if(d.type==='security')level=d.level;else requestedNoScript=!!d.noScript;return navigate(pageURL,{noScript:requestedNoScript});}port?.postMessage(d);},destroy};
}
