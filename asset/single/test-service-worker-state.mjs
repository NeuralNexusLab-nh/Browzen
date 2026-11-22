import test from 'node:test';import assert from 'node:assert/strict';import {blockedServiceWorkers}from'./service-worker-state.js';
test('blocked service workers keep a stable pending ready promise without claiming registration success',async()=>{
 const container=blockedServiceWorkers(),ready=container.ready;
 assert.equal(container.controller,null);assert.equal(container.ready,ready);assert.equal(typeof ready.then,'function');
 await assert.rejects(container.register('/sw.js'),{name:'NotSupportedError'});
 assert.deepEqual(await container.getRegistrations(),[]);assert.equal(await container.getRegistration(),undefined);
 const result=await Promise.race([ready.then(()=> 'unexpected-control'),Promise.resolve('not-controlled')]);assert.equal(result,'not-controlled');
});
