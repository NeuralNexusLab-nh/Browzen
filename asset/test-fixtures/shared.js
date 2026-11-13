let rtc;try{const p=new RTCPeerConnection({iceServers:[]});p.close();rtc='not blocked';}catch(e){rtc=e.name;}
onconnect=e=>e.ports[0].postMessage({rtc,cpu:navigator.hardwareConcurrency,memory:navigator.deviceMemory,language:navigator.language,tz:Intl.DateTimeFormat().resolvedOptions().timeZone,offset:new Date().getTimezoneOffset()});
