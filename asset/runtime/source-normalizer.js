// Upstream v1 misses global references in default-parameter expressions.
// Parse syntax instead of replacing strings/comments or website-specific URLs.
(() => {
 const parse=globalThis.acorn.parse,wrap='$scramjet$wrap';
 const names=new Set(['location','parent','top','eval']);
 const reads=new Set(['right','init','argument','arguments','elements','expressions','test','consequent','alternate','left','body','callee']);
 function normalize(input,module=false){
  const bytes=typeof input!=='string',source=bytes?new TextDecoder().decode(input):input;
  if(!/(location|parent|top|eval)/.test(source))return input;
  let ast;try{ast=parse(source,{ecmaVersion:'latest',sourceType:module?'module':'script',allowAwaitOutsideFunction:true,allowReturnOutsideFunction:true,allowHashBang:true});}catch{return input;}
  let changed=false;
  // The upstream module transformer can also leave global Location reads raw.
  // Track lexical bindings so a site's own `location` variable is never changed.
  const scopes=new WeakMap(),bindings=new WeakSet();
  function bind(pattern,scope){if(!pattern)return;if(pattern.type==='Identifier'){scope.names.add(pattern.name);bindings.add(pattern);}else if(pattern.type==='RestElement')bind(pattern.argument,scope);else if(pattern.type==='AssignmentPattern')bind(pattern.left,scope);else if(pattern.type==='ArrayPattern')pattern.elements.forEach(p=>bind(p,scope));else if(pattern.type==='ObjectPattern')pattern.properties.forEach(p=>bind(p.type==='RestElement'?p.argument:p.value,scope));}
  function collect(node,scope){
   if(node.type==='FunctionDeclaration'||node.type==='ClassDeclaration')bind(node.id,scope);
   const functionScope=/Function/.test(node.type)||node.type==='ArrowFunctionExpression';
   if(node.type==='Program'||node.type==='BlockStatement'||node.type==='CatchClause'||functionScope){scope={parent:scope,names:new Set(),functionScope:functionScope||node.type==='Program'};scopes.set(node,scope);}
   if(functionScope){bind(node.id,scope);node.params.forEach(p=>bind(p,scope));}
   if(node.type==='CatchClause')bind(node.param,scope);
   if(node.type==='VariableDeclaration'){let target=scope;if(node.kind==='var')while(target.parent&&!target.functionScope)target=target.parent;node.declarations.forEach(d=>bind(d.id,target));}
   if(node.type==='ImportDeclaration')node.specifiers.forEach(s=>bind(s.local,scope));
   for(const value of Object.values(node))for(const child of Array.isArray(value)?value:[value])if(child&&typeof child.type==='string')collect(child,scope);
  }
  collect(ast,null);
  const bound=(name,scope)=>scope&&(scope.names.has(name)||bound(name,scope.parent));
  function render(node,parent=null,key='',inside=false,scope=null){
   scope=scopes.get(node)||scope;
   const children=[];
   for(const [k,value]of Object.entries(node)){
    const list=Array.isArray(value)?value:[value];
    for(const child of list)if(child&&typeof child.type==='string'&&Number.isInteger(child.start)&&Number.isInteger(child.end)){
     const content=render(child,node,k,inside||(node.type==='AssignmentPattern'&&k==='right'),scope);
     children.push({start:child.start,end:child.end,content});
    }
   }
   let text=source.slice(node.start,node.end);const unique=new Map();
   for(const child of children)if(child.content!==source.slice(child.start,child.end))unique.set(child.start+':'+child.end,child);
   for(const child of [...unique.values()].sort((a,b)=>b.start-a.start))text=text.slice(0,child.start-node.start)+child.content+text.slice(child.end-node.start);
   if(module&&node.type==='Identifier'&&node.name==='location'&&!bindings.has(node)&&!bound('location',scope)){
    const property=(parent?.type==='MemberExpression'&&key==='property'&&!parent.computed)||(parent?.type==='Property'&&key==='key'&&!parent.computed)||/Specifier$/.test(parent?.type||'');
    const assignment=(parent?.type==='AssignmentExpression'&&key==='left')||(parent?.type==='UpdateExpression');
    const wrapped=parent?.type==='CallExpression'&&parent.callee?.name===wrap;
    if(!property&&!assignment&&!wrapped){changed=true;return wrap+'('+text+')';}
   }
   if(!inside)return text;
   const alreadyWrapped=parent?.type==='CallExpression'&&parent.callee?.type==='Identifier'&&parent.callee.name===wrap;
   const writing=((parent?.type==='AssignmentExpression'||parent?.type==='AssignmentPattern')&&key==='left')||(parent?.type==='UpdateExpression'&&key==='argument')||(parent?.type==='UnaryExpression'&&parent.operator==='delete');
   if(node.type==='MemberExpression'&&!alreadyWrapped&&!writing){
    const property=node.computed?node.property.value:node.property.name;
    if(node.computed||names.has(property)){changed=true;return wrap+'('+text+')';}
   }
   if(node.type==='Identifier'&&names.has(node.name)&&!alreadyWrapped){
    const reference=(parent?.type==='MemberExpression'&&key==='object')||reads.has(key)||(parent?.type==='Property'&&key==='value'&&!parent.shorthand);
    if(reference&&!writing){changed=true;return wrap+'('+text+')';}
   }
   if(node.type==='Property'&&node.shorthand&&parent?.type==='ObjectExpression'&&node.value.type==='Identifier'&&names.has(node.value.name)){changed=true;return node.value.name+': '+wrap+'('+node.value.name+')';}
   return text;
  }
  const output=render(ast);if(!changed)return input;return bytes?new TextEncoder().encode(output):output;
 }
 Object.defineProperty(globalThis,'__browzenNormalizeSource',{value:normalize,writable:false,configurable:false});
})();

