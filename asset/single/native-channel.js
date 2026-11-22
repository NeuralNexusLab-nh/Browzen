// Capture internal channel operations before site instrumentation can wrap them.
export function nativeChannel(prototype){const apply=Reflect.apply,post=prototype.postMessage,start=prototype.start,close=prototype.close;return {post:(port,value,transfer)=>apply(post,port,transfer===undefined?[value]:[value,transfer]),start:port=>apply(start,port,[]),close:port=>apply(close,port,[])};}
