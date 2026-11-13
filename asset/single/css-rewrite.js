// CSS imports must be recursively processed as styles, not opaque binary assets.
// Unhandled/escaped URL forms remain blocked by the content document's CSP.
export async function rewriteCSS(text,base,load,chain=new Set()){
 const pattern=/@import\s+(?:url\(\s*(["']?)(.*?)\1\s*\)|(["'])(.*?)\3)|url\(\s*(["']?)(.*?)\5\s*\)/gi;
 const edits=await Promise.all([...text.matchAll(pattern)].map(async m=>{
  const raw=m[2]??m[4]??m[6],imported=/^@import/i.test(m[0]);
  if(!raw||raw.startsWith('#')||raw.startsWith('data:'))return null;
  try{const id=await load(raw,base,imported?'style':'binary',chain);return [m.index,m.index+m[0].length,(imported?'@import ':'')+'url("bzn-resource:'+id+'")'];}
  catch{return [m.index,m.index+m[0].length,(imported?'@import ':'')+'url("data:,")'];}
 }));
 for(const [start,end,value]of edits.filter(Boolean).sort((a,b)=>b[0]-a[0]))text=text.slice(0,start)+value+text.slice(end);
 return text;
}
