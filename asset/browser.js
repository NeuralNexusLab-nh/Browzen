import {addressToURL,validateRemote} from './url-policy.js';
import {createSiteControls,permissionNames} from './site-controls.js';
import {contentOrigin,runtimePath} from './config.js';
const $=s=>document.querySelector(s);
const WEB_BROWSING_SUSPENDED=false;
const WEB_SAFETY_NOTICE='Website browsing is paused: a WebRTC IP leak was reported. Protection has not been verified. Do not use this preview for anonymous browsing.';
if(WEB_BROWSING_SUSPENDED){const safetyBanner=document.createElement('div');safetyBanner.className='security-incident';safetyBanner.role='alert';safetyBanner.textContent=WEB_SAFETY_NOTICE;$('#chrome').after(safetyBanner);}
$('#engine').remove();document.querySelector('.quicklinks')?.remove();
const tabs=[],records=new Map();let active,sequence=0,requests=0,egress=null,noScript=false,zoom=100,authenticated=false;
const engines=[['DuckDuckGo','duckduckgo.ico','https://duckduckgo.com/?q='],['Google','google.ico','https://www.google.com/search?q='],['Bing','bing.ico','https://www.bing.com/search?q='],['Brave','brave.ico','https://search.brave.com/search?q='],['Startpage','startpage.ico','https://www.startpage.com/sp/search?query='],['Yahoo','yahoo.ico','https://search.yahoo.com/search?p='],['Yandex','yandex.ico','https://yandex.com/search/?text='],['Baidu','baidu.ico','https://www.baidu.com/s?wd='],['360 Search','360.ico','https://www.so.com/s?q=']];
let searchEngine=0,securityLevel='standard',lastCleanup='No identity refresh yet.',siteControls;
function status(value){$('#status').textContent=value;}
function selected(){return tabs.find(t=>t.id===active);}
function command(type,data={}){if(type==='zoom'){for(const record of records.values())record.port?.postMessage({type,...data});return;}records.get(data.id||active)?.port?.postMessage({type,...data});}
async function ensureEngine(t){
 if(records.has(t.id))return records.get(t.id).ready;
 const id=crypto.randomUUID().replaceAll('-','').slice(0,16),origin=contentOrigin(id);
 const frame=document.createElement('iframe');frame.className='content-engine';frame.title='Isolated website content';frame.sandbox='allow-scripts allow-same-origin allow-forms';frame.setAttribute('allow',"camera 'none'; microphone 'none'; geolocation 'none'; clipboard-read 'none'; clipboard-write 'none'");frame.hidden=t.id!==active;
 const record={id:t.id,origin,frame,abort:new AbortController(),permissions:{camera:false,microphone:false,geolocation:false}};
 record.ready=new Promise((resolve,reject)=>{record.resolve=resolve;record.timer=setTimeout(()=>reject(Error('Content engine did not start. Reload and try again.')),20000);});
 records.set(t.id,record);frame.src=origin+runtimePath+'index.html';$('#viewport').append(frame);layoutFrame(record);if(t.id===active)frame.id='engine';return record.ready;
}
function drawTabs(){
 const root=$('#tabs');root.replaceChildren();
 for(const t of tabs){const b=document.createElement('div');b.className='tab';b.role='tab';b.tabIndex=0;b.setAttribute('aria-selected',String(t.id===active));b.setAttribute('aria-label',t.title);const icon=document.createElement('img');icon.className='tab-icon';icon.src='/asset/icon.png';icon.alt='';const title=document.createElement('span');title.className='tab-title';title.textContent=t.title;const close=document.createElement('button');close.className='tab-close';close.textContent='×';close.setAttribute('aria-label','Close '+t.title);close.onclick=e=>{e.stopPropagation();closeTab(t.id);};b.append(icon,title,close);b.onclick=()=>activate(t.id);b.onkeydown=e=>{if(e.key==='Enter')activate(t.id);};root.append(b);}
}
function newTab(url='browzen://newtab',{background=false,form,opener}={}){const t={id:'t'+(++sequence),url:'browzen://newtab',title:'New Tab',loading:false,opener};tabs.push(t);if(!background||!active)activate(t.id);else drawTabs();if(url!=='browzen://newtab')navigate(url,t,{form});return t;}
async function closeTab(id){const record=records.get(id);const i=tabs.findIndex(t=>t.id===id);if(i<0)return;tabs.splice(i,1);siteControls?.closed(id);if(!tabs.length)newTab();else if(active===id)activate(tabs[Math.min(i,tabs.length-1)].id);else drawTabs();await retire(record);}
function activate(id){active=id;const t=selected();$('#address').value=t.url;$('#destination').textContent=t.url;for(const selector of ['#newtab','#internal','#error-page'])$(selector).hidden=true;
 for(const record of records.values()){record.frame.hidden=true;record.frame.removeAttribute('id');}const record=records.get(id);if(record)record.frame.id='engine';
 if(t.url==='browzen://newtab'){$('#newtab').hidden=false;$('#address').value='';}
 else if(t.url.startsWith('browzen://'))renderInternal(t.url);
 else if(t.error){showError(t.error);}
 else {if(record)record.frame.hidden=false;command('activate',{id});}
 siteControls?.sync();
 $('#noscript').checked=!!t.noScript;$('#loading').hidden=!t.loading;drawTabs();}
async function authenticate(){
 if(!window.puter?.net?.fetch)throw Error('Puter SDK has not loaded. Check your connection and reload.');
 if(!puter.auth.isSignedIn()){showGate();throw Error('Login with Puter to continue.');}
}
async function navigate(value,t=selected(),{form}={}){
 try {
 const url=new URLSearchParams(location.search).has('test')&&/^https:\/\/browzen\.test\/(probe|actions|child)\.html(?:[?#].*)?$/.test(value)?value:addressToURL(value,engines[searchEngine][2]);if(url.startsWith('browzen://')){t.url=url;t.title=url.includes('settings')?'Settings':url.includes('about')?'About Browzen':'New Tab';t.error=null;activate(t.id);return;}
 if(WEB_BROWSING_SUSPENDED&&!(new URLSearchParams(location.search).has('test')&&url.startsWith('https://browzen.test/')))throw Error(WEB_SAFETY_NOTICE);
 await authenticate();t.url=url;t.title=new URL(url).hostname;t.error=null;t.loading=true;if(t.id===active){activate(t.id);status('Preparing this tab…');}else drawTabs();
 await ensureEngine(t);if(t.id===active)activate(t.id);
 const record=records.get(t.id);record.opener=t.opener;command('navigate',{id:t.id,url,form,opener:t.opener,noScript:!!t.noScript,zoom,level:securityLevel});
 }catch(error){t.loading=false;t.error=error.message||String(error);if(t.id===active)showError(t.error);drawTabs();}
}
function showError(message){$('#newtab').hidden=true;if($('#engine'))$('#engine').hidden=true;$('#internal').hidden=true;$('#error-page').hidden=false;$('#error-message').textContent=message;$('#loading').hidden=true;status(message);}
async function puterFetch(data,record){
 if(new URLSearchParams(location.search).has('test')&&/^https:\/\/browzen\.test\/((probe|actions|child)\.html|worker\.js|shared\.js)(?:[?#].*)?$/.test(data.url)){
  const r=await fetch('/asset/test-fixtures/'+new URL(data.url).pathname.slice(1));let body=await r.arrayBuffer();if(new URL(data.url).pathname==='/child.html'){const echo=JSON.stringify({method:data.method||'GET',query:new URL(data.url).search,body:data.body?new TextDecoder().decode(data.body):''}).replaceAll('&','&amp;').replaceAll('<','&lt;');body=new TextEncoder().encode(new TextDecoder().decode(body)+'<pre id="form-received">'+echo+'</pre>').buffer;}return {status:r.status,statusText:r.statusText,headers:{'content-type':r.headers.get('content-type')},body};
 }
 if(WEB_BROWSING_SUSPENDED)throw Error(WEB_SAFETY_NOTICE);
 await authenticate();
 const remote=validateRemote(data.url);const headers={...data.headers};
 // Never copy the Puter account token or this application's own headers.
 for(const k of Object.keys(headers))if(['proxy-authorization','content-length','connection','accept-encoding'].includes(k.toLowerCase()))delete headers[k];
 for(const k of Object.keys(headers))if(k.toLowerCase().startsWith('sec-ch-'))delete headers[k];
 headers['Accept-Language']='en-US,en;q=0.9';headers['User-Agent']=navigator.userAgent;headers['DNT']='1';headers['Sec-GPC']='1';
 requests++;
 const method=data.method||'GET';let res;
 for(let attempt=0;;attempt++){
  try{res=await puter.net.fetch(remote.href,{method,headers,body:data.body??undefined,redirect:'manual',credentials:'omit',signal:record?AbortSignal.any([record.abort.signal,AbortSignal.timeout(60000)]):AbortSignal.timeout(60000)});break;}
  catch(error){if(attempt>=2||!['GET','HEAD'].includes(method.toUpperCase())||record?.abort.signal.aborted||!/channel closed|connection reset|network error/i.test(error.message||''))throw error;}
 }
 const raw={};for(const [k,v] of res.headers)raw[k]=v;
 if(typeof res.headers.getSetCookie==='function'){const cookies=res.headers.getSetCookie();if(cookies.length)raw['set-cookie']=cookies;}
 for(const k of Object.keys(raw))if(['link','refresh','nel','report-to'].includes(k.toLowerCase()))delete raw[k];
 let body=await res.arrayBuffer();if(body.byteLength>48*1024*1024)throw Error('A resource exceeded the local prototype 48 MB limit.');
 if((res.headers.get('content-type')||'').includes('text/html')){
  // Defense in depth for static hints; runtime hooks handle ordinary dynamic hints.
  const html=new TextDecoder().decode(body).replace(/<link\b[^>]*>/gi,tag=>/\brel\s*=\s*["']?[^>]*\b(dns-prefetch|preconnect|prerender|prefetch)\b/i.test(tag)?'':tag);
  body=new TextEncoder().encode(html).buffer;
 }
 return {status:res.status,statusText:res.statusText,headers:raw,body};
}
function transportMessage(e,record){const d=e.data;if(!d||!e.ports[0])return;const port=e.ports[0];
 if(d.type==='site-action'){siteControls.handle(record,d).then(result=>port.postMessage({ok:true,result})).catch(error=>port.postMessage({ok:false,error:error.message,name:error.name})).finally(()=>port.close());return;}
 if(d.type!=='request')return;
 puterFetch(d,record).then(result=>{if(!record.retired)port.postMessage({ok:true,result},[result.body]);}).catch(error=>{if(!record.retired){port.postMessage({ok:false,error:error.message||String(error)});status('Could not load a website resource: '+(error.message||error));}}).finally(()=>port.close());}
window.addEventListener('message',e=>{
 const record=[...records.values()].find(r=>r.origin===e.origin&&r.frame.contentWindow===e.source);if(!record||e.data?.type!=='engine-ready'||record.port)return;
 const pair=new MessageChannel();record.port=pair.port1;record.port.onmessage=e=>{if(record.retired){e.ports[0]?.postMessage({ok:false,error:'Website session closed.'});return;}transportMessage(e,record);};record.port.start();record.frame.contentWindow.postMessage({type:'connect-browzen'},record.origin,[pair.port2]);clearTimeout(record.timer);record.resolve(record);
});
window.addEventListener('message',e=>{
 const record=[...records.values()].find(r=>r.origin===e.origin&&r.frame.contentWindow===e.source);if(!record)return;
 const d=e.data;if(d?.type==='cleanup-result'){record.cleanupResolve?.(!!d.clean);return;}if(d?.type==='engine-error'){showError(d.error);return;}
 if(d?.id!==record.id)return;
 if(d.type==='site-document'){siteControls.document(record,d);return;}
 if(d.type==='site-action-error'){status(d.error);return;}
 const t=tabs.find(t=>t.id===d?.id);if(!t)return;
 if(d.type==='tab-update'){if(d.url)t.url=d.url;if(d.title)t.title=d.title;t.loading=!!d.loading;if(t.id===active){$('#address').value=t.url;$('#destination').textContent=t.url;$('#loading').hidden=!t.loading;status(t.loading?'Loading '+t.url:'');}drawTabs();}
});
async function checkIP(){const b=$('#check-ip');b.disabled=true;$('#egress').textContent='Checking…';
 if(WEB_BROWSING_SUSPENDED){$('#egress').textContent='Browsing paused';$('#egress-time').textContent='A connection IP does not establish WebRTC protection.';return;}
 try{await authenticate();const r=await puter.net.fetch('https://ifconfig.me/ip');if(!r.ok)throw Error('IP check returned HTTP '+r.status);const value=(await r.text()).trim();if(!/^[0-9a-fA-F:.]{3,64}$/.test(value))throw Error('IP service did not return a plain IP address.');egress=value;$('#egress').textContent=value;$('#egress-time').textContent='Observed '+new Date().toLocaleTimeString()+'. Other requests may use another exit.';}
 catch(e){$('#egress').textContent='Unavailable';$('#egress-time').textContent=e.message;}finally{b.disabled=false;}}
// All engine logos are local files, including the initial home selector.
for(const old of document.querySelectorAll('span.engine-mark')){const img=document.createElement('img');img.className='engine-mark';img.src='/asset/assets/search/duckduckgo.ico';img.alt='DuckDuckGo';old.replaceWith(img);}
document.querySelectorAll('.engine-mark').forEach(img=>{img.src='/asset/assets/search/duckduckgo.ico';img.alt='DuckDuckGo';});
for(const menu of document.querySelectorAll('.engine-menu'))engines.forEach(([name,file],i)=>{const b=document.createElement('button');b.type='button';const img=document.createElement('img');img.src='/asset/assets/search/'+file;img.alt='';img.width=18;img.height=18;b.append(img,document.createTextNode(name));b.onclick=()=>{searchEngine=i;document.querySelectorAll('.engine-mark').forEach(x=>{x.src='/asset/assets/search/'+file;x.alt=name;});document.querySelectorAll('.engines').forEach(d=>d.open=false);};menu.append(b);});
$('#address-form').onsubmit=e=>{e.preventDefault();navigate($('#address').value);};$('#search-form').onsubmit=e=>{e.preventDefault();navigate($('#search').value);};$('#address').onclick=()=>$('#address').select();
$('#new-tab').onclick=()=>{newTab();$('#address').focus();};$('#home').onclick=()=>navigate('browzen://newtab');$('#back').onclick=()=>command('back',{id:active});$('#forward').onclick=()=>command('forward',{id:active});$('#reload').onclick=()=>refreshTab();
$('#control').onclick=()=>{$('#panel').togglePopover();$('#control').setAttribute('aria-expanded',String($('#panel').matches(':popover-open')));};$('#close-panel').onclick=()=>$('#panel').hidePopover();$('#menu').onclick=()=>$('#browser-menu').togglePopover();$('#check-ip').onclick=checkIP;
$('#noscript').onchange=e=>{selected().noScript=e.target.checked;command('scripts',{id:active,noScript:e.target.checked});};$('#retry').onclick=()=>navigate(selected().url);
document.addEventListener('click',e=>{const link=e.target.closest('[data-page],[data-open]');if(!link)return;if(link.dataset.open)navigate(link.dataset.open);else navigate('browzen://'+({home:'newtab'}[link.dataset.page]||link.dataset.page));if($('#browser-menu').matches(':popover-open'))$('#browser-menu').hidePopover();});
document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.key==='l'){e.preventDefault();$('#address').focus();$('#address').select();}});
function showGate(message='Use your Puter account to continue.') {authenticated=false;$('#auth-gate').hidden=false;$('#chrome').inert=true;$('#viewport').inert=true;$('#sign-in-status').textContent=message;}
function unlock(){authenticated=true;$('#auth-gate').hidden=true;$('#chrome').inert=false;$('#viewport').inert=false;status('');$('#address').focus();checkIP();}
$('#sign-in').onclick=async()=>{const b=$('#sign-in');b.disabled=true;try{await puter.auth.signIn({attempt_temp_user_creation:false});unlock();}catch(error){showGate(error.message||error.msg||'Sign-in was not completed. Try again.');}finally{b.disabled=false;}};
const setupStarted=Date.now();function checkAuth(){if(window.puter?.auth){puter.auth.isSignedIn()?unlock():showGate();$('#sign-in').disabled=false;}else if(Date.now()-setupStarted<20000)setTimeout(checkAuth,200);else showGate('Puter could not load. Check your connection and reload.');}
const connectionSection=$('#panel .panel-grid section');connectionSection.querySelector('.badge')?.remove();
const requestNumber=connectionSection.querySelector('#request-count');requestNumber?.previousElementSibling?.remove();requestNumber?.remove();
const permissionSection=$('#panel .panel-grid section+section');permissionSection.querySelectorAll('.permission').forEach(row=>row.remove());
for(const [kind,name]of Object.entries(permissionNames)){if(kind==='popups')continue;const row=document.createElement('div');row.className='permission';const label=document.createElement('label');label.textContent=name;label.htmlFor='allow-'+kind;const input=document.createElement('input');input.type='checkbox';input.role='switch';input.id='allow-'+kind;input.onchange=async()=>{const record=records.get(active);if(!record?.mainScope){input.checked=false;status('Open a website before changing its permissions.');return;}if(!input.checked){siteControls.revoke(record,[kind]);return;}input.checked=false;try{await siteControls.allowFromPanel(record,[kind]);}catch(e){status(e.message);}siteControls.sync();};row.append(label,input);permissionSection.append(row);}
const identityButton=document.createElement('button');identityButton.textContent='Refresh Identity';identityButton.onclick=()=>refreshIdentity();$('#browser-menu').append(identityButton);
$('#panel').addEventListener('toggle',e=>$('#control').setAttribute('aria-expanded',String(e.newState==='open')));
identityButton.addEventListener('click',()=>$('#browser-menu').hidePopover());
async function retire(record){if(!record)return true;if(record.cleanup)return record.cleanup;record.retired=true;siteControls?.cancel(record);record.abort.abort();record.frame.hidden=true;record.cleanup=(async()=>{let timer;const clean=await new Promise(resolve=>{record.cleanupResolve=resolve;record.port?.postMessage({type:'clear'});timer=setTimeout(()=>resolve(false),6500);});clearTimeout(timer);record.port?.close();record.frame.remove();records.delete(record.id);return clean;})();return record.cleanup;}
async function refreshTab(){const t=selected();if(t.url.startsWith('browzen://')){activate(t.id);return;}const clean=await retire(records.get(t.id));if(!clean)lastCleanup='A retired website storage deletion is pending. Its old origin is not reused.';await navigate(t.url,t);}
async function refreshIdentity(){status('Clearing website sessions…');const outcomes=await Promise.all([...records.values()].map(retire));tabs.splice(0);noScript=false;$('#noscript').checked=false;newTab();lastCleanup=outcomes.every(Boolean)?'Website storage cleared. Puter remains signed in.':'Old website origins were retired. Some storage deletion is pending.';status(outcomes.every(Boolean)?'':lastCleanup);checkIP();$('#address').focus();}
async function renderInternal(url){
 const box=$('#internal');box.hidden=false;box.replaceChildren();
 if(!document.querySelector('#product-pages-style')){const link=document.createElement('link');link.id='product-pages-style';link.rel='stylesheet';link.href='/asset/product-pages.css';document.head.append(link);}
 if(url.includes('settings')){
  const html=await(await fetch('/asset/settings.html')).text();if(selected().url!==url)return;const doc=new DOMParser().parseFromString(html,'text/html');box.append(document.importNode(doc.querySelector('.settings-layout'),true));box.classList.add('product-settings');
  box.querySelectorAll('img').forEach(img=>img.src='/asset/logo.svg');
  const securityNotes=['Website scripts enabled. Separate website origins and permission controls stay active.','Scripts are blocked on unencrypted HTTP websites.','All website scripts blocked. Some websites will not work.'];
  box.querySelectorAll('.security-choice').forEach((b,i)=>{b.querySelector('span:not(.level-symbol)').textContent=securityNotes[i];b.classList.toggle('active',b.dataset.value===securityLevel);b.onclick=()=>{securityLevel=b.dataset.value;for(const t of tabs)if(!t.url.startsWith('browzen://'))command('security',{id:t.id,level:securityLevel});renderInternal(url);};});
  box.querySelector('#security .subtle-badge').textContent='Applies immediately';
  const conn=box.querySelector('#connection');conn.querySelector('h2').textContent='Puter & connection';conn.querySelector('.section-heading p').textContent='Your website connection, in one place.';conn.querySelector('#tor-state').textContent='Puter';
  const rows=conn.querySelectorAll('.settings-row');rows[0].querySelector('strong').textContent='Connection IP';rows[0].querySelector('p').textContent='Check the network exit observed for a Puter request.';rows[0].querySelector('button').textContent='View connection';rows[1].remove();
  box.querySelector('#session .section-heading p').textContent='Separate website sessions for each tab.';box.querySelector('#session .settings-row strong').textContent='Refresh Identity';box.querySelector('#session .settings-row p').textContent='Closes website tabs and clears their cookies, storage and caches. Your Puter sign-in stays available.';box.querySelector('.settings-details p').textContent=lastCleanup+' The outer browser and operating system can retain other records; this is not secure erasure.';
  box.querySelectorAll('[data-action]').forEach(b=>{const action=b.dataset.action;if(action==='theme'){b.classList.toggle('active',document.body.classList.contains('light')===(b.dataset.value==='light'));b.onclick=()=>{document.body.classList.toggle('light',b.dataset.value==='light');document.documentElement.dataset.theme=b.dataset.value;renderInternal(url);};}else if(action==='newidentity'){b.textContent='Refresh Identity';b.onclick=()=>refreshIdentity();}else if(action==='control'||action==='connection')b.onclick=()=>{$('#panel').showPopover();checkIP();};});
  box.querySelector('.settings-nav a[href="#connection"]').textContent='Puter & connection';
  const extra=document.createElement('div');extra.className='settings-row';extra.innerHTML='<label for="motion">Reduce motion</label><input id="motion" type="checkbox" role="switch">';box.querySelector('#general').append(extra);$('#motion').checked=document.body.classList.contains('reduce-motion');$('#motion').onchange=e=>document.body.classList.toggle('reduce-motion',e.target.checked);
  const zoomRow=document.createElement('div');zoomRow.className='settings-row';zoomRow.innerHTML='<label for="zoom">Default zoom</label><select id="zoom"><option>80%</option><option>90%</option><option>100%</option><option>110%</option><option>125%</option></select>';box.querySelector('#general').append(zoomRow);$('#zoom').value=zoom+'%';$('#zoom').onchange=e=>{zoom=parseInt(e.target.value);command('zoom',{zoom});};
 }else{
  box.classList.remove('product-settings');box.innerHTML='<div class="about-hero"><img src="/asset/logo.svg" alt="Browzen"><div><h1>Browzen</h1><p>Beyond the surface. In control.</p></div></div><section class="card"><h2>Your browser. Your own space.</h2><p>Browzen brings a familiar browsing experience to the web: a clean workspace, independent tabs, clear site controls and a connection you can inspect.</p></section><section class="card"><h2>Why we built Browzen</h2><p>We wanted browsing to feel simple without hiding the controls that matter. Browzen keeps your pages, search engines, permissions and connection information together in one consistent interface.</p><h2>What makes Browzen different?</h2><p>Start from the Browzen home, browse in separate website environments and keep control over active content. Local search-engine icons, a unified address bar, NoScript and temporary site permissions make the experience familiar wherever you open it.</p></section><section class="card"><h2>A connection powered by Puter</h2><p>Sign in through Puter to deliver website requests using its networking service. Control Panel shows the IP observed for a connection check. Browzen does not ask for or store your Puter password.</p><h2>Privacy in your hands</h2><p>Website tabs use separate browser origins. Camera, microphone and location requests start blocked and can be enabled individually. Refresh Identity closes website sessions and requests deletion of their browsing data without signing you out of Puter.</p><p>No browser makes you unidentifiable. Your outer browser, account logins, websites and information you share remain relevant. More details and current compatibility limits are documented with the project.</p></section><section class="card"><h2>Responsible use</h2><p>Use Browzen in compliance with applicable laws and third-party rights. You are responsible for your activity. Provided as is, without warranties. To the maximum extent permitted by law, NXLabTW and contributors are not liable for loss, damage or claims arising from its use.</p></section><section class="card"><h2>Made by NXLabTW</h2><p>Browzen is independently developed by NXLabTW. Its web connectivity uses Puter and its content layer uses third-party components with their own licenses.</p><div class="controls"><a href="https://nxlabtw.com" target="_blank" rel="noopener noreferrer">NXLabTW</a><a href="https://github.com/NeuralNexusLab-nh/Browzen" target="_blank" rel="noopener noreferrer">GitHub</a></div></section>';
 }
 box.querySelectorAll('a[href^="browzen://"]').forEach(a=>a.onclick=e=>{e.preventDefault();navigate(a.getAttribute('href'));});
 box.querySelectorAll('a[href^="https://"]').forEach(a=>a.onclick=e=>{e.preventDefault();navigate(a.getAttribute('href'));});
}
// Standard viewport buckets reduce size variation without inventing screen/CPU values.
new ResizeObserver(()=>{for(const record of records.values())layoutFrame(record);}).observe($('#viewport'));
function layoutFrame(record){const area=$('#viewport').getBoundingClientRect();record.frame.style.width=Math.max(200,Math.floor(area.width/200)*200)+'px';record.frame.style.height=Math.max(100,Math.floor(area.height/100)*100)+'px';record.frame.style.left='50%';record.frame.style.top='50%';record.frame.style.transform='translate(-50%,-50%)';}
siteControls=createSiteControls({records,active:()=>active,newTab,activate,closeTab,navigate,command,status,validateRemote,testMode:new URLSearchParams(location.search).has('test')});
newTab();showGate('Preparing secure sign-in…');$('#sign-in').disabled=true;checkAuth();
