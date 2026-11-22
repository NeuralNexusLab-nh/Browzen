// Project a broker-authenticated virtual sender onto a real postMessage event.
// The browser's isTrusted property is deliberately never assigned or replaced.
export function projectFrameMessage(event,{trustedParent,scope,sourceFor}){
 const envelope=event.data;
 if(envelope?.type!=='browzen-frame-message')return false;
 if(event.source!==trustedParent||!scope||envelope.channel!==scope){event.stopImmediatePropagation();return false;}
 const source=sourceFor(envelope.source);
 if(!source||typeof envelope.origin!=='string'){event.stopImmediatePropagation();return false;}
 Object.defineProperties(event,{data:{value:envelope.data},origin:{value:envelope.origin},source:{value:source}});
 return true;
}
