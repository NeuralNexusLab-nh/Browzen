import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';
import {rewriteJS} from './compiler.js';
test('function receiver mediation maps only the native global, preserving methods, classes and strict this',()=>{
 const context=vm.createContext({});const actual=vm.runInContext('this',context),virtual={location:{href:'https://site.example/'}};
 context.__bzn={window:virtual,receiver:value=>value===actual?virtual:value};
 const source='[(function(){return this})()===__bzn.window,(function(){"use strict";return this})(),({value:7,get(){return this.value}}).get(),new(class{value=8;get(){return this.value}})().get()]';
 const output=rewriteJS(source,'https://site.example/',false,{mediateReceivers:true});
 assert.deepEqual(Array.from(vm.runInContext(output.source,context)),[true,undefined,7,8]);
 assert.equal(rewriteJS('function f(){return this}', 'https://site.example/').source,'function f(){return this}');
 assert.equal(rewriteJS('this', 'https://site.example/',true,{mediateReceivers:true}).source,'this');
});
