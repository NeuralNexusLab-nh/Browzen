// Retry only safe reads when the transport drops, never canceled navigation or writes.
export function retryableTransport(error,method,aborted,attempt){
 return !aborted&&attempt<2&&['GET','HEAD'].includes(String(method).toUpperCase())&&/channel closed|connection reset|network error|operation was cancel(?:ed|led)|http2 error|stream reset|broken pipe|unexpected eof/i.test(error?.message||'');
}
