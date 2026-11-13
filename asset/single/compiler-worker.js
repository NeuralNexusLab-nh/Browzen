import {rewriteJS} from './compiler.js?v=20261113-9';
// Trusted parser only. Target scripts are parsed as data, never evaluated here.
self.onmessage=({data})=>{try{if(typeof data.source!=='string'||data.source.length>16*1024*1024)throw Error('Script source exceeds the 16 MB limit.');self.postMessage({id:data.id,result:rewriteJS(data.source,data.base,!!data.module)});}catch(error){self.postMessage({id:data.id,error:error.message});}};
