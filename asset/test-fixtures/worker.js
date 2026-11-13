let rtc;try{const p=new RTCPeerConnection({iceServers:[]});p.close();rtc='not blocked';}catch(e){rtc=e.name;}
let canvas;try{new OffscreenCanvas(1,1).getContext('2d').getImageData(0,0,1,1);canvas='readable';}catch(e){canvas=e.name;}
postMessage({rtc,canvas,cpu:navigator.hardwareConcurrency,memory:navigator.deviceMemory,language:navigator.language,tz:Intl.DateTimeFormat().resolvedOptions().timeZone,offset:new Date().getTimezoneOffset()});
