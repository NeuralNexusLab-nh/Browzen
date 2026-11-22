import {parse} from './vendor.js';

export function literalWorkerImports(source) {
  const ast=parse(source,{ecmaVersion:'latest',sourceType:'script'}),urls=[];
  function visit(n){if(!n||typeof n!=='object')return;
    if(n.type==='CallExpression'&&n.callee?.type==='Identifier'&&n.callee.name==='importScripts'){
      for(const a of n.arguments){if(a.type!=='Literal'||typeof a.value!=='string')throw new TypeError('Dynamic worker imports are not supported.');urls.push(a.value);}
    }
    for(const v of Object.values(n))if(Array.isArray(v))v.forEach(visit);else if(v?.type)visit(v);
  }
  visit(ast);return [...new Set(urls)];
}

// Runs in a Blob Worker that inherits connect-src 'none'. All readable network
// operations use the private channel; raw native network APIs stay CSP-blocked.
function workerRuntime(){
 const add=self.addEventListener.bind(self),post=self.postMessage.bind(self),evaluate=(0,eval),closeNative=self.close.bind(self);
 let port,sequence=0,base;const pending=new Map(),sources=new Map();
 const channelPost=MessagePort.prototype.postMessage,apply=Reflect.apply;
 const send=value=>apply(channelPost,port,[value]);
 const rpc=data=>new Promise((resolve,reject)=>{const id=++sequence;const timer=setTimeout(()=>{pending.delete(id);reject(Error('Worker transport timed out.'));},185000);pending.set(id,{resolve,reject,timer});send({...data,rpc:id});});
 const lock=(object,key,value)=>Object.defineProperty(object,key,{value,writable:false,configurable:false});
 add('message',function accept(event){
  if(port||event.data?.type!=='browzen-worker-port'||!event.ports[0])return;
  event.stopImmediatePropagation();self.removeEventListener('message',accept);port=event.ports[0];
  port.onmessage=async e=>{const d=e.data;
   if(d.rpc){const p=pending.get(d.rpc);if(!p)return;pending.delete(d.rpc);clearTimeout(p.timer);d.error?p.reject(Error(d.error)):p.resolve(d.result);return;}
   if(d.type!=='install')return;
   try{
    base=d.base;for(const [url,source]of d.sources)sources.set(url,source);
    self.__browzenPrivacy?.install(self);
    lock(self,'importScripts',(...urls)=>{for(const raw of urls){const url=new URL(raw,base).href;if(!sources.has(url))throw Error('Worker import was not prepared.');evaluate(sources.get(url));}});
    const fetchWebsite=async(input,init={})=>{
     const req=input instanceof Request?input:null,url=new URL(req?.url||input,base).href,method=String(init.method||req?.method||'GET').toUpperCase();
     let body=init.body;if(body==null&&req&&!['GET','HEAD'].includes(method))body=await req.arrayBuffer();
     const headers=new Headers(init.headers||req?.headers);if(body!=null){const r=new Response(body);if(!headers.has('content-type')&&r.headers.has('content-type'))headers.set('content-type',r.headers.get('content-type'));body=await r.arrayBuffer();}
     const r=await rpc({type:'fetch',url,method,headers:[...headers],body,mode:init.mode||req?.mode||'cors',credentials:init.credentials||req?.credentials||'same-origin'});
     if(r.opaque){const response=new Response(null);Object.defineProperties(response,{type:{value:'opaque'},status:{value:0},ok:{value:false}});return response;}
     const response=new Response([204,205,304].includes(r.status)?null:r.body,{status:r.status,statusText:r.statusText,headers:r.headers});Object.defineProperty(response,'url',{value:r.url});return response;
    };
    lock(self,'fetch',fetchWebsite);
    for(const key of ['WebSocket','WebTransport','EventSource','Worker','SharedWorker'])lock(self,key,undefined);
    const location=new URL(base),facade=new Proxy(self,{get(target,key){if(key==='location')return location;const v=Reflect.get(target,key,target);return typeof v==='function'&&!v.prototype?v.bind(target):v;}});
    lock(self,'__bzn',{window:facade,self:facade,globalThis:facade,receiver:value=>value===self?facade:value,caught:()=>{},location,fetch:fetchWebsite,importModule:()=>Promise.reject(Error('Module workers are not supported.'))});
    evaluate(d.source);send({type:'installed'});
   }catch(error){send({type:'worker-error',message:String(error.stack||error)});closeNative();}
  };port.start();send({type:'ready'});
 });
}

export function installWorkerSupport({native,remote,current,rpc,resourceEntry,resources,downloadBlobs,define}){
 const NativeWorker=window.Worker,workers=new Set();
 if(!NativeWorker)return;
 const post=MessagePort.prototype.postMessage,apply=Reflect.apply;
 class MediatedWorker extends EventTarget{
  onmessage=null;onerror=null;onmessageerror=null;
  constructor(value,options={}){
   super();if(options.type==='module')throw new DOMException('Module workers are not supported.','NotSupportedError');
   if(workers.size>=6)throw new DOMException('Worker limit reached.','QuotaExceededError');
   const raw=String(value),blob=downloadBlobs.get(raw),url=blob?current().url:remote(raw);
   if(!blob&&new URL(url).origin!==new URL(current().url).origin)throw new DOMException('Worker scripts must be same-origin.','SecurityError');
   let closed=false,installed=false,bytes=0;const queue=[];
   const source=__BROWZEN_WORKER_GUARD__+'\n('+workerRuntime.toString()+')();';
   const objectURL=native.create(new native.Blob([source],{type:'text/javascript'})),worker=new NativeWorker(objectURL,{name:options.name||'Browzen isolated worker'}),pair=new MessageChannel();
   workers.add(worker);native.revoke(objectURL);
   const emit=(type,event)=>{this.dispatchEvent(event);this['on'+type]?.call(this,event);};
   worker.onmessage=e=>emit('message',new MessageEvent('message',{data:e.data,ports:e.ports}));
   worker.onerror=e=>emit('error',new ErrorEvent('error',{message:e.message}));
   worker.onmessageerror=()=>emit('messageerror',new MessageEvent('messageerror'));
   this.terminate=()=>{if(closed)return;closed=true;queue.length=0;pair.port1.close();worker.terminate();workers.delete(worker);};
   this.postMessage=(data,transfer=[])=>{if(closed)return;if(queue.length>=128)throw new DOMException('Worker message limit reached.','QuotaExceededError');
    const snapshot=structuredClone(data,{transfer:Array.isArray(transfer)?transfer:transfer.transfer||[]}),ports=[],seen=new Set();
    const scan=value=>{if(!value||typeof value!=='object'||seen.has(value))return;seen.add(value);if(value instanceof MessagePort){ports.push(value);return;}if(value instanceof Map){for(const [k,v]of value){scan(k);scan(v);}}else if(value instanceof Set){for(const v of value)scan(v);}else if(!ArrayBuffer.isView(value))for(const v of Object.values(value))scan(v);};scan(snapshot);
    if(installed)worker.postMessage(snapshot,ports);else queue.push({data:snapshot,ports});};
   const send=data=>apply(post,pair.port1,[data]);
   pair.port1.onmessage=async e=>{if(closed)return;const d=e.data;
    try{
     if(d.type==='ready'){
      const sources=new Map();let count=0;
      async function prepare(raw,base,provided){const address=new URL(raw,base).href;if(sources.has(address))return sources.get(address);if(++count>16)throw Error('Worker import limit reached.');
       let text=provided;if(text==null){const id=await resourceEntry(address,'script');text=resources.get(id)?.body;if(typeof text!=='string')throw Error('Worker script unavailable.');}
       bytes+=text.length;if(bytes>4*1024*1024)throw Error('Worker source limit reached.');
       sources.set(address,text);for(const dep of literalWorkerImports(text))await prepare(dep,address);
       const compiled=await rpc('compile',{source:text,base:address,module:false});sources.set(address,compiled.source);return compiled.source;
      }
      const script=await prepare(url,url,blob?await blob.text():undefined);if(!closed)send({type:'install',base:url,source:script,sources:[...sources]});return;
     }
     if(d.type==='installed'){installed=true;for(const {data,ports}of queue.splice(0))worker.postMessage(data,ports);return;}
     if(d.type==='worker-error')throw Error(d.message);
     if(d.rpc&&d.type==='fetch'){const result=await rpc('fetch',{url:d.url,method:d.method,headers:d.headers,body:d.body,mode:d.mode,credentials:d.credentials});if(!closed)send({rpc:d.rpc,result});return;}
    }catch(error){if(d.rpc)send({rpc:d.rpc,error:error.message});else{emit('error',new ErrorEvent('error',{message:error.message}));console.warn('Browzen worker: '+error.message);this.terminate();}}
   };pair.port1.start();worker.postMessage({type:'browzen-worker-port'},[pair.port2]);
  }
 }
 define(window,'Worker',MediatedWorker);define(window,'SharedWorker',undefined);
}
