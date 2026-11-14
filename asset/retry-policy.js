// Retry only safe reads when the transport drops, never canceled navigation or writes.
import {abortable} from './transport-guard.js?v=20261114-2';
export function retryableTransport(error,method,aborted,attempt){
 const message=[typeof error==='string'?error:error?.message,error?.name,error?.code,error?.cause?.message,error?.cause?.code].filter(Boolean).join(' ');
 if(aborted||attempt>=2||!['GET','HEAD'].includes(String(method).toUpperCase()))return false;
 // This helper runs only around the transport, not website scripts. Treat new
 // SDK/network failure types as retryable instead of maintaining a fragile list.
 return !['SyntaxError','RangeError','NotAllowedError'].includes(error?.name)&&!/(?:invalid|malformed|unsupported)\s+(?:url|uri|scheme|protocol|method|header)|HTTP\s*(?:(?:status|error|returned)\s*)?[45]\d\d\b|not signed in|sign[ -]?in required|login required|unauthori[sz]ed|forbidden|permission denied|access denied|quota|rate limit|too many requests|CORS|private.*target|reserved.*target|exceed(?:s|ed)?.*limit/i.test(message);
}
// Include both headers and body in each attempt; discard partial responses.
export async function withTransportRetries(operation,{method='GET',signal,timeoutMs=60000,pause=ms=>new Promise(resolve=>setTimeout(resolve,ms))}){
 for(let attempt=0;;attempt++)try{const attemptSignal=AbortSignal.any([signal,AbortSignal.timeout(timeoutMs)]);return await abortable(attemptSignal,()=>operation(attemptSignal));}catch(error){if(!retryableTransport(error,method,signal.aborted,attempt))throw error instanceof Error?error:new Error(typeof error==='string'?error:error?.message||'Network connection failed.');await abortable(signal,()=>pause(150*(attempt+1)));}
}
