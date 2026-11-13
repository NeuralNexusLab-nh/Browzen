// Syntax-aware URL globals. Native sandbox/CSP, not this rewriter, provide isolation.
import {parse} from './vendor.js';
export function rewriteJS(source,base,module=false){
 const ast=parse(source,{ecmaVersion:'latest',sourceType:module?'module':'script',allowAwaitOutsideFunction:true,allowReturnOutsideFunction:!module,allowHashBang:true});
 const scopes=new WeakMap(),bound=new WeakSet(),edits=[],imports=[];
 const virtual=new Set(['window','self','globalThis','location','history','fetch','parent','top','frames','opener']);
 function bind(p,s){if(!p)return;if(p.type==='Identifier'){s.names.add(p.name);bound.add(p);}else if(p.type==='RestElement')bind(p.argument,s);else if(p.type==='AssignmentPattern')bind(p.left,s);else if(p.type==='ArrayPattern')p.elements.forEach(v=>bind(v,s));else if(p.type==='ObjectPattern')p.properties.forEach(v=>bind(v.type==='RestElement'?v.argument:v.value,s));}
 function children(n,fn){for(const [k,v]of Object.entries(n)){if(k==='start'||k==='end')continue;if(Array.isArray(v))v.forEach(x=>{if(x?.type)fn(x,k);});else if(v?.type)fn(v,k);}}
 function collect(n,s){
  if(n.type==='FunctionDeclaration'||n.type==='ClassDeclaration')bind(n.id,s);
  const func=/Function/.test(n.type)||n.type==='ArrowFunctionExpression';
  if(n.type==='Program'||n.type==='BlockStatement'||n.type==='CatchClause'||func){s={parent:s,names:new Set(),func:func||n.type==='Program'};scopes.set(n,s);}
  if(func){bind(n.id,s);n.params.forEach(p=>bind(p,s));}if(n.type==='CatchClause')bind(n.param,s);
  if(n.type==='VariableDeclaration'){let t=s;if(n.kind==='var')while(t.parent&&!t.func)t=t.parent;n.declarations.forEach(d=>bind(d.id,t));}
  if(n.type==='ImportDeclaration')n.specifiers.forEach(p=>bind(p.local,s));children(n,c=>collect(c,s));
 }
 collect(ast,{names:new Set(),parent:null,func:true});
 function local(name,s){for(;s;s=s.parent)if(s.names.has(name))return true;return false;}
 function property(n){return n?.type==='MemberExpression'?n.computed?n.property.type==='Literal'?n.property.value:null:n.property.name:null;}
 function isWindow(n,s){return n?.type==='Identifier'&&['window','self','globalThis','parent','top'].includes(n.name)&&!local(n.name,s)||property(n)==='defaultView'&&isDocument(n.object,s);}
 function isDocument(n,s){return n?.type==='Identifier'&&n.name==='document'&&!local('document',s)||property(n)==='document'&&isWindow(n.object,s);}
 function visit(n,s,p,key){s=scopes.get(n)||s;
  if(property(n)==='location'&&(isDocument(n.object,s)||isWindow(n.object,s))){edits.push([n.start,n.end,'__bzn.location']);return;}
  if(property(n)==='defaultView'&&isDocument(n.object,s)){edits.push([n.start,n.end,'__bzn.window']);return;}
  if(n.type==='ImportDeclaration'||n.type==='ExportNamedDeclaration'||n.type==='ExportAllDeclaration')if(n.source){const alias='bzn:'+new URL(n.source.value,base).href;imports.push({alias,url:new URL(n.source.value,base).href});edits.push([n.source.start,n.source.end,JSON.stringify(alias)]);}
  if(n.type==='ImportExpression'){edits.push([n.start,n.source.start,'__bzn.importModule('],[n.source.end,n.end,','+JSON.stringify(base)+')']);}
  if(n.type==='MetaProperty'&&n.meta.name==='import')edits.push([n.start,n.end,'({url:'+JSON.stringify(base)+'})']);
  if(n.type==='Identifier'&&virtual.has(n.name)&&!bound.has(n)&&!local(n.name,s)){
   const property=(p?.type==='MemberExpression'||p?.type==='OptionalMemberExpression')&&key==='property'&&!p.computed;
   const keyOnly=['Property','MethodDefinition','PropertyDefinition'].includes(p?.type)&&key==='key'&&!p.computed;
   const label=/^(LabeledStatement|BreakStatement|ContinueStatement)$/.test(p?.type||'');
   if(!property&&!label&&(!keyOnly||p.shorthand)){const v='__bzn.'+n.name;edits.push([n.start,n.end,p?.shorthand&&key==='value'?n.name+':'+v:v]);}
  }
  children(n,(c,k)=>{if(p?.shorthand&&key==='key')return;visit(c,s,n,k);});
 }
 visit(ast,null,null,'');
 const unique=new Map();for(const e of edits)unique.set(e[0]+':'+e[1],e);
 // Assemble once. Repeatedly splicing multi-megabyte bundles was quadratic.
 const chunks=[];let cursor=0;for(const [start,end,value]of [...unique.values()].sort((a,b)=>a[0]-b[0]||a[1]-b[1])){if(start<cursor)throw new SyntaxError('Overlapping script rewrite.');chunks.push(source.slice(cursor,start),value);cursor=end;}chunks.push(source.slice(cursor));
 return {source:chunks.join(''),imports};
}
