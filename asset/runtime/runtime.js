import {attachSiteBridge} from './site-bridge.js';
import {webOrigin,contentSuffix,runtimePath} from '../config.js';
const localRuntime=/^bzn-[a-f0-9]{16}\.localhost$/.test(location.hostname)&&location.port==='7352';
const productionRuntime=location.protocol==='https:'&&new RegExp('^bzn-[a-f0-9]{16}\\.'+contentSuffix.replaceAll('.','\\.')+'$').test(location.hostname);
if(!localRuntime&&!productionRuntime)throw Error('Website content must run on an isolated content origin.');
const TRUSTED=localRuntime?'http://127.0.0.1:7351':webOrigin;
const BROWSING_SUSPENDED=false;
let broker,controller,readyResolve,retired=false,level='standard';
const connected=new Promise(r=>readyResolve=r),frames=new Map(),bridges=new Map();
const notify=(type,data={})=>parent.postMessage({type,...data},TRUSTED);
function request(data){return new Promise((resolve,reject)=>{
 if(retired)return reject(Error('Website session closed.'));
 const pair=new MessageChannel(),timer=setTimeout(()=>{pair.port1.close();reject(Error('Puter request timed out'));},70000);
 pair.port1.onmessage=e=>{clearTimeout(timer);pair.port1.close();e.data.ok?resolve(e.data.result):reject(Object.assign(Error(e.data.error),{name:e.data.name||'Error'}));};
 broker.postMessage({type:'request',...data},[pair.port2]);
});}
const transport={ready:true,async init(){},meta(){return {};},async request(remote,method,body,headers){
 if(body instanceof ReadableStream)body=await new Response(body).arrayBuffer();
 return request({url:remote.href,method,body,headers});
},connect(url,protocols,headers,onopen,onmessage,onclose,onerror){queueMicrotask(()=>onerror('WebSockets are not supported by this Puter adapter.'));return [()=>{},()=>onclose(1000,'Closed')];}};
function tabUpdate(id,f,loading){let url,title;try{url=controller.decodeUrl(f.frame.contentWindow.location.href);title=f.frame.contentDocument.title;}catch{}
 notify('tab-update',{id,url:url?.startsWith('http')?url:undefined,title:title||undefined,loading});
}
window.addEventListener('message',e=>{
 if(e.origin!==TRUSTED||e.source!==parent||e.data?.type!=='connect-browzen'||!e.ports[0]||broker)return;
 broker=e.ports[0];broker.onmessage=handle;broker.start();readyResolve();
});
function applyPolicy(f){
 let url=f.targetURL||'';if(!url)try{url=controller.decodeUrl(f.frame.src);}catch{}
 const blocked=f.noScript||level==='safest'||(level==='safer'&&!url.startsWith('https:'));
 f.scriptsBlocked=blocked;
 f.frame.setAttribute('sandbox',blocked?'allow-same-origin allow-forms':'allow-same-origin allow-scripts allow-forms');
 f.frame.setAttribute('allow',['camera','microphone','geolocation'].map(k=>k+' '+(f.permissions?.[k]?'*':"'none'")).join('; ')+"; clipboard-read 'none'; clipboard-write 'none'");
}
async function clearSession(){
 retired=true;for(const b of bridges.values())b.dispose();bridges.clear();for(const f of frames.values())f.frame.remove();frames.clear();
 let clean=true;
 try{localStorage.clear();sessionStorage.clear();for(const cookie of document.cookie.split(';'))document.cookie=cookie.split('=')[0].trim()+'=; Max-Age=0; path=/';}catch{clean=false;}
 try{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const k of await caches.keys())await caches.delete(k);}catch{clean=false;}
 try{
  // Clear the virtual cookie jar even when an engine connection delays database deletion.
  const db=await controller.openIDB();const tx=db.transaction(['cookies','redirectTrackers'],'readwrite');
  await Promise.all([tx.objectStore('cookies').clear(),tx.objectStore('redirectTrackers').clear()]);await tx.done;db.close();
  if(indexedDB.databases){const dbs=await indexedDB.databases();const results=await Promise.all(dbs.filter(d=>d.name).map(d=>new Promise(resolve=>{
   const req=indexedDB.deleteDatabase(d.name);req.onsuccess=()=>resolve(true);req.onerror=()=>resolve(false);req.onblocked=()=>resolve(false);
  })));clean=clean&&results.every(Boolean);}else clean=false;
 }catch{clean=false;}
 try{controller.db?.close();if(indexedDB.databases){const remaining=await indexedDB.databases();clean=clean&&remaining.length===0&&localStorage.length===0&&sessionStorage.length===0&&(await caches.keys()).length===0;}else clean=false;}catch{clean=false;}
 notify('cleanup-result',{clean});
}
async function handle(event){const d=event.data;try{
 await initialized;if(d.type==='clear'){await clearSession();return;}if(retired)return;
 if(d.type==='navigate'&&BROWSING_SUSPENDED&&!d.url.startsWith('https://browzen.test/'))throw Error('Website browsing suspended: WebRTC protection has not been verified.');
 if(d.type==='navigate'){
  level=d.level||level;let f=frames.get(d.id);
  if(!f){f=controller.createFrame();f.id=d.id;f.frame.title='Website content';frames.set(d.id,f);
   bridges.set(d.id,attachSiteBridge(f,{controller,notify,request,delegate(names,value){f.permissions??={};for(const n of names)f.permissions[n]=value;applyPolicy(f);}}));document.body.append(f.frame);
   f.frame.addEventListener('load',()=>{if(f.scriptsBlocked)bridges.get(d.id)?.noScriptLinks();tabUpdate(d.id,f,false);});
   f.addEventListener('urlchange',e=>notify('tab-update',{id:d.id,url:e.url,loading:false}));
   f.addEventListener('navigate',e=>{f.targetURL=e.url;applyPolicy(f);notify('tab-update',{id:d.id,url:e.url,loading:true});});
  }
  f.opener=d.opener;f.noScript=!!d.noScript;f.targetURL=d.url;f.frame.style.zoom=(d.zoom||100)/100;
  // Set the script policy before beginning navigation.
  applyPolicy(f);
  if(d.form){const form=document.createElement('form');form.method='post';form.enctype=d.form.enctype;form.action=controller.encodeUrl(d.url);form.target=f.frame.name;form.hidden=true;for(const [name,value]of d.form.entries){const input=document.createElement('input');input.name=name;if(value instanceof File){input.type='file';const transfer=new DataTransfer();transfer.items.add(value);input.files=transfer.files;}else{input.type='hidden';input.value=value;}form.append(input);}document.body.append(form);try{HTMLFormElement.prototype.submit.call(form);}finally{form.remove();}}
  else f.go(d.url);
 }else if(d.type==='activate'){for(const [id,f]of frames)f.frame.hidden=id!==d.id;}
 else if(d.type==='close'){bridges.get(d.id)?.dispose();bridges.delete(d.id);frames.get(d.id)?.frame.remove();frames.delete(d.id);}
 else if(['back','forward','reload'].includes(d.type))frames.get(d.id)?.[d.type]();
 else if(d.type==='scripts'){const f=frames.get(d.id);if(f){f.noScript=d.noScript;applyPolicy(f);f.reload();}}
 else if(d.type==='security'){level=d.level;for(const f of frames.values()){applyPolicy(f);f.reload();}}
 else if(d.type==='permissions'){const f=frames.get(d.id);if(f){f.permissions=d.permissions;if(d.revoke?.length){bridges.get(d.id)?.revoke(d.revoke);f.reload();}applyPolicy(f);}}
 else if(d.type==='managed-close-notice')bridges.get(d.id)?.popupClosed(d.token);
 else if(d.type==='managed-message')bridges.get(d.id)?.receiveMessage(d);
 else if(d.type==='zoom'){for(const f of frames.values())f.frame.style.zoom=d.zoom/100;}
 }catch(error){notify('engine-error',{error:error.message});}}
const initialized=(async()=>{try{
 __browzenPrivacy.install(globalThis);
 if(navigator.hardwareConcurrency!==4||Intl.DateTimeFormat().resolvedOptions().timeZone!=='UTC')throw Error('Privacy initialization failed. Website loading is blocked.');
 const {ScramjetController}=$scramjetLoadController();
 controller=new ScramjetController({prefix:runtimePath+'p/',files:{wasm:runtimePath+'vendor/scramjet/scramjet.wasm.wasm',all:runtimePath+'vendor/scramjet/scramjet.guarded.js',sync:runtimePath+'vendor/scramjet/scramjet.sync.js'},flags:{serviceworkers:false,allowFailedIntercepts:false}});
 await controller.init();const registration=await navigator.serviceWorker.register(runtimePath+'sw.js',{scope:runtimePath});
 if(!registration.active)await new Promise(resolve=>{const w=registration.installing||registration.waiting;if(w.state==='activated')resolve();else w.addEventListener('statechange',()=>{if(w.state==='activated')resolve();});});
 await connected;const connection=new BareMux.BareMuxConnection(runtimePath+'vendor/baremux/worker.js');await connection.setRemoteTransport(transport,'Browzen Puter transport');
 }catch(error){notify('engine-error',{error:error.message});throw error;}})();
notify('engine-ready');

