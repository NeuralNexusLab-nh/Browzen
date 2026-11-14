// Retry only safe reads when the transport drops, never canceled navigation or writes.
import {abortable} from './transport-guard.js?v=20261114-2';
export function retryableTransport(error,method,aborted,attempt){
 const message=[typeof error==='string'?error:error?.message,error?.name,error?.code,error?.cause?.message,error?.cause?.code].filter(Boolean).join(' ');
 return !aborted&&attempt<2&&['GET','HEAD'].includes(String(method).toUpperCase())&&/channel\s+(?:(?:was|is)\s+)?closed|connection\s+(?:(?:was|is|has been)\s+)?(?:lost|closed|reset|aborted|terminated)|network\s*(?:error|request failed|connection.*lost)|failed to fetch|fetch failed|operation was cancel(?:ed|led)|http2 error|stream\s+(?:reset|closed)|socket\s+(?:closed|hang up)|broken pipe|unexpected eof|ECONNRESET|ECONNABORTED|EPIPE|ERR_CONNECTION_(?:CLOSED|RESET|ABORTED)|ERR_NETWORK_CHANGED|ERR_INTERNET_DISCONNECTED/i.test(message);
}
// Include both headers and body in each attempt; discard partial responses.
export async function withTransportRetries(operation,{method='GET',signal,pause=ms=>new Promise(resolve=>setTimeout(resolve,ms))}){
 for(let attempt=0;;attempt++)try{return await abortable(signal,operation);}catch(error){if(!retryableTransport(error,method,signal.aborted,attempt))throw error instanceof Error?error:new Error(typeof error==='string'?error:error?.message||'Network connection failed.');await abortable(signal,()=>pause(150*(attempt+1)));}
}
