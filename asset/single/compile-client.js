import {rewriteJS} from './compiler.js?v=20261113-9';
let worker,id=0,unavailable=false,pendingChars=0;const jobs=new Map();
function stop(error){worker?.terminate();worker=undefined;unavailable=true;for(const job of jobs.values()){clearTimeout(job.timer);job.reject(error);}jobs.clear();pendingChars=0;}
export async function compileJS(source,base,module=false){
 if(typeof Worker!=='function'||unavailable)return rewriteJS(source,base,module);
 if(jobs.size>=512||pendingChars+source.length>32*1024*1024)throw Error('Script conversion queue exceeded its bounded capacity.');
 if(!worker){try{worker=new Worker(new URL('./compiler-worker.js?v=20261113-9',import.meta.url),{type:'module'});worker.onmessage=({data})=>{const job=jobs.get(data.id);if(!job)return;clearTimeout(job.timer);jobs.delete(data.id);pendingChars-=job.size;data.error?job.reject(new SyntaxError(data.error)):job.resolve(data.result);};worker.onerror=()=>stop(Error('Script conversion worker failed.'));}catch{unavailable=true;return rewriteJS(source,base,module);}}
 return new Promise((resolve,reject)=>{const token=++id,timer=setTimeout(()=>stop(Error('Script conversion timed out.')),30000);jobs.set(token,{resolve,reject,timer,size:source.length});pendingChars+=source.length;worker.postMessage({id:token,source,base,module});});
}
