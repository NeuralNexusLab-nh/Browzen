export const scriptKinds=new Set(['script','script-cors','module']);
export function sourcePolicy(kind,url,origin,headers){
 if(!['binary','style',...scriptKinds].includes(kind))throw new TypeError('Unsupported resource type.');
 const cross=new URL(url).origin!==origin,allow=headers['access-control-allow-origin'];
 const cors=!cross||allow==='*'||allow===origin;
 if(!cors&&(kind==='module'||kind==='script-cors'))throw new TypeError('Cross-origin module or CORS script was not permitted by its server.');
 const mime=String(headers['content-type']||'').split(';')[0].trim().toLowerCase();
 if(kind==='style'&&mime!=='text/css')throw new TypeError('Stylesheet response is not CSS.');
 if(scriptKinds.has(kind)&&!(/^(text|application)\/(javascript|ecmascript|x-javascript)$/.test(mime)||/^text\/javascript1\.[0-5]$/.test(mime)))throw new TypeError('Script response has an unsupported MIME type: '+(mime||'missing'));
 return {opaque:!cors,script:scriptKinds.has(kind)};
}
export async function verifyIntegrity(body,integrity=''){
 if(!integrity)return;
 const tokens=String(integrity).trim().split(/\s+/).map(t=>/^(sha256|sha384|sha512)-([A-Za-z0-9+/]+={0,2})(?:\?.*)?$/.exec(t)).filter(Boolean);
 if(!tokens.length)throw new TypeError('Unsupported script integrity metadata.');
 const strongest=tokens.some(t=>t[1]==='sha512')?'sha512':tokens.some(t=>t[1]==='sha384')?'sha384':'sha256';
 const bytes=new Uint8Array(await crypto.subtle.digest(strongest.replace('sha','SHA-'),body));
 const actual=btoa(String.fromCharCode(...bytes));if(!tokens.some(t=>t[1]===strongest&&t[2]===actual))throw new TypeError('Script integrity check failed.');
}
