/* Best-effort static-page protections. Not an engine or OS network boundary. */
(() => {
 // Upstream rewriting also needs UUIDs inside classic Workers.
 const entropy=globalThis.crypto;
 if(entropy&&typeof entropy.randomUUID!=='function'&&typeof entropy.getRandomValues==='function')Object.defineProperty(entropy,'randomUUID',{value:function(){
  const b=new Uint8Array(16);entropy.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
  const h=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
 },configurable:false,writable:false});
 if(globalThis.__browzenPrivacy)return;
 const installed=new WeakSet(),protectedFunctions=new WeakSet(),define=Object.defineProperty;
 function install(g){
  if(installed.has(g))return;
  function fail(){throw new g.DOMException('Blocked by Browzen privacy controls.','SecurityError');}
  function lock(o,k,value){if(!o)return;const old=Object.getOwnPropertyDescriptor(o,k);if(old&&!old.configurable&&(old.value===value||(typeof old.value==='function'&&protectedFunctions.has(old.value))))return;if(typeof value==='function')protectedFunctions.add(value);define(o,k,{value,writable:false,configurable:false});}
  function read(o,k,value){if(!o)return;const old=Object.getOwnPropertyDescriptor(o,k);if(old&&!old.configurable&&old.get&&protectedFunctions.has(old.get))return;const get=()=>value;protectedFunctions.add(get);define(o,k,{get,configurable:false});}
  // Do not allow peer/data/ICE transports to start, even without media permissions.
  for(const key of ['RTCPeerConnection','webkitRTCPeerConnection','mozRTCPeerConnection','RTCIceTransport','RTCDtlsTransport','RTCSctpTransport','WebTransport'])if(key in g)lock(g,key,fail);
  const nav=g.navigator;
  if(nav){
   read(nav,'language','en-US');read(nav,'languages',Object.freeze(['en-US','en']));
   read(nav,'userAgent',nav.userAgent.replace(/\s+Browzen(?:\/[^\s]+)?$/,'')+' Browzen');
   for(const proto of [g.Navigator?.prototype,g.WorkerNavigator?.prototype])if(proto){
    for(const [k,v]of Object.entries({language:'en-US',languages:Object.freeze(['en-US','en'])}))if(k in proto)read(proto,k,v);
   }
  }
  // Rendering, fonts, canvas, audio and hardware information use native behavior.
  // Only locale/time defaults and network-leak protections are changed here.
  // A session-wide fixed JS UTC/English view, applied to each instrumented realm.
  // Native CSS/font/layout/engine behavior still depends on the outer browser.
  const D=g.Date,p=D.prototype,utcString=p.toUTCString,nativeParse=D.parse;
  const parseValue=v=>typeof v==='string'&&/^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?::\d\d(?:\.\d+)?)?$/.test(v)?v.replace(' ','T')+'Z':v;
  for(const name of ['FullYear','Month','Date','Day','Hours','Minutes','Seconds','Milliseconds'])if(p['getUTC'+name])lock(p,'get'+name,p['getUTC'+name]);
  for(const name of ['FullYear','Month','Date','Hours','Minutes','Seconds','Milliseconds'])if(p['setUTC'+name])lock(p,'set'+name,p['setUTC'+name]);
  lock(p,'getTimezoneOffset',function(){return Number.isNaN(this.getTime())?NaN:0;});
  lock(p,'getYear',function(){return this.getUTCFullYear()-1900;});
  lock(p,'setYear',function(y){y=Number(y);return this.setUTCFullYear(y>=0&&y<=99?y+1900:y);});
  const dateText=d=>{const s=Reflect.apply(utcString,d,[]);if(s==='Invalid Date')return s;const a=s.split(' ');return a[0].replace(',','')+' '+a[2]+' '+a[1]+' '+a[3];};
  const timeText=d=>{const s=Reflect.apply(utcString,d,[]);return s==='Invalid Date'?s:s.split(' ')[4]+' GMT+0000 (Coordinated Universal Time)';};
  const fullText=d=>Number.isNaN(d.getTime())?'Invalid Date':dateText(d)+' '+timeText(d);
  lock(p,'toString',function(){return fullText(this);});
  lock(p,'toDateString',function(){return dateText(this);});
  lock(p,'toTimeString',function(){return timeText(this);});
  for(const name of ['toLocaleString','toLocaleDateString','toLocaleTimeString']){const original=p[name];lock(p,name,function(locale,options){return Reflect.apply(original,this,[locale||'en-US',{...options,timeZone:options?.timeZone||'UTC'}]);});}
  const dateProxy=new Proxy(D,{apply(){return fullText(new D());},construct(target,args,newTarget){
   if(args.length>=2)return Reflect.construct(target,[D.UTC(...args)],newTarget);
   return Reflect.construct(target,args.length?[parseValue(args[0])]:[],newTarget);
  }});
  lock(D,'parse',v=>Reflect.apply(nativeParse,D,[parseValue(v)]));
  lock(p,'constructor',dateProxy);
  lock(g,'Date',dateProxy);
  if(g.Temporal?.Now?.timeZoneId)lock(g.Temporal.Now,'timeZoneId',()=>'UTC');
  for(const name of ['DateTimeFormat','NumberFormat','Collator','PluralRules','RelativeTimeFormat','ListFormat','DisplayNames','Segmenter']){
   const C=g.Intl?.[name];if(!C)continue;
   const options=a=>{const r=[...a];r[0]??='en-US';if(name==='DateTimeFormat')r[1]={...r[1],timeZone:r[1]?.timeZone||'UTC'};return r;};
   const wrapped=new Proxy(C,{apply:(t,that,a)=>Reflect.apply(t,that,options(a)),construct:(t,a,n)=>Reflect.construct(t,options(a),n)});
   if(C.prototype)lock(C.prototype,'constructor',wrapped);lock(g.Intl,name,wrapped);
  }
  // Neutralize ordinary dynamic DNS/preconnect hints before the proxy's DOM hooks wrap them.
  const hints=/\b(dns-prefetch|preconnect|prerender|prefetch)\b/i;
  const E=g.Element?.prototype,L=g.HTMLLinkElement?.prototype;
  if(g.Document?.prototype.execCommand){const command=g.Document.prototype.execCommand;lock(g.Document.prototype,'execCommand',function(name,...args){if(/^(copy|cut|paste)$/i.test(String(name)))return false;return Reflect.apply(command,this,[name,...args]);});}
  if(E){const set=E.setAttribute;define(E,'setAttribute',{configurable:true,writable:true,value:function(k,v){
   if(this.tagName==='LINK'&&((String(k).toLowerCase()==='rel'&&hints.test(String(v)))||(String(k).toLowerCase()==='href'&&hints.test(this.getAttribute('rel')||''))))return Reflect.apply(set,this,[k,'']);
   if(String(k).toLowerCase()==='ping')return Reflect.apply(set,this,[k,'']);return Reflect.apply(set,this,[k,v]);
  }});}
  if(L)for(const key of ['rel','href']){const d=Object.getOwnPropertyDescriptor(L,key);if(d?.set)define(L,key,{...d,set:function(value){if((key==='rel'&&hints.test(String(value)))||(key==='href'&&hints.test(this.rel)))value='';return Reflect.apply(d.set,this,[value]);}});}
  installed.add(g);
 }
 define(globalThis,'__browzenPrivacy',{value:Object.freeze({install}),writable:false,configurable:false});
})();

