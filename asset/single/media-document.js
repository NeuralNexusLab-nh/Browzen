export function mediaDocument(type,url){
 type=String(type).split(';')[0].trim().toLowerCase();const kind=type.startsWith('video/')?'video':type.startsWith('audio/')?'audio':type.startsWith('image/')?'img':null;if(!kind)return null;
 const src=String(url).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
 return '<!doctype html><html><head><title>Media</title><style>html,body{margin:0;min-height:100%;background:#101217;color:#fff}body{display:grid;place-items:center;min-height:100vh}img,video{max-width:100%;max-height:100vh}audio{width:min(90vw,560px)}</style></head><body><'+kind+' src="'+src+'"'+(kind==='img'?' alt="Image"':' controls preload="metadata"')+'>'+(kind==='img'?'':'</'+kind+'>')+'</body></html>';
}
