import {neutralizeCSS}from './css-rewrite.js';
// Keep URL-bearing dynamic CSS on the same broker path as initial styles.
// Writes stay synchronous; late resource completions cannot undo newer styles.
export function installDynamicCSS(g,convert){
 const versions=new WeakMap();
 const ticket=(object,key)=>{key=key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());let state=versions.get(object);if(!state)versions.set(object,state={epoch:0,keys:new Map()});if(['css-text','sheet','style-text'].includes(key))state.epoch++;const epoch=state.epoch,n=(state.keys.get(key)||0)+1;state.keys.set(key,n);return ()=>state.epoch===epoch&&state.keys.get(key)===n;};
 const hasURL=value=>/url\s*\(|@import\b/i.test(value);
 function write(object,key,value,apply){value=String(value);const current=ticket(object,key);if(!hasURL(value))return apply(value);apply(neutralizeCSS(value));Promise.resolve().then(()=>convert(value)).then(css=>{if(current())apply(css);}).catch(()=>{});}
 const style=g.CSSStyleDeclaration?.prototype;
 if(style){for(const key of Object.getOwnPropertyNames(style)){const d=Object.getOwnPropertyDescriptor(style,key);if(d?.set&&d.configurable)Object.defineProperty(style,key,{...d,set(value){write(this,key,value,v=>d.set.call(this,v));}});}
  const set=style.setProperty;style.setProperty=function(key,value,priority){write(this,String(key),value,v=>set.call(this,key,v,priority));};
  const remove=style.removeProperty;style.removeProperty=function(key){ticket(this,String(key));return remove.call(this,key);};
 }
 const sheet=g.CSSStyleSheet?.prototype;
 if(sheet){const insert=sheet.insertRule,remove=sheet.deleteRule,replace=sheet.replaceSync,replaceAsync=sheet.replace;
  if(insert)sheet.insertRule=function(rule,index=0){rule=String(rule);if(!hasURL(rule))return insert.call(this,rule,index);const result=insert.call(this,neutralizeCSS(rule)||'@media not all {}',index),placeholder=this.cssRules[result];Promise.resolve().then(()=>convert(rule)).then(css=>{const at=[...this.cssRules].indexOf(placeholder);if(at<0)return;remove.call(this,at);insert.call(this,css,at);}).catch(()=>{});return result;};
  if(replace)sheet.replaceSync=function(text){write(this,'sheet',text,v=>replace.call(this,v));};
  if(replaceAsync)sheet.replace=function(text){const current=ticket(this,'sheet');return Promise.resolve(convert(String(text))).then(css=>current()?replaceAsync.call(this,css):this);};
 }
 const nodes=g.Node?.prototype,d=nodes&&Object.getOwnPropertyDescriptor(nodes,'textContent');
 if(d?.set&&d.configurable)Object.defineProperty(nodes,'textContent',{...d,set(value){if(this.nodeType===1&&this.tagName==='STYLE')write(this,'style-text',value,v=>d.set.call(this,v));else d.set.call(this,value);}});
}
