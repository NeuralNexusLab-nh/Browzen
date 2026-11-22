import test from 'node:test';
import assert from 'node:assert/strict';
import {assertEmbeddable,acceptsMessage,boundedRect} from './frame-policy.js';
test('frame ancestors and XFO are enforced without a direct network fallback',()=>{
 const url='https://widget.example/check';
 assert.throws(()=>assertEmbeddable({'x-frame-options':'DENY'},url,['https://site.example']));
 assert.throws(()=>assertEmbeddable({'x-frame-options':'SAMEORIGIN'},url,['https://site.example']));
 assert.doesNotThrow(()=>assertEmbeddable({'x-frame-options':'SAMEORIGIN'},url,['https://widget.example']));
 assert.throws(()=>assertEmbeddable({'content-security-policy':"frame-ancestors 'none'"},url,['https://site.example']));
 assert.throws(()=>assertEmbeddable({'content-security-policy':"frame-ancestors 'self'"},url,['https://site.example']));
 assert.doesNotThrow(()=>assertEmbeddable({'content-security-policy':'frame-ancestors https://*.site.example'},url,['https://a.site.example']));
 assert.throws(()=>assertEmbeddable({'content-security-policy':'frame-ancestors https://*.site.example'},url,['https://site.example']));
 assert.throws(()=>assertEmbeddable({'content-security-policy':'frame-ancestors https://a.site.example'},url,['https://a.site.example','https://evil.example']));
 assert.doesNotThrow(()=>assertEmbeddable({'content-security-policy':'frame-ancestors *','x-frame-options':'DENY'},url,['https://site.example']));
});
test('message routing checks the current virtual recipient origin',()=>{
 assert.equal(acceptsMessage('*','https://b.example/','https://a.example/'),true);
 assert.equal(acceptsMessage('/','https://b.example/','https://a.example/'),false);
 assert.equal(acceptsMessage('/','https://a.example/new','https://a.example/'),true);
 assert.equal(acceptsMessage('https://a.example','https://b.example/','https://a.example/'),false);
 assert.equal(acceptsMessage('https://b.example','https://b.example/','https://a.example/'),true);
 assert.equal(acceptsMessage('null','https://b.example/','https://a.example/'),false);
});
test('frame geometry rejects nonfinite data and bounds memory allocation',()=>{
 assert.throws(()=>boundedRect({x:NaN,y:0,width:300,height:150}));
 assert.throws(()=>boundedRect({x:Infinity,y:0,width:300,height:150}));
 assert.deepEqual(boundedRect({x:-10,y:3,width:20000,height:-1}),{x:-10,y:3,width:8192,height:0});
});
