// CSS imports must be recursively processed as styles, not opaque binary assets.
// Unhandled/escaped URL forms remain blocked by the content document's CSP.
export async function rewriteCSS(text,base,load,chain=new Set()){
 // Supported browsers all load WOFF2. Do not download every font fallback.
 text=text.replace(/\bsrc\s*:\s*([^;{}]+);/gi,(all,value)=>{const preferred=value.match(/url\(\s*["']?[^)]*\.woff2[^)]*\)\s*(?:format\([^)]*\))?/i);return preferred?'src:'+preferred[0]+';':all;});
 const pattern=/@import\s+(?:url\(\s*(["']?)(.*?)\1\s*\)|(["'])(.*?)\3)|url\(\s*(["']?)(.*?)\5\s*\)/gi;
 const edits=await Promise.all([...text.matchAll(pattern)].map(async m=>{
  const raw=m[2]??m[4]??m[6],imported=/^@import/i.test(m[0]);
  if(!raw||raw.startsWith('#')||/^(data|blob):/i.test(raw))return null;
  try{const id=await load(raw,base,imported?'style':'binary',chain);return [m.index,m.index+m[0].length,(imported?'@import ':'')+'url("bzn-resource:'+id+'")'];}
  catch{return [m.index,m.index+m[0].length,(imported?'@import ':'')+'url("data:,")'];}
 }));
 const chunks=[];let cursor=0;for(const [start,end,value]of edits.filter(Boolean).sort((a,b)=>a[0]-b[0])){chunks.push(text.slice(cursor,start),value);cursor=end;}chunks.push(text.slice(cursor));return chunks.join('');
}
export function neutralizeCSS(text){return String(text).replace(/@import\s+(?:url\([^)]*\)|["'][^"']*["'])[^;]*;?/gi,'').replace(/url\(\s*(["']?)(.*?)\1\s*\)/gi,(all,q,url)=>/^(data|blob):/i.test(url)||url.startsWith('#')?all:'url("data:,")');}
