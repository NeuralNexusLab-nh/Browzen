import test from 'node:test';import assert from 'node:assert/strict';
import {installFrames} from './frame-content.js';

test('blank intrinsics, clones, named frames, message ports and one load event remain compatible',()=>{
 const keys=['Node','HTMLIFrameElement','window','document','requestAnimationFrame','setInterval'];
 const saved=Object.fromEntries(keys.map(k=>[k,globalThis[k]]));
 class FakeNode extends EventTarget {
  attributes=new Map();style={};isConnected=true;id='';
  setAttribute(k,v){this.attributes.set(k,String(v));}getAttribute(k){return this.attributes.get(k)??null;}
  cloneNode(){const copy=new FakeNode();copy.attributes=new Map(this.attributes);return copy;}
 }
 class FakeIframe extends FakeNode{}
 const nodes=[],queue=[],sent=[],events=[];
 Object.assign(globalThis,{Node:FakeNode,HTMLIFrameElement:FakeIframe,window:new EventTarget(),document:{querySelectorAll:()=>nodes},requestAnimationFrame:f=>queue.push(f),setInterval:()=>0});
 try{
  const native={set:FakeNode.prototype.setAttribute,dispatch:EventTarget.prototype.dispatchEvent,add:EventTarget.prototype.addEventListener};
  const frames=installFrames({native,rpc:async()=>{},send:(...args)=>sent.push(args),current:()=>({url:'https://parent.example/'}),remote:v=>new URL(v,'https://parent.example/').href,dispatch:e=>events.push(e)});
  const blank=frames.create(document,'iframe',[],()=>new FakeNode());nodes.push(blank);
  assert.equal(blank.contentWindow.JSON.parse('{"valid":true}').valid,true);
  assert.equal(typeof blank.contentWindow.Object.getOwnPropertyNames,'function');
  assert.equal(typeof blank.contentWindow.Function,'function');
  assert.equal(blank.contentWindow.document.URL,'about:blank');
  assert.equal(blank.contentWindow.RTCPeerConnection,undefined);
  assert.equal(blank instanceof FakeIframe,true);
  const clone=blank.cloneNode();assert.equal(clone instanceof FakeIframe,true);assert.notEqual(clone.contentWindow,blank.contentWindow);
  blank.name='anchor';assert.equal(frames.lookup('anchor'),blank.contentWindow);assert.equal(frames.lookup('0'),blank.contentWindow);
  assert.equal(frames.attribute(blank,'height','78'),true);assert.equal(blank.style.height,'78px');assert.equal(blank.getAttribute('height'),'78');
  let loads=0;blank.addEventListener('load',()=>loads++);frames.scan();queue.shift()();frames.scan();queue.shift()();assert.equal(loads,1);
  const pair=new MessageChannel();
  try{
   blank.contentWindow.postMessage('hello','https://child.example',[pair.port1]);
   assert.equal(sent.at(-1)[1].ports[0],pair.port1);assert.equal(sent.at(-1)[2][0],pair.port1);
   frames.message({source:'f1',origin:'https://child.example',data:'reply',ports:[pair.port2]});
   assert.equal(events[0].source,blank.contentWindow);assert.equal(events[0].ports[0],pair.port2);
   frames.parent.frames.anchor.postMessage('sibling','https://child.example');
   assert.equal(sent.at(-1)[1].destination,'sibling:anchor');
  }finally{pair.port1.close();pair.port2.close();}
  blank.src='https://other.example/';assert.throws(()=>blank.contentWindow.JSON,/Cross-origin/);assert.throws(()=>blank.contentWindow.document,/Cross-origin/);
 }finally{Object.assign(globalThis,saved);}
});
