import {rewriteJS} from './compiler.js?v=20261113-6';
let worker,id=0,unavailable=false;const jobs=new Map();
function stop(error){worker?.terminate();worker=undefined;unavailable=true;for(const job of jobs.values()){clearTimeout(job.timer);job.reject(error);}jobs.clear();}
export async function compileJS(source,base,module=false){
 if(typeof Worker!=='function'||unavailable)return rewriteJS(source,base,module);
 if(jobs.size>=64)throw Error('Too many pending script conversions.');
 if(!worker){try{worker=new Worker(new URL('./compiler-worker.js?v=20261113-6',import.meta.url),{type:'module'});worker.onmessage=({data})=>{const job=jobs.get(data.id);if(!job)return;clearTimeout(job.timer);jobs.delete(data.id);data.error?job.reject(new SyntaxError(data.error)):job.resolve(data.result);};worker.onerror=()=>stop(Error('Script conversion worker failed.'));}catch{unavailable=true;return rewriteJS(source,base,module);}}
 return new Promise((resolve,reject)=>{const token=++id,timer=setTimeout(()=>stop(Error('Script conversion timed out.')),30000);jobs.set(token,{resolve,reject,timer});worker.postMessage({id:token,source,base,module});});
}
