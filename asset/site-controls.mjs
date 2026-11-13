export const permissionNames={camera:'Camera',microphone:'Microphone',geolocation:'Location','clipboard-read':'Read clipboard','clipboard-write':'Write clipboard',notifications:'Notifications',popups:'Open new tabs'};
const nativePolicy=['camera','microphone','geolocation','clipboard-read','clipboard-write'];
export function createSiteControls({records,active,newTab,activate,closeTab,navigate,command,status,validateRemote,testMode=false}){
 const modal=document.createElement('dialog');modal.className='site-permission-dialog';modal.innerHTML='<div class="permission-symbol">◇</div><p class="permission-eyebrow">SITE PERMISSION</p><h2></h2><strong class="request-origin"></strong><p class="request-detail"></p><div class="permission-actions"><button class="deny">Block</button><button class="allow">Allow for this page</button></div><p class="permission-footnote">Only this page. Nothing is saved after Refresh Identity.</p>';document.body.append(modal);
 const queue=[],popupMap=new Map(),notifications=new Map();let showing=false;
 function policy(record){record.frame.setAttribute('allow',nativePolicy.map(k=>k+' '+(!k.startsWith('clipboard-')&&record.permissions[k]?'*':"'none'")).join('; '));}
 function sync(){const r=records.get(active());for(const [kind]of Object.entries(permissionNames)){const input=document.querySelector('#allow-'+kind);if(input)input.checked=!!r?.permissions[kind];}}
 function error(message,name='NotAllowedError'){return Object.assign(new Error(message),{name});}
 function verify(record,scope){if(record.retired||!records.has(record.id)||record.retiredScopes?.has(scope?.id))throw error('This page has closed.','AbortError');if(!scope||typeof scope.id!=='string'||!/^https?:\/\//.test(scope.origin))throw error('Invalid website permission request.');const origin=new URL(scope.origin).origin;if(origin!==scope.origin)throw error('Invalid website origin.');record.siteScopes??=new Map();const old=record.siteScopes.get(scope.id);if(old&&old.origin!==scope.origin)throw error('Website identity changed.');record.siteScopes.set(scope.id,{...scope});return scope;}
 function prompt(record,scope,{title,detail,once=false,execute=async()=>true}){return new Promise((resolve,reject)=>{
  if(queue.length>=8){reject(error('Too many pending permission requests.'));return;}
  if(record.id!==active()){reject(error('Select this tab before granting permission.'));return;}
  queue.push({record,scope,title,detail,once,execute,resolve,reject});next();
 });}
 function finish(allowed){const item=queue.shift();if(!item)return;modal.close();showing=false;allowed===true?item.resolve(true):item.reject(allowed instanceof Error?allowed:error('Permission blocked in Browzen.'));next();}
 function next(){if(showing||!queue.length)return;const item=queue[0];if(item.record.retired){queue.shift().reject(error('Page closed.','AbortError'));next();return;}showing=true;
  modal.querySelector('h2').textContent=item.title;modal.querySelector('.request-origin').textContent=item.scope.origin;
  modal.querySelector('.request-detail').textContent=item.detail+(item.scope.topOrigin!==item.scope.origin?' Embedded in '+item.scope.topOrigin+'.':'');
  const allow=modal.querySelector('.allow');allow.textContent=item.once?'Allow once':'Allow for this page';allow.disabled=false;modal.showModal();modal.querySelector('.deny').focus();
 }
 modal.querySelector('.deny').onclick=()=>finish(false);modal.addEventListener('cancel',e=>{e.preventDefault();finish(false);});
 modal.querySelector('.allow').onclick=async()=>{const item=queue[0];if(!item)return;const button=modal.querySelector('.allow');button.disabled=true;button.textContent='Waiting for your browser…';try{verify(item.record,item.scope);await item.execute();if(queue[0]===item)finish(true);}catch(e){if(queue[0]===item)finish(error(e.message,e.name));}};
 function grants(record,id){record.siteGrants??=new Map();if(!record.siteGrants.has(id))record.siteGrants.set(id,new Set());return record.siteGrants.get(id);}
 function denials(record,id){record.siteDenials??=new Map();if(!record.siteDenials.has(id))record.siteDenials.set(id,new Set());return record.siteDenials.get(id);}
 function cancelRequests(record){for(let i=queue.length-1;i>=0;i--)if(queue[i].record===record){const item=queue.splice(i,1)[0];item.reject(error('Page changed.','AbortError'));if(i===0&&showing){modal.close();showing=false;}}next();}
 async function permit(record,scope,names){names=[...new Set(names)];if(!scope.origin.startsWith('https://'))throw error('Website permissions require HTTPS.','SecurityError');if(!names.length||names.some(n=>!permissionNames[n]))throw error('Unsupported permission.');const granted=grants(record,scope.id),denied=denials(record,scope.id);if(names.some(n=>denied.has(n)))throw error('Permission blocked for this page. Change it in Control Panel.');if(names.every(n=>granted.has(n)))return;
  try{await prompt(record,scope,{title:'Allow '+names.map(n=>permissionNames[n].toLowerCase()).join(' and ')+'?',detail:names.includes('geolocation')?'This uses your device’s real location, not the Puter connection location.':'Access comes from your device. Your browser may ask for additional permission.',execute:async()=>{
   if(names.includes('notifications')){if(!window.Notification)throw error('Notifications are unavailable in this browser.','NotSupportedError');if(await Notification.requestPermission()!=='granted')throw error('Your browser did not allow notifications.');}
  }});}catch(e){if(e.name!=='AbortError')for(const n of names)denied.add(n);throw e;}
  verify(record,scope);for(const n of names){granted.add(n);if(scope.isMain)record.permissions[n]=true;}
  // Native policy is tab-wide; the injected bridge separately gates each document.
  for(const n of names)if(nativePolicy.includes(n))record.permissions[n]=true;policy(record);sync();
 }
 function targetURL(raw){if(raw==='about:blank'||!raw)return 'browzen://newtab';if(testMode&&/^https:\/\/browzen\.test\/(probe|actions|child)\.html(?:[?#].*)?$/.test(raw))return raw;return validateRemote(raw).href;}
 function postTo(target,scope,data,source,scopeId=target?.mainScope){if(!target||target.retired||!scopeId)return;const destination=target.siteScopes?.get(scopeId)?.origin;if(!destination)return;let expected=data.targetOrigin;if(expected==='/')expected=scope.origin;if(expected!=='*'){try{expected=new URL(expected).origin;}catch{throw error('Invalid message target origin.','SyntaxError');}if(expected!==destination)return;}command('managed-message',{id:target.id,origin:scope.origin,data:data.message,source,scopeId});}
 async function handle(record,data){const scope=verify(record,data.scope),action=data.action;
  if(action==='permission'){await permit(record,scope,data.names||[]);return {allowed:true};}
  if(action==='native-denied'){const set=grants(record,scope.id),denied=denials(record,scope.id);for(const n of data.names||[]){set.delete(n);denied.add(n);record.permissions[n]=false;}policy(record);sync();return {};}
  if(action==='clipboard'){
   const op=data.op;if(!['readText','writeText','read','write'].includes(op))throw error('Unsupported clipboard operation.');const reading=op.startsWith('read');let result;
   if(typeof data.text==='string'&&data.text.length>1024*1024)throw error('Clipboard text exceeds the 1 MB limit.');
   await prompt(record,scope,{title:reading?'Read your clipboard?':'Write to your clipboard?',once:true,detail:reading?'This website will receive your system clipboard contents. They may contain passwords or other private information.':'This replaces your current system clipboard.'+(data.text?' Text: '+data.text.slice(0,160):''),execute:async()=>{
    if(!navigator.clipboard?.[op])throw error('This clipboard operation is unavailable.','NotSupportedError');
    if(op==='readText')result={text:await navigator.clipboard.readText()};
    else if(op==='writeText')await navigator.clipboard.writeText(String(data.text||''));
    else if(op==='read'){let total=0;const items=await navigator.clipboard.read();result={items:await Promise.all(items.map(async item=>Promise.all(item.types.map(async type=>{const bytes=await(await item.getType(type)).arrayBuffer();total+=bytes.byteLength;if(total>4*1024*1024)throw error('Clipboard data exceeds 4 MB.');return {type,bytes};}))))};}
    else {let total=0;const items=(data.items||[]).map(item=>new ClipboardItem(Object.fromEntries(item.map(({type,bytes})=>{total+=bytes?.byteLength||0;if(total>4*1024*1024)throw error('Clipboard data exceeds 4 MB.');return [type,new Blob([bytes],{type})];}))));await navigator.clipboard.write(items);}
   }});return {allowed:true,...result};
  }
  const key=record.id+':'+data.token;
  if(action==='popup-open'){
   const url=targetURL(data.url);if(!data.gesture)await prompt(record,scope,{title:'Open a new tab?',once:true,detail:'This page tried to open a tab without a current click. Destination: '+(data.url||'New Tab')});
   let form;if(data.form){if(data.form.method!=='post'||!['application/x-www-form-urlencoded','multipart/form-data','text/plain'].includes(data.form.enctype)||!Array.isArray(data.form.entries)||data.form.entries.length>1000)throw error('Invalid popup form.','TypeError');let size=0;for(const pair of data.form.entries){if(!Array.isArray(pair)||pair.length!==2||typeof pair[0]!=='string'||!(typeof pair[1]==='string'||(typeof File!=='undefined'&&pair[1] instanceof File)))throw error('Invalid form field.','TypeError');size+=pair[0].length+(typeof pair[1]==='string'?pair[1].length:pair[1].size);}if(size>8*1024*1024)throw error('Popup form exceeds 8 MB.','QuotaExceededError');form=data.form;}
   if(popupMap.size>=32)throw error('Too many popup tabs are open.');
   let tab;if(data.target&&data.target!=='_blank')tab=[...popupMap.values()].find(v=>v.owner===record.id&&v.scope===scope.id&&v.name===data.target)?.tab;
   const opener=data.noOpener?undefined:{owner:record.id,scope:scope.id,token:data.token};
   if(tab){if(url!=='browzen://newtab')await navigate(url,tab,{form});activate(tab.id);}else tab=newTab(url,{background:!!data.background,form,opener});
   popupMap.set(key,{tab,owner:record.id,scope:scope.id,name:data.target,token:data.token,noOpener:!!data.noOpener});return {opened:true};
  }
  if(action==='opener-message'||action==='opener-close-self'){const link=record.opener,p=link&&popupMap.get(link.owner+':'+link.token);if(!scope.isMain||!p||p.tab.id!==record.id||p.noOpener||p.scope!==link.scope)throw error('No opener is available.','InvalidStateError');const owner=records.get(link.owner);if(action==='opener-close-self')await closeTab(record.id);else if(owner?.siteScopes?.has(link.scope))postTo(owner,scope,data,{kind:'popup',token:link.token},link.scope);return {};}
  if(action.startsWith('popup-')){const p=popupMap.get(key);if(!p||p.scope!==scope.id)throw error('This popup tab is no longer available.','InvalidStateError');
   if(action==='popup-navigate')await navigate(targetURL(data.url),p.tab);else if(action==='popup-close'){await closeTab(p.tab.id);popupMap.delete(key);}else if(action==='popup-focus')activate(p.tab.id);else if(action==='popup-message'){if(p.noOpener)throw error('Opener access was disabled.');postTo(records.get(p.tab.id),scope,data,{kind:'opener',token:p.token});}return {};
  }
  if(action==='notification-show'){if(!grants(record,scope.id).has('notifications')||Notification.permission!=='granted')throw error('Notifications are not allowed.');const n=new Notification(new URL(scope.origin).hostname+' — '+String(data.title).slice(0,160),{body:String(data.body||'').slice(0,1000),icon:'/asset/icon.png'});notifications.set(key,n);return {};}
  if(action==='notification-close'){notifications.get(key)?.close();notifications.delete(key);return {};}
  throw error('This website action is not supported.','NotSupportedError');
 }
 return {handle,sync,cancel:cancelRequests,async allowFromPanel(record,names){const meta=record.siteScopes?.get(record.mainScope),scope=verify(record,{...meta,id:record.mainScope,topOrigin:meta?.origin,isMain:true});for(const n of names)denials(record,scope.id).delete(n);await permit(record,scope,names);command('permissions',{id:record.id,permissions:record.permissions});},document(record,data){if(data.isMain&&record.mainScope!==data.scopeId){cancelRequests(record);record.retiredScopes??=new Set();for(const id of record.siteScopes?.keys()||[])record.retiredScopes.add(id);record.siteScopes?.clear();record.mainScope=data.scopeId;record.permissions=Object.fromEntries(Object.keys(permissionNames).map(k=>[k,false]));record.siteGrants?.clear();record.siteDenials?.clear();policy(record);sync();}record.siteScopes??=new Map();record.siteScopes.set(data.scopeId,{id:data.scopeId,origin:data.origin});},revoke(record,names){record.siteGrants?.forEach(set=>names.forEach(n=>set.delete(n)));for(const id of record.siteScopes?.keys()||[])for(const n of names)denials(record,id).add(n);for(const n of names)record.permissions[n]=false;policy(record);command('permissions',{id:record.id,permissions:record.permissions,revoke:names});sync();},closed(id){
  for(const [key,p]of popupMap)if(p.tab.id===id){command('managed-close-notice',{id:p.owner,token:p.token});popupMap.delete(key);}
  for(let i=queue.length-1;i>=0;i--)if(queue[i].record.id===id){if(i===0&&showing)finish(error('Page closed.','AbortError'));else queue.splice(i,1)[0].reject(error('Page closed.','AbortError'));}
 }};
}
