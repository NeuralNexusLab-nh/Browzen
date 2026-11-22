import test from 'node:test';import assert from 'node:assert/strict';
import {createOpaqueHost} from './frame-host.js';import {validateRemote} from '../url-policy.js';
test('mediated child broker enforces origin, embed policy, private-address rejection and cleanup',async()=>{
 const saved={document:globalThis.document,fetch:globalThis.fetch,getComputedStyle:globalThis.getComputedStyle};
 const frames=[],calls=[],events=[];let rpcID=0;
 function makeFrame(){const attributes=new Map(),pending=new Map();let resolveDocument,child;
  const f={style:{},isConnected:true,parentElement:{append(){}},setAttribute(k,v){attributes.set(k,v);},getBoundingClientRect(){return {left:0,top:0,right:800,bottom:600,width:800,height:600};},
   remove(){this.isConnected=false;},
   document:new Promise(r=>resolveDocument=r),messages:[],contentWindow:{postMessage(d,origin,ports){if(d.type==='browzen-frame-message'){f.messages.push(d);return;}child=ports[0];f.child=child;child.onmessage=e=>{f.messages.push(e.data);if(e.data.type==='document')resolveDocument(e.data);if(e.data.rpc){pending.get(e.data.rpc)?.(e.data);pending.delete(e.data.rpc);}};child.start();child.postMessage({type:'ready'});}},
   set srcdoc(value){this.html=value;if(value)queueMicrotask(()=>this.onload?.());},
   rpc(type,data={}){return new Promise((resolve,reject)=>{const id=++rpcID,timer=setTimeout(()=>reject(Error('Test reply timed out.')),2000);pending.set(id,d=>{clearTimeout(timer);resolve(d);});child.postMessage({type,rpc:id,...data});});},
  };frames.push(f);return f;
 }
 globalThis.document={createElement(tag){if(tag==='iframe')return makeFrame();return {innerHTML:'',content:{querySelector:()=>null,querySelectorAll:()=>[]}};}};
 globalThis.getComputedStyle=()=>({display:'block'});globalThis.fetch=async()=>new Response('// test bootstrap');
 const root=makeFrame(),host=createOpaqueHost({record:{id:'root',frame:root},validate:validateRemote,transport:async d=>{calls.push(d.url);return {status:200,headers:{'content-type':'text/html',...(d.url.includes('/denied')?{'x-frame-options':'DENY'}:{})},body:new TextEncoder().encode('<p>Fixture</p>').buffer};},siteAction:async()=>{},emit:e=>events.push(e)});
 try{
  await host.command({type:'navigate',url:'https://parent.example/'});await root.document;
  assert.match(root.html,/connect-src 'none'/);assert.match(root.html,/frame-src 'none'/);
  assert.match((await root.rpc('frame-open',{frameId:'bad',url:'https://child.example/'})).error.message,/frame ID/);
  const before=calls.length;assert.match((await root.rpc('frame-open',{frameId:'f1',url:'http://127.0.0.1/'})).error.message,/Local|Private|reserved/);assert.equal(calls.length,before);
  assert.equal((await root.rpc('frame-open',{frameId:'f1',url:'https://child.example/',frameName:'anchor'})).result.created,true);
  const child=frames[1];await child.document;assert.equal(child.sandbox,'allow-scripts allow-forms');
  root.child.postMessage({type:'frame-layout',frameId:'f1',rect:{x:10,y:20,width:0,height:0},clip:{x:10,y:20,width:0,height:0},visible:true});
  await root.rpc('cookie-store',{op:'get'});
  assert.equal(child.style.display,'block','Zero-sized initial frames must not be display:none, which stalls animation scheduling');
  assert.equal(child.style.pointerEvents,'none');assert.equal(child.style.clipPath,'inset(50%)');
  root.child.postMessage({type:'frame-layout',frameId:'f1',rect:{x:10,y:20,width:300,height:150},clip:{x:10,y:20,width:300,height:150},visible:false});
  await root.rpc('cookie-store',{op:'get'});assert.equal(child.style.pointerEvents,'none');assert.equal(child.style.clipPath,'inset(50%)','A hidden placeholder cannot expose its child overlay');
  root.child.postMessage({type:'frame-layout',frameId:'f1',rect:{x:10,y:20,width:300,height:150},clip:{x:10,y:20,width:300,height:150},visible:true});
  await root.rpc('cookie-store',{op:'get'});assert.equal(child.style.pointerEvents,'auto');
  root.child.postMessage({type:'frame-message',destination:'f1',targetOrigin:'https://wrong.example',data:'must not arrive'});
  await root.rpc('cookie-store',{op:'get'});assert.equal(child.messages.some(m=>m.data==='must not arrive'),false);
  root.child.postMessage({type:'frame-message',destination:'f1',targetOrigin:'https://child.example',data:'hello'});
  await root.rpc('cookie-store',{op:'get'});await child.rpc('cookie-store',{op:'get'});
  assert.ok(child.messages.some(m=>m.type==='browzen-frame-message'&&m.origin==='https://parent.example'&&m.data==='hello'));
  child.child.postMessage({type:'frame-message',destination:'parent',targetOrigin:'https://parent.example',data:'reply'});
  await child.rpc('cookie-store',{op:'get'});await root.rpc('cookie-store',{op:'get'});
  assert.ok(root.messages.some(m=>m.type==='browzen-frame-message'&&m.origin==='https://child.example'&&m.data==='reply'));
  await root.rpc('frame-open',{frameId:'f2',url:'https://child.example/challenge',frameName:'challenge'});const sibling=frames[2];await sibling.document;
  const pair=new MessageChannel();
  try{
   sibling.child.postMessage({type:'frame-message',destination:'sibling:anchor',targetOrigin:'https://child.example',data:'sibling hello',ports:[pair.port1]},[pair.port1]);
   await sibling.rpc('cookie-store',{op:'get'});await child.rpc('cookie-store',{op:'get'});
   const delivered=child.messages.find(m=>m.type==='browzen-frame-message'&&m.data==='sibling hello');
   assert.equal(delivered.source,'sibling:challenge');assert.equal(delivered.origin,'https://child.example');assert.equal(delivered.ports.length,1);
   const pong=new Promise(resolve=>pair.port2.once('message',resolve));delivered.ports[0].postMessage('port round trip');assert.equal(await pong,'port round trip');delivered.ports[0].close();
  }finally{pair.port2.close();}
  await root.rpc('frame-open',{frameId:'f3',url:'https://child.example/denied'});
  assert.ok(frames[3].html===undefined,'Denied child must not receive a bootstrap document');
  root.child.postMessage({type:'frame-remove',frameId:'f1'});await root.rpc('cookie-store',{op:'get'});assert.equal(child.isConnected,false);
  host.destroy();assert.ok(frames.slice(1).every(f=>!f.isConnected));
 }finally{host.destroy();for(const f of frames)f.child?.close();Object.assign(globalThis,saved);}
});
