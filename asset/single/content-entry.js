import {IDBFactory,IDBKeyRange} from './idb.js';
import {neutralizeCSS} from './css-rewrite.js';
import {hasRel} from './html-policy.js';
import {windowFacade} from './window-value.js';
// Runs only in an opaque-origin frame. The parent never evaluates website code.
(() => {
 const native={append:Node.prototype.appendChild,insert:Node.prototype.insertBefore,replace:Node.prototype.replaceChild,set:Element.prototype.setAttribute,get:Element.prototype.getAttribute,remove:Element.prototype.removeAttribute,inner:Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML'),add:EventTarget.prototype.addEventListener,dispatch:EventTarget.prototype.dispatchEvent,Blob:Blob,create:URL.createObjectURL.bind(URL),revoke:URL.revokeObjectURL.bind(URL),Function:Function};
 window.__browzenPrivacy?.install(window);
 let port,current,sequence=0,cookie='',ready=false,documentInstalled=false,readyState='loading',scriptErrors=0;
 const pending=new Map(),resources=new Map(),urls=new Map(),internal=new WeakSet(),processed=new WeakSet(),popups=new Map();
 const downloadBlobs=new Map();define(URL,'createObjectURL',blob=>{if(!(blob instanceof native.Blob))return native.create(blob);if(blob.size>32*1024*1024||downloadBlobs.size>=128)throw new DOMException('Blob limit reached.','QuotaExceededError');const url=native.create(blob);downloadBlobs.set(url,blob);return url;});define(URL,'revokeObjectURL',url=>{downloadBlobs.delete(String(url));native.revoke(url);});
 const scope=()=>({id:current.scope,origin:new URL(current.url).origin,topOrigin:new URL(current.url).origin,isMain:true});
 function send(type,data={}){port.postMessage({type,...data});}
 function rpc(type,data={}){return new Promise((resolve,reject)=>{const id=++sequence;const timer=setTimeout(()=>{pending.delete(id);reject(new DOMException('Website operation timed out.','TimeoutError'));},65000);pending.set(id,{resolve,reject,timer});port.postMessage({type,rpc:id,...data});});}
 function fail(message='Unavailable in this isolated web version.'){throw new DOMException(message,'NotSupportedError');}
 function define(o,k,v){try{Object.defineProperty(o,k,{configurable:false,writable:false,value:v});}catch{}}
 function read(o,k,get){try{Object.defineProperty(o,k,{configurable:false,get});}catch{}}
 // No uninstrumented nested browsing realm: it could recover native WebRTC APIs.
 const blockedTags=new Set(['iframe','frame','frameset','object','embed','portal']);
 const createElement=Document.prototype.createElement,createElementNS=Document.prototype.createElementNS;
 define(Document.prototype,'createElement',function(name,...args){return createElement.call(this,blockedTags.has(String(name).toLowerCase())?'div':name,...args);});
 define(Document.prototype,'createElementNS',function(ns,name,...args){return createElementNS.call(this,ns,blockedTags.has(String(name).toLowerCase().split(':').pop())?'div':name,...args);});
 function remote(value,base=current.base){const u=new URL(String(value),base);if(!/^https?:$/.test(u.protocol))throw new TypeError('Only HTTP and HTTPS website addresses are supported.');return u.href;}
 function addResources(list){for(const r of list||[])if(!resources.has(r.id))resources.set(r.id,r);}
 function materialize(id,stack=new Set()){
  if(id.startsWith('data:'))return id;if(urls.has(id))return urls.get(id);const r=resources.get(id);if(!r)return 'data:,';if(stack.has(id))return 'data:,';
  if(r.opaqueURL)return r.opaqueURL;let body=r.body;if(typeof body==='string'&&r.type==='text/css'){const next=new Set([...stack,id]);body=body.replace(/bzn-resource:(r\d+)/g,(_,dep)=>materialize(dep,next));}
  const url=native.create(new native.Blob([body],{type:r.type}));urls.set(id,url);return url;
 }
 async function materializeAsync(id,stack=new Set()){
  if(urls.has(id))return urls.get(id);const r=resources.get(id);if(!r||r.type!=='text/css')return materialize(id);if(stack.has(id))return 'data:,';
  const next=new Set([...stack,id]),dependencies=r.dependencies||[...new Set([...String(r.body).matchAll(/bzn-resource:(r\d+)/g)].map(m=>m[1]))],mapped=new Map();
  for(const dep of dependencies)mapped.set(dep,await materializeAsync(dep,next));
  const url=native.create(new native.Blob([String(r.body).replace(/bzn-resource:(r\d+)/g,(_,dep)=>mapped.get(dep)||'data:,')],{type:'text/css'}));
  urls.set(id,url);return url;
 }
 const aliasNames=new Set();
 function aliases(){const imports={};for(const r of resources.values())if(r.module&&!aliasNames.has(r.url)){imports['bzn:'+r.url]=materialize(r.id);aliasNames.add(r.url);}if(!Object.keys(imports).length)return;const node=document.createElement('script');internal.add(node);node.type='importmap';node.textContent=JSON.stringify({imports});native.append.call(document.head,node);}
 const resourcePending=new Map();
 async function resourceEntry(url,kind='binary',integrity=''){const key=kind+':'+remote(url)+':'+integrity;if(!resourcePending.has(key)){const promise=rpc('resource',{url:remote(url),base:current.base,kind,integrity}).then(result=>{addResources(result.resources);return result.id;});resourcePending.set(key,promise);promise.catch(()=>resourcePending.delete(key));}return resourcePending.get(key);}
 async function resource(url,kind='binary',integrity=''){return materializeAsync(await resourceEntry(url,kind,integrity));}
 async function convertCSS(source){const result=await rpc('css',{source,base:current.base});addResources(result.resources);let text=result.css;const ids=[...new Set([...text.matchAll(/bzn-resource:(r\d+)/g)].map(m=>m[1]))];for(const id of ids){const url=await materializeAsync(id);text=text.replaceAll('bzn-resource:'+id+'"',url+'"').replaceAll('bzn-resource:'+id+"'",url+"'");}return text;}
 const locationFacade={};
 for(const key of ['href','origin','protocol','host','hostname','port','pathname','search','hash'])Object.defineProperty(locationFacade,key,{enumerable:true,get:()=>new URL(current.url)[key],set:value=>{const u=new URL(current.url);if(key==='origin')return;u[key]=value;navigate(u.href);}});
 Object.assign(locationFacade,{assign:navigate,replace:navigate,reload:()=>navigate(current.url),toString:()=>current.url});
 function navigate(value){const url=remote(value,current.url);if(url.split('#')[0]===current.url.split('#')[0]){current.url=url;send('history',{url});window.dispatchEvent(new HashChangeEvent('hashchange'));const id=decodeURIComponent(new URL(url).hash.slice(1));document.getElementById(id)?.scrollIntoView();return;}send('navigate',{url});}
 const proxy=windowFacade(window,key=>{if(['window','self','globalThis','parent','top','frames'].includes(key))return {handled:true,value:proxy};if(key==='location')return {handled:true,value:locationFacade};if(key==='history')return {handled:true,value:historyFacade};if(key==='opener')return {handled:true,value:current.opener?openerFacade:null};if(key==='origin')return {handled:true,value:new URL(current.url).origin};return {handled:false};},(key,value)=>{if(key==='location'){navigate(value);return true;}return false;});
 const bridge={window:proxy,self:proxy,globalThis:proxy,parent:proxy,top:proxy,frames:proxy,get fetch(){return proxy.fetch;},set fetch(value){proxy.fetch=value;},get history(){return historyFacade;},get opener(){return current.opener?openerFacade:null;},get location(){return locationFacade;},set location(v){navigate(v);},async importModule(value,base){const result=await rpc('resource',{url:remote(value,base),base,kind:'module'});addResources(result.resources);aliases();return import(materialize(result.id));}};
 define(window,'__bzn',bridge);
 function action(action,data={}){return rpc('site-action',{action,scope:scope(),...data});}
 function popup(url='',name='_blank',features=''){
  if(['_self','_top','_parent'].includes(name)){if(url&&url!=='about:blank')navigate(url);return proxy;}
  const token='p'+(++sequence),noOpener=/\bnoopener\b/i.test(features);let closed=false,href=url&&url!=='about:blank'?remote(url):'about:blank';const queue=[];let opened=false;
  const invoke=(actionName,data={})=>opened?action(actionName,{token,...data}):queue.push([actionName,data]);
  const loc={get href(){return href;},set href(v){href=remote(v);invoke('popup-navigate',{url:href});},assign(v){this.href=v;},replace(v){this.href=v;},toString(){return href;}};
  const handle={get closed(){return closed;},get location(){return loc;},set location(v){loc.href=v;},close(){closed=true;invoke('popup-close');},focus(){invoke('popup-focus');},postMessage(message,targetOrigin='*'){invoke('popup-message',{message,targetOrigin});}};
  popups.set(token,{handle,close:()=>closed=true});action('popup-open',{token,url:href,target:name,gesture:navigator.userActivation?.isActive,noOpener}).then(()=>{opened=true;for(const [a,d]of queue)action(a,{token,...d}).catch(console.warn);}).catch(e=>{closed=true;console.warn(e.message);});return noOpener?null:handle;
 }
 const openerFacade={postMessage:(message,targetOrigin='*')=>action('opener-message',{message,targetOrigin}),close:()=>{},get closed(){return false;}};
 const NativeMessageEvent=MessageEvent;define(window,'MessageEvent',new Proxy(NativeMessageEvent,{construct(target,args,newTarget){const init=args[1],source=init?.source,managed=source===proxy||source===openerFacade||[...popups.values()].some(p=>p.handle===source);const event=Reflect.construct(target,managed?[args[0],{...init,source:null}]:args,newTarget);if(managed)Object.defineProperty(event,'source',{value:source});return event;}}));
 define(window,'open',popup);define(window,'close',()=>action('opener-close-self').catch(()=>{}));
 const nativeHistory=history,oldPush=history.pushState.bind(history),oldReplace=history.replaceState.bind(history);
 const historyFacade={get state(){return nativeHistory.state;},get length(){return nativeHistory.length;},get scrollRestoration(){return nativeHistory.scrollRestoration;},set scrollRestoration(value){nativeHistory.scrollRestoration=value;},back:()=>send('traverse',{delta:-1}),forward:()=>send('traverse',{delta:1}),go:delta=>Number(delta)?send('traverse',{delta:Math.trunc(Number(delta))}):navigate(current.url)};
 for(const [k,fn]of [['pushState',oldPush],['replaceState',oldReplace]]){const mediated=function(state,title,url){let u=current.url;if(url!=null){u=remote(url,current.url);if(new URL(u).origin!==new URL(current.url).origin)throw new DOMException('History must keep the same origin.','SecurityError');}fn(state,title);current.url=u;send('history',{url:u,replace:k==='replaceState'});};define(nativeHistory,k,mediated);historyFacade[k]=mediated;}
 read(document,'URL',()=>current?.url||'about:blank');read(document,'documentURI',()=>current?.url||'about:blank');read(document,'baseURI',()=>current?.base||'about:blank');read(document,'referrer',()=>'');
 read(Node.prototype,'baseURI',()=>current?.base||'about:blank');
 read(document,'readyState',()=>readyState);
 // The virtual cookie setter never exposes HttpOnly cookies or account cookies.
 Object.defineProperty(Document.prototype,'cookie',{configurable:false,get(){return cookie;},set(value){const pair=String(value).split(';')[0],name=pair.split('=')[0].trim();cookie=cookie.split('; ').filter(p=>p.split('=')[0]!==name).concat(pair).filter(Boolean).join('; ');send('cookie',{value:String(value)});}});
 class MemoryCookieStore extends EventTarget{onchange=null;async getAll(options={}){const name=typeof options==='string'?options:options.name;const {cookies}=await rpc('cookie-store',{op:'get'});return name===undefined?cookies:cookies.filter(c=>c.name===String(name));}async get(options){return (await this.getAll(options))[0]||null;}async set(name,value){const o=typeof name==='object'?name:{name,value};if(!o||!o.name||/[;=\s\x00-\x1f]/.test(String(o.name))||/[;\r\n]/.test(String(o.value??'')))throw new TypeError('Invalid cookie name or value.');let text=String(o.name)+'='+String(o.value??'')+'; Path='+(o.path||'/');if(o.domain){if(/[;\r\n]/.test(o.domain))throw new TypeError('Invalid cookie domain.');text+='; Domain='+o.domain;}if(o.secure!==false)text+='; Secure';if(o.sameSite){if(!['strict','lax','none'].includes(o.sameSite))throw new TypeError('Invalid SameSite.');text+='; SameSite='+o.sameSite;}if(o.expires!=null)text+='; Expires='+new Date(o.expires).toUTCString();await rpc('cookie-store',{op:'set',value:text});const event=new Event('change');Object.defineProperties(event,{changed:{value:await this.getAll(o.name)},deleted:{value:[]}});this.dispatchEvent(event);this.onchange?.(event);}async delete(options){const o=typeof options==='string'?{name:options}:options;await this.set({...o,value:'',expires:0});}}
 define(window,'cookieStore',new MemoryCookieStore());
 function storage(kind,initial){let values={...initial};const api={get length(){return Object.keys(values).length;},key:i=>Object.keys(values)[i]??null,getItem:k=>Object.hasOwn(values,String(k))?String(values[k]):null,setItem(k,v){const copy={...values,[String(k)]:String(v)};if(JSON.stringify(copy).length>1024*1024)throw new DOMException('Website storage exceeds 1 MB.','QuotaExceededError');values=copy;send('store',{kind,values});},removeItem(k){delete values[String(k)];send('store',{kind,values});},clear(){values={};send('store',{kind,values});}};return new Proxy(api,{get:(t,k)=>k in t?t[k]:t.getItem(k),set:(t,k,v)=>{t.setItem(k,v);return true;},deleteProperty:(t,k)=>{t.removeItem(k);return true;},ownKeys:()=>Object.keys(values),getOwnPropertyDescriptor:(t,k)=>Object.hasOwn(values,k)?{enumerable:true,configurable:true,value:values[k]}:Object.getOwnPropertyDescriptor(t,k)});}
 async function bodyBytes(body){if(body==null)return undefined;if(body instanceof FormData){const r=new Response(body);return {body:await r.arrayBuffer(),type:r.headers.get('content-type')};}if(body instanceof URLSearchParams)return {body:new TextEncoder().encode(body.toString()).buffer,type:'application/x-www-form-urlencoded;charset=UTF-8'};if(body instanceof Blob)return {body:await body.arrayBuffer(),type:body.type};if(body instanceof ArrayBuffer)return {body};if(ArrayBuffer.isView(body))return {body:body.buffer.slice(body.byteOffset,body.byteOffset+body.byteLength)};return {body:new TextEncoder().encode(String(body)).buffer,type:'text/plain;charset=UTF-8'};}
 const NativeRequest=Request;define(window,'Request',new Proxy(NativeRequest,{construct(t,args,newTarget){if(!(args[0] instanceof NativeRequest))args[0]=remote(args[0]);return Reflect.construct(t,args,newTarget);}}));
 async function websiteFetch(input,init={}){
  const request=input instanceof Request?input:null,url=remote(request?.url||input),headers=new Headers(init.headers||request?.headers||{}),method=String(init.method||request?.method||'GET').toUpperCase();
  const data=await bodyBytes(init.body??(request&&!['GET','HEAD'].includes(method)?await request.arrayBuffer():undefined));if(data?.type&&!headers.has('content-type'))headers.set('content-type',data.type);
  if(init.signal?.aborted)throw new DOMException('Request aborted.','AbortError');
  const r=await rpc('fetch',{url,method,headers:[...headers],body:data?.body,credentials:init.credentials||request?.credentials||'same-origin',mode:init.mode||request?.mode||'cors'});
  if(init.signal?.aborted)throw new DOMException('Request aborted.','AbortError');
  if(r.opaque){const opaque=new Response(null);Object.defineProperties(opaque,{type:{value:'opaque'},status:{value:0},statusText:{value:''},ok:{value:false},url:{value:''}});return opaque;}
  const response=new Response([101,204,205,304].includes(r.status)?null:r.body,{status:r.status,statusText:r.statusText,headers:r.headers});Object.defineProperty(response,'url',{value:r.url});return response;
 }
 define(window,'fetch',websiteFetch);
 class XHR extends EventTarget{
  readyState=0;status=0;responseType='';responseText='';response=null;responseURL='';withCredentials=false;timeout=0;headers=new Headers();upload=new EventTarget();
  fire(type){this.dispatchEvent(new Event(type));this['on'+type]?.call(this,new Event(type));}
  open(method,url,async=true){if(async===false)fail('Synchronous XHR is unavailable.');this.method=method;this.url=remote(url);this.readyState=1;this.fire('readystatechange');}
  setRequestHeader(k,v){this.headers.append(k,v);}getAllResponseHeaders(){return this.result?[...this.result.headers].map(([k,v])=>k+': '+v).join('\r\n'):'';}getResponseHeader(k){return this.result?.headers.get(k)||null;}overrideMimeType(){}abort(){this.aborted=true;this.fire('abort');}
  async send(body){this.aborted=false;this.fire('loadstart');try{const r=await websiteFetch(this.url,{method:this.method,headers:this.headers,body,credentials:this.withCredentials?'include':'same-origin'});if(this.aborted)return;this.result=r;this.status=r.status;this.statusText=r.statusText;this.responseURL=r.url;this.readyState=2;this.fire('readystatechange');const bytes=await r.arrayBuffer();this.responseText=new TextDecoder().decode(bytes);this.response=this.responseType==='arraybuffer'?bytes:this.responseType==='blob'?new Blob([bytes],{type:r.headers.get('content-type')}):this.responseType==='json'?JSON.parse(this.responseText):this.responseText;this.readyState=4;this.fire('readystatechange');this.fire('load');}catch{if(!this.aborted){this.readyState=4;this.fire('readystatechange');this.fire('error');}}this.fire('loadend');}
 }
 Object.assign(XHR,{UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4});define(window,'XMLHttpRequest',XHR);
 for(const key of ['WebSocket','WebTransport','EventSource','Worker','SharedWorker','RTCPeerConnection','webkitRTCPeerConnection'])define(window,key,function(){fail('This transport is blocked in static Browzen.');});
 define(navigator,'sendBeacon',()=>false);
 define(navigator,'storage',{estimate:async()=>({quota:1024*1024,usage:new native.Blob([JSON.stringify({...localStorage})+JSON.stringify({...sessionStorage})]).size}),persisted:async()=>false,persist:async()=>false,getDirectory:async()=>fail('Persistent filesystem access is unavailable.')});
 read(navigator,'serviceWorker',()=>({controller:null,getRegistrations:async()=>[],getRegistration:async()=>undefined,register:async()=>fail('Website Service Workers are blocked.'),addEventListener(){},removeEventListener(){}}));
 const memoryCaches=new Map();
 const cacheName=k=>String(k),cacheKey=r=>typeof r==='string'?remote(r):r.url;
 define(window,'caches',{async open(name){name=cacheName(name);if(!memoryCaches.has(name))memoryCaches.set(name,new Map());const entries=memoryCaches.get(name);return {async match(r){return entries.get(cacheKey(r))?.clone();},async put(r,response){if(entries.size>=128)throw new DOMException('Memory cache limit reached.','QuotaExceededError');entries.set(cacheKey(r),response.clone());},async delete(r){return entries.delete(cacheKey(r));},async keys(){return [...entries.keys()].map(u=>new Request(u));},async add(r){const response=await websiteFetch(r);if(!response.ok)throw new TypeError('Cache fetch failed.');entries.set(cacheKey(r),response);},async addAll(items){for(const r of items)await this.add(r);}};},async keys(){return [...memoryCaches.keys()];},async has(n){return memoryCaches.has(cacheName(n));},async delete(n){return memoryCaches.delete(cacheName(n));},async match(r){for(const entries of memoryCaches.values()){const response=entries.get(cacheKey(r));if(response)return response.clone();}}});
 define(navigator,'permissions',{query:async()=>({state:'denied',onchange:null,addEventListener(){},removeEventListener(){}})});
 function unavailablePermission(names){return action('permission',{names}).then(()=>fail('This device API cannot be enabled inside an opaque-origin page.'));}
 define(navigator,'mediaDevices',{enumerateDevices:async()=>[],getUserMedia:c=>unavailablePermission([...(c?.video?['camera']:[]),...(c?.audio?['microphone']:[])])});
 define(navigator,'geolocation',{getCurrentPosition:(ok,error)=>unavailablePermission(['geolocation']).catch(()=>error?.({code:1,message:'Location is blocked in this web version.'})),watchPosition:(ok,error)=>{error?.({code:1,message:'Location is blocked.'});return 0;},clearWatch(){}});
 define(navigator,'clipboard',{async readText(){return (await action('clipboard',{op:'readText'})).text||'';},async writeText(text){await action('clipboard',{op:'writeText',text:String(text)});},read:()=>fail(),write:()=>fail()});
 class Notice{static permission='default';static async requestPermission(){try{await action('permission',{names:['notifications']});Notice.permission='granted';return 'granted';}catch{return 'denied';}}constructor(title,options={}){this.token='n'+(++sequence);action('notification-show',{token:this.token,title,body:options.body}).catch(console.warn);}close(){action('notification-close',{token:this.token});}}
 define(window,'Notification',Notice);
 const urlAttrs=new Set(['src','href','xlink:href','poster','action','formaction','srcset','imagesrcset','data','srcdoc','ping']);
 function attr(el,key,value){native.set.call(el,key,value);}
 async function compile(source,module=false){return (await rpc('compile',{source,base:current.base,module})).source;}
 function scriptFailure(error,url='inline script'){scriptErrors++;console.warn('Browzen could not run '+url+': '+error.message);send('script-error',{count:scriptErrors});}
 native.add.call(window,'error',e=>{if(e.target===window){scriptErrors++;send('script-error',{count:scriptErrors});}});
 async function prepare(data){
  try{if(data.error)throw Error(data.error);if(data.external){const id=await resourceEntry(data.url,data.module?'module':data.cors?'script-cors':'script',data.integrity);return {...data,id};}
   if(data.raw){const out=await rpc('compile',{source:data.source,base:data.url,module:data.module});data={...data,source:out.source,imports:out.imports};}for(const dep of data.imports||[])await resourceEntry(dep.url,'module');return data;
  }catch(error){return {...data,error:error.message};}
 }
 async function execute(data,marker){
  if(!marker?.parentNode)return;if(data.error){scriptFailure(Error(data.error),data.url);marker.remove();return;}
  const node=document.createElement('script');internal.add(node);for(const [k,v]of data.attrs||[])if(!k.startsWith('data-bzn-')&&!['src','integrity','nonce','crossorigin','async','defer','nomodule'].includes(k))attr(node,k,v);
  if(data.external)attr(node,'data-bzn-src',data.url);if(data.module)node.type='module';aliases();
  if(data.id||data.module){const url=data.id?await materializeAsync(data.id):native.create(new native.Blob([data.source],{type:'text/javascript'}));attr(node,'src',url);await new Promise(resolve=>{const timer=setTimeout(()=>{scriptFailure(Error('Script execution timed out.'),data.url);resolve();},30000);node.onload=()=>{clearTimeout(timer);resolve();};node.onerror=()=>{clearTimeout(timer);scriptFailure(Error('Script execution failed.'),data.url);resolve();};native.insert.call(marker.parentNode,node,marker);});}
  else{node.textContent=data.source;native.insert.call(marker.parentNode,node,marker);}marker.remove();
 }
 async function prepareScript(el){if(processed.has(el)||internal.has(el))return;processed.add(el);if(current.noScript)return;const type=(native.get.call(el,'type')||'').toLowerCase();if(type&&type!=='module'&&!/^(text|application)\/(javascript|ecmascript)$/.test(type))return;
  const src=native.get.call(el,'data-bzn-src'),module=type==='module';if(!module&&el.noModule)return;
  try{const data=await prepare({url:src?remote(src):current.base,external:!!src,module,cors:el.hasAttribute('crossorigin'),integrity:native.get.call(el,'integrity')||'',source:src?'':await compile(el.textContent,module),attrs:[...el.attributes].map(a=>[a.name,a.value])});
   const marker=document.createElement('template');native.insert.call(el.parentNode||document.head,marker,el.parentNode?el:null);await execute(data,marker);el.dispatchEvent(new Event(data.error?'error':'load'));
  }catch(error){scriptFailure(error,src||'inline script');el.dispatchEvent(new Event('error'));}
 }
 function scheduleURL(el,key,value){attr(el,'data-bzn-'+key,value);if(key==='href'&&['A','AREA'].includes(el.tagName)){attr(el,'href','#');return;}if(el.tagName==='SCRIPT'){if(el.isConnected)prepareScript(el);return;}if(['action','formaction','srcdoc','srcset','imagesrcset','ping'].includes(key))return;
  const kind=el.tagName==='LINK'&&hasRel(native.get.call(el,'rel'),'stylesheet')?'style':'binary';if(el.tagName==='LINK'&&kind!=='style')return;
  if(/^data:/i.test(String(value))){attr(el,key,value);return;}resource(value,kind,native.get.call(el,'data-bzn-integrity')||native.get.call(el,'integrity')||'').then(url=>{attr(el,key,url);}).catch(()=>el.dispatchEvent(new Event('error')));
 }
 Element.prototype.setAttribute=function(key,value){const k=String(key).toLowerCase();if(internal.has(this))return native.set.call(this,key,value);if(urlAttrs.has(k)){scheduleURL(this,k,String(value));return;}if(k.startsWith('on')){attr(this,'data-bzn-'+k,String(value));native.set.call(this,key,'');if(!current?.noScript)compile(String(value)).then(code=>this[k]=native.Function('event',code)).catch(()=>{});return;}return native.set.call(this,key,value);};
 Element.prototype.getAttribute=function(key){const k=String(key).toLowerCase();return urlAttrs.has(k)||k.startsWith('on')?native.get.call(this,'data-bzn-'+k)??native.get.call(this,key):native.get.call(this,key);};
 for(const [cls,keys]of [[HTMLScriptElement,['src']],[HTMLImageElement,['src','srcset']],[HTMLLinkElement,['href']],[HTMLAnchorElement,['href']],[HTMLFormElement,['action']],[HTMLInputElement,['src','formAction']],[HTMLButtonElement,['formAction']],[HTMLMediaElement,['src']],[HTMLSourceElement,['src','srcset']],[HTMLIFrameElement,['src','srcdoc']]])for(const key of keys){const d=Object.getOwnPropertyDescriptor(cls.prototype,key);if(d?.configurable)Object.defineProperty(cls.prototype,key,{...d,get(){const value=native.get.call(this,'data-bzn-'+key.toLowerCase());if(value!=null)try{return remote(value);}catch{return value;}return d.get?.call(this);},set(value){scheduleURL(this,key.toLowerCase(),String(value));}});}
 function sanitize(node){if(!node?.querySelectorAll||internal.has(node))return;const nodes=[...(node.nodeType===1?[node]:[]),...node.querySelectorAll('*')];for(const el of nodes){if(internal.has(el))continue;if(['IFRAME','FRAME','OBJECT','EMBED','BASE','META'].includes(el.tagName)){el.remove();continue;}for(const a of [...el.attributes])if(urlAttrs.has(a.name.toLowerCase())){const k=a.name.toLowerCase(),original=native.get.call(el,'data-bzn-'+k)??a.value;native.remove.call(el,a.name);scheduleURL(el,k,original);}else if(a.name.startsWith('on')){native.remove.call(el,a.name);if(!current.noScript)compile(a.value).then(code=>el[a.name]=native.Function('event',code));}if(el.tagName==='SCRIPT'){if(!processed.has(el)){attr(el,'data-bzn-type',el.type);attr(el,'type','application/x-browzen-pending');queueMicrotask(()=>{attr(el,'type',native.get.call(el,'data-bzn-type')||'');prepareScript(el);});}}}}
 for(const [key,fn]of [['appendChild',native.append],['insertBefore',native.insert],['replaceChild',native.replace]])Node.prototype[key]=function(node,...args){if(node?.nodeType===1&&blockedTags.has(node.localName.toLowerCase()))return node;sanitize(node);return fn.call(this,node,...args);};
 Object.defineProperty(Element.prototype,'innerHTML',{...native.inner,set(value){const t=document.createElement('template');native.inner.set.call(t,String(value));sanitize(t.content);this.replaceChildren(t.content);},get:native.inner.get});
 Element.prototype.insertAdjacentHTML=function(position,html){const t=document.createElement('template');native.inner.set.call(t,String(html));sanitize(t.content);const fragment=t.content;switch(String(position).toLowerCase()){case 'beforebegin':if(!this.parentNode)throw new DOMException('No parent node.','NoModificationAllowedError');native.insert.call(this.parentNode,fragment,this);break;case 'afterend':if(!this.parentNode)throw new DOMException('No parent node.','NoModificationAllowedError');native.insert.call(this.parentNode,fragment,this.nextSibling);break;case 'afterbegin':native.insert.call(this,fragment,this.firstChild);break;case 'beforeend':native.append.call(this,fragment);break;default:throw new DOMException('Invalid insertion position.','SyntaxError');}};
 const adjacentElement=Element.prototype.insertAdjacentElement;define(Element.prototype,'insertAdjacentElement',function(position,node){if(blockedTags.has(node?.localName?.toLowerCase()))return null;sanitize(node);return adjacentElement.call(this,position,node);});
 const outer=Object.getOwnPropertyDescriptor(Element.prototype,'outerHTML');Object.defineProperty(Element.prototype,'outerHTML',{...outer,set(value){this.insertAdjacentHTML('beforebegin',value);this.remove();}});
 if(window.ShadowRoot){const inner=Object.getOwnPropertyDescriptor(ShadowRoot.prototype,'innerHTML');Object.defineProperty(ShadowRoot.prototype,'innerHTML',{...inner,set(value){const t=document.createElement('template');native.inner.set.call(t,String(value));sanitize(t.content);this.replaceChildren(t.content);}});}
 for(const proto of [Element.prototype,window.ShadowRoot?.prototype])if(proto)for(const name of ['setHTML','setHTMLUnsafe'])if(name in proto)define(proto,name,function(value){this.innerHTML=value;});
 const parseHTML=DOMParser.prototype.parseFromString;define(DOMParser.prototype,'parseFromString',function(...args){const doc=parseHTML.apply(this,args);sanitize(doc);return doc;});
 const fragment=Range.prototype.createContextualFragment;define(Range.prototype,'createContextualFragment',function(value){const result=fragment.call(this,value);sanitize(result);return result;});
 const insertRange=Range.prototype.insertNode;define(Range.prototype,'insertNode',function(node){if(blockedTags.has(node?.localName?.toLowerCase()))return;sanitize(node);return insertRange.call(this,node);});
 for(const proto of [Element.prototype,Document.prototype,DocumentFragment.prototype,CharacterData.prototype])for(const key of ['append','prepend','replaceChildren','before','after','replaceWith']){const fn=proto[key];if(fn&&Object.hasOwn(proto,key))define(proto,key,function(...nodes){nodes=nodes.filter(n=>typeof n==='string'||!blockedTags.has(n?.localName?.toLowerCase()));nodes.forEach(n=>{if(typeof n!=='string')sanitize(n);});return fn.apply(this,nodes);});}
 for(const name of ['parseHTML','parseHTMLUnsafe'])if(Document[name]){const fn=Document[name];define(Document,name,function(...args){const doc=fn.apply(this,args);sanitize(doc);return doc;});}
 define(document,'write',(...text)=>{const t=document.createElement('template');native.inner.set.call(t,text.join(''));sanitize(t.content);native.append.call(document.body,t.content);});define(document,'writeln',(...text)=>document.write(...text,'\n'));
 define(Document.prototype,'open',function(){return this;});define(Document.prototype,'close',()=>{});define(Document.prototype,'write',function(...text){document.write(...text);});define(Document.prototype,'writeln',function(...text){document.writeln(...text);});
 function formData(form,submitter){const data=new FormData(form,submitter);return {method:(form.method||'get').toLowerCase(),enctype:form.enctype||'application/x-www-form-urlencoded',entries:[...data]};}
 function submit(form,submitter){let url=remote(native.get.call(submitter||form,'data-bzn-formaction')||native.get.call(form,'data-bzn-action')||current.url);const data=formData(form,submitter),target=submitter?.formTarget||form.target;if(target&&target!=='_self'&&target!=='_top'&&target!=='_parent'){if(data.method==='get'){const u=new URL(url);u.search=new URLSearchParams(data.entries).toString();popup(u.href,target);}else{const token='p'+(++sequence);action('popup-open',{token,url,target,form:data,gesture:navigator.userActivation?.isActive});}}else send('navigate',{url,form:data});}
 HTMLFormElement.prototype.submit=function(){submit(this);};
 async function startDownload(raw,filename){let blob=downloadBlobs.get(raw);if(!blob&&/^data:/i.test(raw)){if(raw.length>44*1024*1024)throw new TypeError('Download data URL is too large.');const match=/^data:([^,]*),([\s\S]*)$/i.exec(raw);if(!match)throw new TypeError('Invalid download data URL.');const value=/;base64\s*$/i.test(match[1])?Uint8Array.from(atob(decodeURIComponent(match[2])),c=>c.charCodeAt(0)):new TextEncoder().encode(decodeURIComponent(match[2]));blob=new native.Blob([value]);}if(blob){if(blob.size>32*1024*1024)throw new TypeError('Download exceeds 32 MB.');return rpc('download',{body:await blob.arrayBuffer(),filename});}return rpc('download',{url:remote(raw),filename});}
 // Run after document-level delegated handlers (jQuery/React/router), not before.
 native.add.call(window,'submit',e=>{if(e.defaultPrevented)return;e.preventDefault();submit(e.target,e.submitter);});
 native.add.call(window,'click',e=>{if(e.defaultPrevented||e.button!==0)return;const a=e.target.closest?.('a,area');if(!a)return;const raw=native.get.call(a,'data-bzn-href')||native.get.call(a,'href');if(!raw)return;e.preventDefault();if(a.hasAttribute('download')){startDownload(raw,native.get.call(a,'download')).catch(error=>console.warn('Browzen download: '+error.message));return;}if(/^javascript:/i.test(raw)){if(!current.noScript)compile(raw.slice(11)).then(code=>(0,eval)(code));return;}try{const url=remote(raw);if((a.target&&a.target!=='_self')||e.ctrlKey||e.metaKey)popup(url,a.target||'_blank');else navigate(url);}catch{}});
 async function hydrateStyles(){const jobs=[];for(const el of document.querySelectorAll('link[data-bzn-href],style[data-bzn-css],[data-bzn-style]')){
  if(el.tagName==='LINK'){jobs.push(resource(native.get.call(el,'data-bzn-href'),'style',native.get.call(el,'data-bzn-integrity')||'').then(url=>new Promise(resolve=>{const timer=setTimeout(resolve,15000);el.onload=el.onerror=()=>{clearTimeout(timer);resolve();};attr(el,'href',url);})).catch(error=>console.warn('Browzen stylesheet: '+error.message)));}
  if(el.hasAttribute('data-bzn-css'))jobs.push(convertCSS(native.get.call(el,'data-bzn-css')).then(css=>{el.textContent=css;}).catch(()=>{}));
  if(el.hasAttribute('data-bzn-style'))jobs.push(convertCSS(native.get.call(el,'data-bzn-style')).then(css=>attr(el,'style',css)).catch(()=>{}));
 }return Promise.allSettled(jobs);}
 function hydrateImages(){const jobs=[];for(const el of document.querySelectorAll('[data-bzn-src],[data-bzn-srcset],[data-bzn-poster],image[data-bzn-href],image[data-bzn-xlink\\:href]')){
  if(!['IMG','IMAGE','INPUT','VIDEO','AUDIO','SOURCE','TRACK','image'].includes(el.tagName))continue;
  for(const key of ['src','srcset','poster','href','xlink:href']){const value=native.get.call(el,'data-bzn-'+key);if(!value)continue;const task=()=>resource(value).then(url=>attr(el,key,url)).catch(()=>{});if(el.tagName==='IMG'&&el.loading==='lazy'&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();task();}},{rootMargin:'400px'});observer.observe(el);}else jobs.push(task());}
 }return Promise.allSettled(jobs);}
 async function install(payload){documentInstalled=true;current=payload;cookie=payload.cookies||'';addResources(payload.resources);define(window,'localStorage',storage('local',payload.local));define(window,'sessionStorage',storage('session',payload.session));define(window,'indexedDB',new IDBFactory());define(window,'IDBKeyRange',IDBKeyRange);
  for(const [tag,attrs]of Object.entries(payload.documentAttrs||{})){const el=tag==='html'?document.documentElement:tag==='body'?document.body:null;if(!el)continue;for(const [key,value]of attrs)if(key==='style'){attr(el,'data-bzn-style',value);attr(el,'style',neutralizeCSS(value));}else if(['class','id','lang','dir'].includes(key)||key.startsWith('data-')&&!key.startsWith('data-bzn-'))attr(el,key,value);}
  const head=document.createElement('template');native.inner.set.call(head,payload.head||'');native.append.call(document.head,head.content);
  const t=document.createElement('template');native.inner.set.call(t,payload.html);native.append.call(document.body,t.content);document.documentElement.style.zoom=String(payload.zoom/100);
  let lastTitle=document.title;send('title',{title:lastTitle});new MutationObserver(()=>{if(document.title!==lastTitle){lastTitle=document.title;send('title',{title:lastTitle});}}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
  const handlers=[];for(const el of document.querySelectorAll('*'))for(const a of [...el.attributes])if(a.name.startsWith('data-bzn-on')&&!current.noScript)handlers.push(compile(a.value).then(code=>{el[a.name.slice(9)]=native.Function('event',code);}).catch(()=>{}));
  const prepared=payload.scripts.map(data=>data&&!(!data.module&&data.nomodule)?prepare(data):Promise.resolve(null));
  const styles=hydrateStyles();let painted=false;const paint=()=>{if(!painted){painted=true;send('paint');}};requestAnimationFrame(paint);setTimeout(paint,100);
  const images=new Promise(resolve=>setTimeout(()=>resolve(hydrateImages()),0));const deferred=[],asyncTasks=[];
  for(let i=0;i<payload.scripts.length;i++){const original=payload.scripts[i];if(!original)continue;const marker=document.querySelector('template[data-bzn-script="'+i+'"]');const run=async()=>{const data=await prepared[i];if(data)await execute(data,marker);else marker?.remove();};
   if(original.async&&original.external)asyncTasks.push(run());else if(original.module||original.defer&&original.external)deferred.push(run);else await run();
  }
  readyState='interactive';for(const run of deferred)await run();await Promise.allSettled([styles,...handlers]);native.dispatch.call(document,new Event('DOMContentLoaded',{bubbles:true}));send('dom-ready');
  await Promise.allSettled([...asyncTasks,images]);readyState='complete';native.dispatch.call(window,new Event('load'));send('loaded',{title:document.title,scriptErrors});
 }
 const accept=e=>{
  if(ready||e.source!==parent||e.data?.type!=='browzen-port'||!e.ports[0])return;
  ready=true;port=e.ports[0];window.removeEventListener('message',accept);
  port.onmessage=e=>{const d=e.data;
   if(d.rpc){const p=pending.get(d.rpc);if(!p)return;clearTimeout(p.timer);pending.delete(d.rpc);d.error?p.reject(Object.assign(new Error(d.error.message),{name:d.error.name})):p.resolve(d.result);return;}
   if(d.type==='document'&&!documentInstalled)install(d).catch(error=>{document.body.textContent='Browzen could not render this page: '+error.message;send('loaded',{title:'Render error'});});
   if(d.type==='cookies')cookie=d.value;
   if(d.type==='zoom')document.documentElement.style.zoom=String(d.zoom/100);
   if(d.type==='managed-close-notice')popups.get(d.token)?.close();
   if(d.type==='managed-message'){
    // Only the trusted broker assigns the virtual origin and known popup handle.
    const source=d.source?.kind==='popup'?popups.get(d.source.token)?.handle:openerFacade;
    const event=new MessageEvent('message',{origin:d.origin,data:d.data});Object.defineProperty(event,'source',{value:source});native.dispatch.call(window,event);
   }
  };port.start();send('ready');
 };window.addEventListener('message',accept);
})();
