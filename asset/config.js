// Static hosting configuration. Content hosts must serve this same build over HTTPS.
export const webOrigin='https://browzen.nxlabtw.com';
export const contentSuffix='browzen.nxlabtw.com';
export const runtimePath='/asset/runtime/';
export function contentOrigin(id,page=location){
 if(!/^[a-f0-9]{16}$/.test(id))throw Error('Invalid content session.');
 if(['127.0.0.1','localhost'].includes(page.hostname))return `http://bzn-${id}.localhost:7352`;
 if(page.origin!==webOrigin)throw Error('Open Browzen at '+webOrigin+'. Preview domains need a separate isolated content-host configuration.');
 return `https://bzn-${id}.${contentSuffix}`;
}
