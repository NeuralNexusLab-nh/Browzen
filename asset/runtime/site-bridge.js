// Site actions stay inside Browzen; native popups are never enabled.
export function attachSiteBridge(frame,{controller,notify,request,delegate}){
 const scopes=new Map(),windows=new WeakMap(),popups=new Map();
 const query=Document.prototype.querySelectorAll,windowOf=Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype,'contentWindow').get;
 function contains(w,root=frame.frame.contentWindow,depth=0){if(w===root)return true;if(depth>8)return false;try{for(const el of Reflect.apply(query,root.document,['iframe']))if(contains(w,Reflect.apply(windowOf,el,[]),depth+1))return true;}catch{}return false;}
 function urlOf(w){try{const u=controller.decodeUrl(w.location.href);if(/^https?:/.test(u))return new URL(u);}catch{}return new URL(frame.targetURL);}
 function alive(s){try{return !s.dead&&s.window.document===s.document&&contains(s.window);}catch{return false;}}
 function state(s,k,v){s.decisions[k]=v;for(const p of s.statuses.get(k)||[]){p.value=v;p.dispatchEvent(new s.window.Event('change'));}}
 function formNavigation(g,form,submitter){
  const target=submitter?.getAttribute('formtarget')??form.getAttribute('target')??g.document.querySelector('base[target]')?.getAttribute('target')??'_self';
  if(['','_self','_top','_parent'].includes(target))return null;
  const method=(submitter?.getAttribute('formmethod')||form.method||'get').toLowerCase();if(method==='dialog')return null;
  let raw=(submitter?.hasAttribute('formaction')?submitter.formAction:form.action)||urlOf(g).href;if(raw.startsWith(g.location.origin+'/asset/runtime/p/'))raw=controller.decodeUrl(raw);
  const url=new URL(raw,urlOf(g));if(!/^https?:$/.test(url.protocol))throw new g.DOMException('Forms require HTTP or HTTPS.','SecurityError');
  const entries=[...new g.FormData(form,submitter)];
  if(method==='get'){url.search=new URLSearchParams(entries.map(([k,v])=>[k,typeof v==='string'?v:v.name])).toString();return {url:url.href,target};}
  return {url:url.href,target,form:{method:'post',enctype:submitter?.getAttribute('formenctype')||form.enctype||'application/x-www-form-urlencoded',entries}};
 }
 async function action(s,data){if(!alive(s))throw new DOMException('This page is no longer active.','AbortError');
  const result=await request({...data,type:'site-action',scope:{id:s.id,origin:s.origin,topOrigin:urlOf(frame.frame.contentWindow).origin,isMain:s.window===frame.frame.contentWindow},tabId:frame.id});
  if(!alive(s))throw new DOMException('The page changed before the action completed.','AbortError');return result;
 }
 async function ask(s,names){try{if(!s.origin.startsWith('https://'))throw new DOMException('Device permissions require an HTTPS website.','SecurityError');const result=await action(s,{action:'permission',names});if(!result.allowed)throw new DOMException('Permission denied in Browzen.','NotAllowedError');delegate(names,true);for(const n of names)state(s,n,'granted');return result;}catch(e){for(const n of names)state(s,n,'denied');throw e;}}
 function messageArgs(g,message,targetOrigin='/',transfer=[]){if(targetOrigin&&typeof targetOrigin==='object'){transfer=targetOrigin.transfer||[];targetOrigin=targetOrigin.targetOrigin??'/';}targetOrigin=String(targetOrigin);if(targetOrigin!=='*'&&targetOrigin!=='/'){try{targetOrigin=new URL(targetOrigin).origin;}catch{throw new g.DOMException('Invalid target origin.','SyntaxError');}}if(transfer?.length)throw new g.DOMException('Transferable cross-tab messages are not supported.','NotSupportedError');return {message:structuredClone(message),targetOrigin};}
 function wire(client){
  const g=client.global;if(!g.document||!contains(g))return;const prior=windows.get(g);if(prior?.document===g.document)return;
  const s={id:crypto.randomUUID(),window:g,document:g.document,origin:urlOf(g).origin,decisions:{},statuses:new Map(),streams:new Set(),dead:false,activation:g.navigator.userActivation,openBudget:0,gestureUntil:0};
  if(prior)prior.dead=true;windows.set(g,s);scopes.set(s.id,s);
  const set=(o,k,v)=>{if(o)Object.defineProperty(o,k,{value:v,writable:false,configurable:true});};
  notify('site-document',{id:frame.id,scopeId:s.id,origin:s.origin,isMain:g===frame.frame.contentWindow});
  for(const name of ['pointerdown','keydown','click','auxclick'])s.document.addEventListener(name,e=>{if(e.isTrusted){s.openBudget=1;s.gestureUntil=performance.now()+1500;}},true);
  let lastOpen;
  function managedOpen(raw='',target='_blank',features='',background=false,form){
   target=String(target||'_blank');if(target.startsWith('_'))target=target.toLowerCase();
   let url=raw?new URL(String(raw),urlOf(g)).href:'about:blank';
   if(url!=='about:blank'&&!/^https?:/.test(url))throw new g.DOMException('Only HTTP and HTTPS popup links are supported.','SecurityError');
   if(['_self','_parent','_top','_unfencedTop'].includes(target)){client.url=url;return g;}
   const token=crypto.randomUUID(),item={closed:false};popups.set(token,item);lastOpen={url,time:performance.now()};
   const send=(kind,extra={})=>action(s,{action:kind,token,...extra}).catch(e=>{item.closed=true;notify('site-action-error',{id:frame.id,error:e.message});});
   const gesture=s.openBudget>0&&performance.now()<=s.gestureUntil&&!!s.activation?.isActive;if(gesture)s.openBudget--;
   const opened=send('popup-open',{url,target:String(target||'_blank'),background,form,gesture,noOpener:/\b(noopener|noreferrer)\b/i.test(features)});
   const afterOpen=(kind,data)=>opened.then(result=>result?.opened?send(kind,data):undefined);
   const loc={get href(){return url;},set href(v){url=new URL(String(v),urlOf(g)).href;const destination=url;afterOpen('popup-navigate',{url:destination});},assign(v){this.href=v;},replace(v){this.href=v;},toString(){return url;}};
   const handle={get closed(){return item.closed;},get location(){return loc;},set location(v){loc.href=v;},close(){item.closed=true;afterOpen('popup-close');},focus(){afterOpen('popup-focus');},blur(){},postMessage(message,targetOrigin,transfer){const args=messageArgs(g,message,targetOrigin,transfer);afterOpen('popup-message',args);}};
   // Rewritten property access uses this realm's Object.prototype helpers.
   Object.setPrototypeOf(handle,g.Object.prototype);
   item.handle=handle;
   return /\b(noopener|noreferrer)\b/i.test(features)?null:handle;
  }
  // The engine's own open wrapper is replaced after hooks, before website scripts.
  set(g,'open',managedOpen);
  if(g===frame.frame.contentWindow&&frame.opener){const openerHandle={postMessage(message,targetOrigin,transfer){action(s,{action:'opener-message',...messageArgs(g,message,targetOrigin,transfer)}).catch(error=>notify('site-action-error',{id:frame.id,error:error.message}));}};Object.setPrototypeOf(openerHandle,g.Object.prototype);s.openerHandle=openerHandle;set(g,'opener',openerHandle);set(g,'close',()=>action(s,{action:'opener-close-self'}).catch(()=>{}));}
  const follow=e=>{if(e.defaultPrevented||(e.type==='click'&&e.button!==0)||(e.type==='auxclick'&&e.button!==1))return;const a=e.target?.closest?.('a[href],area[href]');if(!a)return;
   const target=a.getAttribute('target')||s.document.querySelector('base[target]')?.getAttribute('target')||'_self';
   if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&e.button!==1&&['_self','_parent','_top',''].includes(target))return;
   const href=a.href;if(!/^https?:/.test(href))return;e.preventDefault();
   if(lastOpen?.url===href&&performance.now()-lastOpen.time<100)return;
   managedOpen(href,target==='_self'?'_blank':target,/\bopener\b/i.test(a.rel||'')?a.rel:(a.rel||'')+' noopener',!!(e.ctrlKey||e.metaKey||e.button===1));
  };
  s.document.addEventListener('click',follow);s.document.addEventListener('auxclick',follow);
  const submitPopup=(form,submitter)=>{const d=formNavigation(g,form,submitter);if(!d)return false;managedOpen(d.url,d.target,/\bopener\b/i.test(form.rel||'')?form.rel:(form.rel||'')+' noopener',false,d.form);return true;};
  s.document.addEventListener('submit',e=>{if(!e.defaultPrevented&&e.target?.tagName==='FORM'&&submitPopup(e.target,e.submitter))e.preventDefault();});
  const nativeSubmit=g.HTMLFormElement.prototype.submit;
  set(g.HTMLFormElement.prototype,'submit',function(){if(!submitPopup(this))return Reflect.apply(nativeSubmit,this,[]);});
  const media=g.navigator.mediaDevices;
  if(media?.getUserMedia){const native=media.getUserMedia.bind(media);set(media,'getUserMedia',async constraints=>{
   const names=[];if(constraints?.video)names.push('camera');if(constraints?.audio)names.push('microphone');if(!names.length)return native(constraints);
   await ask(s,names);try{const stream=await native(constraints);if(!alive(s)){stream.getTracks().forEach(t=>t.stop());throw new DOMException('Page closed.','AbortError');}s.streams.add(stream);return stream;}catch(e){for(const n of names)state(s,n,'denied');action(s,{action:'native-denied',names}).catch(()=>{});throw e;}
  });}
  const geo=g.navigator.geolocation;
  if(geo){const get=geo.getCurrentPosition.bind(geo),watch=geo.watchPosition.bind(geo),clear=geo.clearWatch.bind(geo),watches=new Map();let serial=0;
   const denied=(cb,e)=>cb?.({code:1,message:e.message,PERMISSION_DENIED:1,POSITION_UNAVAILABLE:2,TIMEOUT:3});
   set(geo,'getCurrentPosition',(ok,bad,options)=>{if(typeof ok!=='function')throw new TypeError('A success callback is required.');ask(s,['geolocation']).then(()=>get(ok,bad,options)).catch(e=>denied(bad,e));});
   set(geo,'watchPosition',(ok,bad,options)=>{if(typeof ok!=='function')throw new TypeError('A success callback is required.');const id=++serial;watches.set(id,null);ask(s,['geolocation']).then(()=>{if(watches.has(id))watches.set(id,watch(ok,bad,options));}).catch(e=>denied(bad,e));return id;});
   set(geo,'clearWatch',id=>{const actual=watches.get(id);if(actual!=null)clear(actual);watches.delete(id);});
  }
  const clip=g.navigator.clipboard;
  async function clipboard(op,data={}){if(!s.origin.startsWith('https://'))throw new g.DOMException('Clipboard access requires an HTTPS website.','SecurityError');const r=await action(s,{action:'clipboard',op,...data});if(!r.allowed)throw new g.DOMException('Clipboard access denied.','NotAllowedError');return r;}
  if(clip){set(clip,'readText',async()=>String((await clipboard('readText')).text??''));set(clip,'writeText',async text=>{await clipboard('writeText',{text:String(text)});});
   set(clip,'read',async()=>{const r=await clipboard('read');return r.items.map(item=>new g.ClipboardItem(Object.fromEntries(item.map(x=>[x.type,new g.Blob([x.bytes],{type:x.type})]))));});
   set(clip,'write',async items=>{const data=await Promise.all(Array.from(items).map(async item=>Promise.all(Array.from(item.types).map(async type=>({type,bytes:await(await item.getType(type)).arrayBuffer()})))));await clipboard('write',{items:data});});
  }
  // Cover prototype calls as well as ordinary navigator API calls.
  for(const [object,names]of [[media,['getUserMedia']],[geo,['getCurrentPosition','watchPosition','clearWatch']],[clip,['readText','writeText','read','write']]])if(object)for(const name of names)if(typeof object[name]==='function'){const proto=Object.getPrototypeOf(object),old=Object.getOwnPropertyDescriptor(proto,name);if(!old||old.configurable)Object.defineProperty(proto,name,{value:object[name],configurable:false,writable:false});}
  const originalExec=s.document.execCommand?.bind(s.document);
  if(originalExec)set(s.document,'execCommand',(cmd,...rest)=>{const name=String(cmd).toLowerCase();if(!['copy','cut','paste'].includes(name))return originalExec(cmd,...rest);
   const el=s.document.activeElement,editable=el&&['INPUT','TEXTAREA'].includes(el.tagName),start=el?.selectionStart,end=el?.selectionEnd;
   if(name==='paste'){clipboard('readText').then(r=>{if(editable){el.setRangeText(r.text,start,end,'end');el.dispatchEvent(new g.Event('input',{bubbles:true}));}else originalExec('insertText',false,r.text);}).catch(()=>{});return false;}
   const text=editable&&start!=null?el.value.slice(start,end):g.getSelection()?.toString()||'';
   clipboard('writeText',{text}).then(()=>{if(name==='cut'&&editable){el.setRangeText('',start,end,'start');el.dispatchEvent(new g.Event('input',{bubbles:true}));}}).catch(()=>{});return false;
  });
  if(g.navigator.permissions?.query){const original=g.navigator.permissions.query.bind(g.navigator.permissions);set(g.navigator.permissions,'query',async descriptor=>{
   const name=descriptor?.name;if(!['camera','microphone','geolocation','notifications','clipboard-read','clipboard-write'].includes(name))return original(descriptor);
   const p=new g.EventTarget();p.value=s.decisions[name]||'prompt';Object.defineProperty(p,'state',{get:()=>p.value});p.onchange=null;
   const dispatch=p.dispatchEvent.bind(p);p.dispatchEvent=e=>{dispatch(e);if(typeof p.onchange==='function')p.onchange(e);return true;};
   const list=s.statuses.get(name)||[];list.push(p);s.statuses.set(name,list);return p;
  });}
  if(g.Notification){
   function SiteNotification(title,options={}){if(!new.target)throw new TypeError('Use new Notification().');if(s.decisions.notifications!=='granted')throw new g.DOMException('Notification permission has not been granted.','NotAllowedError');const target=new g.EventTarget(),token=crypto.randomUUID();target.close=()=>action(s,{action:'notification-close',token}).catch(()=>{});action(s,{action:'notification-show',token,title:String(title),body:String(options.body||'')}).catch(()=>target.dispatchEvent(new g.Event('error')));return target;}
   Object.defineProperty(SiteNotification,'permission',{get:()=>({granted:'granted',denied:'denied'}[s.decisions.notifications]||'default')});
   SiteNotification.requestPermission=callback=>ask(s,['notifications']).then(()=> 'granted',()=> 'denied').then(v=>{callback?.(v);return v;});set(g,'Notification',SiteNotification);
  }
 }
 frame.addEventListener('contextInit',e=>wire(e.client));
 // With NoScript, the page cannot install a client. Handle plain target links
 // from the trusted outer runtime without enabling website JavaScript.
 function noScriptLinks(){
  const g=frame.frame.contentWindow,doc=g.document,id=crypto.randomUUID(),origin=urlOf(g).origin;
  notify('site-document',{id:frame.id,scopeId:id,origin,isMain:true});
  doc.addEventListener('click',e=>{const a=e.target?.closest?.('a[href]');if(!e.isTrusted||!a||e.defaultPrevented)return;
   const target=a.getAttribute('target')||'_self';if(target==='_self'&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey)return;
   let url=a.href;try{if(url.startsWith(g.location.origin+'/asset/runtime/p/'))url=controller.decodeUrl(url);url=new URL(url,urlOf(g)).href;}catch{return;}
   if(!/^https?:/.test(url))return;e.preventDefault();
   request({type:'site-action',tabId:frame.id,scope:{id,origin,topOrigin:origin,isMain:true},action:'popup-open',url,target,token:crypto.randomUUID(),noOpener:true,gesture:true,background:!!(e.ctrlKey||e.metaKey)}).catch(error=>notify('site-action-error',{id:frame.id,error:error.message}));
  });
  doc.addEventListener('submit',e=>{if(!e.isTrusted||e.defaultPrevented)return;const d=formNavigation(g,e.target,e.submitter);if(!d)return;e.preventDefault();request({type:'site-action',tabId:frame.id,scope:{id,origin,topOrigin:origin,isMain:true},action:'popup-open',...d,token:crypto.randomUUID(),noOpener:true,gesture:true}).catch(error=>notify('site-action-error',{id:frame.id,error:error.message}));});
 }
 return {noScriptLinks,receiveMessage(data){const s=scopes.get(data.scopeId);if(!s||!alive(s))return;const source=data.source.kind==='opener'?s.openerHandle:popups.get(data.source.token)?.handle;if(!source)return;const event=new s.window.MessageEvent('message',{data:data.data,origin:data.origin});Object.defineProperty(event,'source',{value:source});s.window.dispatchEvent(event);},popupClosed(token){const p=popups.get(token);if(p)p.closed=true;},revoke(names){for(const s of scopes.values()){for(const n of names)state(s,n,'denied');for(const stream of s.streams)stream.getTracks().forEach(t=>t.stop());}},dispose(){for(const s of scopes.values()){s.dead=true;for(const stream of s.streams)stream.getTracks().forEach(t=>t.stop());}scopes.clear();}};
}

