// Preserve the virtual browser globals in ordinary Function-constructor code.
// This does not manufacture a native origin, trusted input, or CAPTCHA result.
export function mediatedFunction(NativeFunction,rewrite,bridge,getBase,nativeGlobal){
 function create(args){
  const strings=args.map(v=>''+v),body=strings.pop()||'',params=strings.join(',');
  // Let the native constructor validate the original parameter/body grammar.
  Reflect.apply(NativeFunction,undefined,args);
  const source=rewrite('(function anonymous('+params+'\n){\n'+body+'\n})',getBase(),false).source;
  const fn=NativeFunction('__bzn','return '+source)(bridge);
  return new Proxy(fn,{apply(target,receiver,values){const result=Reflect.apply(target,receiver,values);return result===nativeGlobal?bridge.window:result;}});
 }
 return new Proxy(NativeFunction,{apply:(target,receiver,args)=>create(args),construct:(target,args)=>create(args)});
}
