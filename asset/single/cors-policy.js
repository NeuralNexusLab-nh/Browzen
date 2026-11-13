// Trusted broker's CORS policy. Never take a website-supplied Origin header.
const unsafeByte=/[\x00-\x08\x0a-\x1f\x7f"():<>?@\[\]\\{}]/;
export function unsafeHeaders(headers){return [...headers].filter(([name,value])=>{
 if(value.length>128)return true;
 if(name==='accept')return unsafeByte.test(value);
 if(['accept-language','content-language'].includes(name))return !/^[0-9A-Za-z *,\-.;=]*$/.test(value);
 if(name==='content-type')return unsafeByte.test(value)||!['application/x-www-form-urlencoded','multipart/form-data','text/plain'].includes(value.split(';')[0].trim().toLowerCase());
 if(name==='range')return !/^bytes=\d+-\d*$/.test(value);
 return true;
 }).map(([name])=>name).sort();}
export function checkCORS(headers,origin,credentials){const allowed=headers['access-control-allow-origin'];if(allowed!==origin&&!(allowed==='*'&&!credentials))throw new TypeError('The remote server did not allow this cross-origin request.');if(credentials&&headers['access-control-allow-credentials']!=='true')throw new TypeError('The remote server did not allow credentials.');}
export function checkPreflight(response,origin,credentials,method,names){
 if(response.status<200||response.status>=300)throw new TypeError('CORS preflight returned HTTP '+response.status);checkCORS(response.headers,origin,credentials);
 const methods=String(response.headers['access-control-allow-methods']||'').split(',').map(v=>v.trim());
 if(!['GET','HEAD','POST'].includes(method)&&!methods.includes(method)&&!(methods.includes('*')&&!credentials))throw new TypeError('CORS preflight did not allow method '+method);
 const allowed=String(response.headers['access-control-allow-headers']||'').toLowerCase().split(',').map(v=>v.trim());
 for(const name of names)if(!allowed.includes(name)&&!(allowed.includes('*')&&!credentials&&name!=='authorization'))throw new TypeError('CORS preflight did not allow header '+name);
}
