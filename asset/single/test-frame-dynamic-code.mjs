import test from 'node:test';import assert from 'node:assert/strict';
import {mediatedFunction} from './frame-dynamic-code.js';import {rewriteJS} from './compiler.js';
test('Function-created code uses virtual URL globals while retaining parameters and return semantics',()=>{
 const window={location:{href:'https://website.example/path'}},bridge={window,globalThis:window,self:window,location:window.location};
 const ctor=mediatedFunction(Function,rewriteJS,bridge,()=>window.location.href,globalThis);
 assert.equal(ctor('return location.href')(),window.location.href);
 assert.equal(new ctor('return globalThis.location.href')(),window.location.href);
 assert.equal(ctor('location','return location.href')({href:'local'}),'local');
 assert.equal(ctor('return this')(),window);
 assert.equal(ctor('return this').call({value:4}).value,4);
 assert.equal(ctor('x','return x+1')(5),6);
 assert.throws(()=>ctor('invalid parameter','return 1'),SyntaxError);
 assert.throws(()=>ctor(Symbol('invalid')),TypeError);
});
