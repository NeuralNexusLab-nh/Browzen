import test from 'node:test';import assert from 'node:assert/strict';
import {windowFacade} from './window-value.js';
test('experimental virtual windows preserve the native Window prototype without a new realm',()=>{
 class TestWindow{}const real=Object.assign(new TestWindow(),{location:{href:'about:srcdoc'},locked:'value'});
 Object.defineProperty(real,'locked',{value:'value',writable:false,configurable:false});
 const virtual=windowFacade(real,key=>key==='location'?{handled:true,value:{href:'https://site.example/'}}:{handled:false},()=>false,{nativePrototype:true});
 assert.equal(virtual instanceof TestWindow,true);assert.equal(Object.getPrototypeOf(virtual),TestWindow.prototype);
 assert.equal(virtual.location.href,'https://site.example/');assert.equal(virtual.locked,'value');
 assert.equal(Object.getPrototypeOf(windowFacade(real,()=>({handled:false}),()=>false)),null);
});
