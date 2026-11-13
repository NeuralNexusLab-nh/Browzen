export function hasRel(value,token){return String(value||'').toLowerCase().split(/\s+/).includes(token);}
export function documentTagAttributes(source,tag){if(!['html','body'].includes(tag))throw Error('Unsupported document tag.');return String(source).match(new RegExp('<'+tag+'\\b((?:[^"\'>]|"[^"]*"|\'[^\']*\')*)>','i'))?.[1]||'';}
// Rocket Loader is a scheduling wrapper, not an access-control challenge. Execute
// only its explicitly marked original scripts through our existing script queue.
export function rocketLoaderToken(src,settings,base){
 try{const u=new URL(src,base);if(!/^\/cdn-cgi\/scripts\/[^/]+\/cloudflare-static\/rocket-loader\.min\.js$/.test(u.pathname))return null;
 const token=String(settings||'').split('|')[0].replace(/-$/,'');return /^[a-f0-9]{24,32}$/i.test(token)?token:null;}catch{return null;}
}
export function restoreScriptType(value,tokens){const type=String(value||'');for(const token of tokens)if(type.startsWith(token+'-'))return type.slice(token.length+1);return type;}
