export function validateRemote(value) {
 const url=new URL(value);
 if(!['http:','https:'].includes(url.protocol))throw Error('Only HTTP and HTTPS websites are supported.');
 if(url.username||url.password)throw Error('Credentials embedded in URLs are not allowed.');
 const h=url.hostname.toLowerCase().replace(/^\[|\]$/g,'').replace(/\.$/,'');
 if(h==='onion'||h.endsWith('.onion'))throw Error('This version uses Puter, not Tor. Onion websites are unavailable.');
 if(!h.includes('.')||h==='localhost'||/\.(localhost|local|internal|invalid|test|lan|home|arpa)$/.test(h)||h.includes(':'))throw Error('Local/private or reserved network names are not allowed.');
 if(/^\d+\.\d+\.\d+\.\d+$/.test(h)){
  const [a,b,c]=h.split('.').map(Number);
  if([0,10,127].includes(a)||a>=224||(a===100&&b>=64&&b<=127)||(a===169&&b===254)||(a===172&&b>=16&&b<=31)||(a===192&&(b===168||b===0||b===2))||(a===198&&(b===18||b===19||(b===51&&c===100)))||(a===203&&b===0&&c===113))throw Error('Private, reserved or multicast IP addresses are not allowed.');
 }
 url.hostname=h;return url;
}
export function addressToURL(value,engine='https://duckduckgo.com/?q=') {
 value=value.trim();if(!value)return 'browzen://newtab';
 if(value.startsWith('browzen://'))return value;
 if(/^[a-z][\w+.-]*:/i.test(value))return validateRemote(value).href;
 if(!/\s/.test(value)&&value.includes('.'))return validateRemote('https://'+value).href;
 return engine+encodeURIComponent(value);
}
