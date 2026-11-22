import test from 'node:test';import assert from 'node:assert/strict';import {projectFrameMessage}from'./frame-messages.js';
test('native message projection authenticates parent and document epoch without assigning isTrusted',()=>{
 const parent={},child={},options={trustedParent:parent,scope:'current-epoch',sourceFor:key=>key==='f1'?child:null};
 function event(source=parent,channel='current-epoch'){
  const e=new Event('message');Object.defineProperties(e,{source:{configurable:true,value:source},origin:{configurable:true,value:'null'},data:{configurable:true,value:{type:'browzen-frame-message',channel,source:'f1',origin:'https://child.example',data:{ok:true}}}});return e;
 }
 const good=event(),trusted=good.isTrusted;assert.equal(projectFrameMessage(good,options),true);assert.equal(good.isTrusted,trusted);assert.equal(good.source,child);assert.equal(good.origin,'https://child.example');assert.deepEqual(good.data,{ok:true});
 for(const denied of [event({},'current-epoch'),event(parent,'stale-epoch')]){assert.equal(projectFrameMessage(denied,options),false);assert.equal(denied.origin,'null');assert.equal(denied.data.type,'browzen-frame-message');}
 assert.equal(projectFrameMessage(event(),{...options,sourceFor:()=>null}),false);
 assert.equal(projectFrameMessage(event(),{...options,scope:undefined}),false);
});
