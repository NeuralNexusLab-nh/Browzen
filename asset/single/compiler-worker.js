import {rewriteJS} from './compiler.js?v=20261113-6';
// Trusted parser only. Target scripts are parsed as data, never evaluated here.
self.onmessage=({data})=>{try{if(typeof data.source!=='string'||data.source.length>4*1024*1024)throw Error('Script source exceeds the 4 MB limit.');self.postMessage({id:data.id,result:rewriteJS(data.source,data.base,!!data.module)});}catch(error){self.postMessage({id:data.id,error:error.message});}};
