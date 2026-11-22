// Frameworks often log AggregateError without showing the useful inner errors.
export function nestedErrors(value,seen=new Set(),depth=0){
 if(!value||typeof value!=='object'||seen.has(value)||depth>3)return [];seen.add(value);
 const label=error=>String(error?.stack||String(error?.name||'Error')+': '+String(error?.message||error)).slice(0,1600);
 const result=[];try{for(const error of Array.from(value.errors||[]).slice(0,8)){result.push(label(error));result.push(...nestedErrors(error,seen,depth+1));}if(value.cause){result.push(label(value.cause));result.push(...nestedErrors(value.cause,seen,depth+1));}}catch{}return result;
}
export function installErrorDiagnostics(console,report=()=>{}){const original=console.error;console.error=function(...args){Reflect.apply(original,this,args);const details=args.flatMap(arg=>nestedErrors(arg));if(details.length)report(details.slice(0,12));for(const message of details)Reflect.apply(original,this,['Browzen underlying error: '+message]);};}
