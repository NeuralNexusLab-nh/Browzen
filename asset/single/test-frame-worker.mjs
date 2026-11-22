import test from 'node:test';import assert from 'node:assert/strict';
import {literalWorkerImports} from './frame-worker.js';
import {readFile} from 'node:fs/promises';
test('classic worker imports are parsed, bounded and prepared rather than fetched natively',()=>{
 assert.deepEqual(literalWorkerImports("importScripts('https://example.com/a.js','./b.js');importScripts('./b.js');"),['https://example.com/a.js','./b.js']);
 assert.deepEqual(literalWorkerImports("const s=\"importScripts('not-an-import')\";"),[]);
 assert.throws(()=>literalWorkerImports('importScripts(location.href)'),/Dynamic/);
});
test('experimental workers and frames keep native network and same-origin access blocked',async()=>{
 const host=await readFile(new URL('./frame-host.js',import.meta.url),'utf8'),worker=await readFile(new URL('./frame-worker.js',import.meta.url),'utf8');
 assert.match(host,/connect-src 'none'/);assert.match(host,/frame-src 'none'/);assert.match(host,/worker-src blob:/);assert.doesNotMatch(host,/allow-same-origin/);
 assert.match(host,/assertEmbeddable\(response.headers,pageURL,ancestors\)/);
 assert.match(worker,/Worker scripts must be same-origin/);assert.match(worker,/workers.size>=6/);assert.match(worker,/rpc\('fetch'/);assert.match(worker,/Module workers are not supported/);
});
