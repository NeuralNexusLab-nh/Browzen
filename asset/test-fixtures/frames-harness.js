import {createOpaqueHost} from '../single/frame-host.js';
import {validateRemote} from '../url-policy.js';
const log=document.querySelector('#result'),viewport=document.querySelector('#viewport');let host;
const encode=source=>new TextEncoder().encode(source).buffer;
const fixtures={
 'https://worker.example/':`<h2>Worker isolation test</h2><p id="worker-result">Starting worker</p><script>const source="postMessage({ready:true,timezone:new Date().getTimezoneOffset(),language:navigator.language});onmessage=function(event){const request=new XMLHttpRequest();request.open('GET','https://example.com/native-worker-must-be-blocked');request.onerror=function(){postMessage({blocked:true,echo:event.data});};request.onload=function(){postMessage({blocked:false});};request.send();};";const worker=new Worker(URL.createObjectURL(new Blob([source],{type:'text/javascript'})));worker.onmessage=function(event){document.getElementById('worker-result').textContent=JSON.stringify(event.data);if(event.data.ready)worker.postMessage('message round-trip');};worker.onerror=function(event){document.getElementById('worker-result').textContent='Worker error: '+event.message;};<\/script>`,
 'https://parent.example/':`<h2>Parent document</h2><p id="message">Waiting for child</p><iframe id="child" src="https://child.example/" width="400" height="220"></iframe><script>window.addEventListener('message',e=>{if(e.origin==='https://child.example'){document.getElementById('message').textContent='Received: '+e.data; e.source.postMessage('parent reply','https://child.example');}});<\/script>`,
 'https://child.example/':`<h3>Isolated child</h3><button id="send">Send message to parent</button><p id="reply">No reply</p><script>document.getElementById('send').onclick=()=>parent.postMessage('child hello','https://parent.example');window.addEventListener('message',e=>document.getElementById('reply').textContent='Received: '+e.data);<\/script>`,
 'https://captcha.example/':`<h2>Google official test key (not production verification)</h2><p id="verification">Waiting for widget</p><script>window.verified=function(token){document.getElementById('verification').textContent=token?'Official test callback received':'Empty test response';};<\/script><div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" data-callback="verified"></div><script src="https://www.google.com/recaptcha/api.js" async defer><\/script>`,
 'https://turnstile.example/':`<h2>Cloudflare official test widget</h2><p id="verification">Waiting for widget</p><script>window.verified=function(token){document.getElementById('verification').textContent=token?'Official test callback received':'Empty test response';};window.failed=function(code){document.getElementById('verification').textContent='Turnstile error: '+code;};<\/script><div class="cf-turnstile" data-sitekey="1x00000000000000000000AA" data-callback="verified" data-error-callback="failed"></div><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer><\/script>`,
};
async function transport(data){
 if(fixtures[data.url])return {status:200,headers:{'content-type':'text/html'},body:encode(fixtures[data.url])};
 if(!puter.auth.isSignedIn())throw Error('Sign in to Puter to test external widgets.');
 const headers={...data.headers,'User-Agent':navigator.userAgent.replace(/\s+Browzen(?:\/[^\s]+)?$/,'')+' Browzen','Accept-Language':'en-US,en;q=0.9','DNT':'1','Sec-GPC':'1'};
 const r=await puter.net.fetch(data.url,{method:data.method,headers,body:data.body,redirect:'manual',credentials:'omit'});
 return {status:r.status,statusText:r.statusText,headers:Object.fromEntries(r.headers),body:await r.arrayBuffer()};
}
async function run(url){
 host?.destroy();viewport.replaceChildren();
 const frame=document.createElement('iframe');frame.className='content-engine';frame.sandbox='allow-scripts allow-forms';viewport.append(frame);
 log.textContent='Loading '+url;
 host=createOpaqueHost({record:{id:'test',frame,abort:new AbortController()},debug:true,transport,validate:validateRemote,siteAction:async()=>({allowed:false}),emit:e=>{if(e.type==='engine-error')log.textContent='Error: '+e.error;if(e.type==='tab-update'&&e.loading===false)log.textContent='Rendered '+url+' — inspect widget result below.';}});
 await host.command({type:'navigate',url});
}
document.querySelector('#local').onclick=()=>run('https://parent.example/');
document.querySelector('#worker').onclick=()=>run('https://worker.example/');
document.querySelector('#google').onclick=()=>run('https://www.google.com/recaptcha/api2/demo');
document.querySelector('#google-test').onclick=()=>run('https://captcha.example/');
document.querySelector('#cloudflare').onclick=()=>run('https://turnstile.example/');
document.querySelector('#cloudflare-demo').onclick=()=>run('https://demo.turnstile.workers.dev/');
document.querySelector('#login').onclick=()=>puter.auth.signIn();
document.querySelector('#target-open').onclick=()=>run(document.querySelector('#target-url').value);
