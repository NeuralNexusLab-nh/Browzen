// A website sees inert placeholders, never an uninstrumented iframe realm.
export function installFrames({ native, rpc, send, current, remote, dispatch }) {
  const cleanJSON=Object.freeze({parse:JSON.parse.bind(JSON),stringify:JSON.stringify.bind(JSON)});
  const intrinsics={JSON:cleanJSON,Object,Array,String,Number,Boolean,RegExp,Date,Math,Reflect,Promise,Symbol,Map,Set,WeakMap,WeakSet,ArrayBuffer,DataView,Uint8Array,Error,TypeError,get Function(){return window.Function||Function;},get screen(){return window.screen;}};
  const frames = new Map(), byElement = new WeakMap(), siblings=new Map();
  const nativeInstance=Function.prototype[Symbol.hasInstance],nativeClone=Node.prototype.cloneNode;
  Object.defineProperty(HTMLIFrameElement,Symbol.hasInstance,{configurable:true,value(value){return byElement.has(value)||nativeInstance.call(this,value);}});
  Object.defineProperty(Node.prototype,'cloneNode',{configurable:true,writable:true,value:function(deep){const clone=nativeClone.call(this,deep);if(byElement.has(this))placeholder(clone);return clone;}});
  function sibling(name){if(!siblings.has(name))siblings.set(name,Object.freeze({postMessage(data,targetOrigin='/',transfer=[]){message('sibling:'+name,data,targetOrigin,transfer);},get closed(){return false;}}));return siblings.get(name);}
  let sequence = 0, scheduled = false;
  function message(destination, data, targetOrigin, transfer=[]) {
    if(targetOrigin&&typeof targetOrigin==='object'){transfer=targetOrigin.transfer||[];targetOrigin=targetOrigin.targetOrigin||'/';}
    if(!Array.isArray(transfer))throw new TypeError('Invalid message transfer list.');
    send('frame-message',{destination,data,targetOrigin,ports:transfer.filter(v=>v instanceof MessagePort)},transfer);
  }
  const parent = Object.freeze({
    postMessage(data, targetOrigin = '/', transfer=[]) { message('parent',data,targetOrigin,transfer); },
    get closed() { return false; },
    frames:new Proxy(Object.create(null),{get:(target,key)=>typeof key==='string'?sibling(key):undefined}),
  });
  function placeholder(el) {
    if (byElement.has(el)) return byElement.get(el);
    const id = 'f' + (++sequence);
    let closed = false;
    const windowMethods = {
      postMessage(data, targetOrigin = '/', transfer=[]) { message(id,data,targetOrigin,transfer); },
      get closed() { return closed; },
      focus() { el.focus(); },
      // about:blank inherits its creator's origin. Expose only inert intrinsics,
      // never a fresh native Window capable of recovering unmediated transports.
      get document() { const src=el.getAttribute('data-bzn-frame-src')||el.getAttribute('data-bzn-src')||'';if(src&&src!=='about:blank')throw new DOMException('Cross-origin frame access is denied.','SecurityError');return Object.freeze({URL:'about:blank'}); },
    };
    for(const [key,value] of Object.entries(intrinsics))Object.defineProperty(windowMethods,key,{enumerable:true,get(){const src=el.getAttribute('data-bzn-frame-src')||el.getAttribute('data-bzn-src')||'';if(src&&src!=='about:blank')throw new DOMException('Cross-origin frame access is denied.','SecurityError');return value;}});
    const facade=Object.freeze(windowMethods);
    const item = { id, el, facade, url: '', close() { closed = true; } };
    frames.set(id, item); byElement.set(el, item);
    Object.defineProperties(el, {
      src: { configurable: true, get: () => el.getAttribute('data-bzn-frame-src') || '', set(value) { native.set.call(el, 'data-bzn-frame-src', String(value)); schedule(); } },
      contentWindow: { configurable: true, get: () => facade },
      contentDocument: { configurable: true, get: () => null },
      name: { configurable: true, get: () => el.getAttribute('name') || '', set(value) { native.set.call(el, 'name', String(value)); } },
      width: { configurable: true, get: () => el.getAttribute('width') || '300', set(value) { native.set.call(el, 'width', String(value)); el.style.width = /^\d+$/.test(String(value)) ? value + 'px' : String(value); } },
      height: { configurable: true, get: () => el.getAttribute('height') || '150', set(value) { native.set.call(el, 'height', String(value)); el.style.height = /^\d+$/.test(String(value)) ? value + 'px' : String(value); } },
    });
    if (!el.style.width) el.style.width = (el.getAttribute('width') || '300') + 'px';
    if (!el.style.height) el.style.height = (el.getAttribute('height') || '150') + 'px';
    if (!el.style.display) el.style.display = 'inline-block';
    return item;
  }
  function create(doc, name, args, createElement) {
    const el = createElement.call(doc, 'div', ...args);
    native.set.call(el, 'data-bzn-frame', '');
    placeholder(el); return el;
  }
  function scan() { for (const el of document.querySelectorAll('[data-bzn-frame]')) placeholder(el); schedule(); }
  function schedule() {
    if (scheduled) return;
    scheduled = true; requestAnimationFrame(layout);
  }
  function layout() {
    scheduled = false;
    for (const [id, item] of frames) {
      const { el } = item;
      if (!el.isConnected) { if (item.url) send('frame-remove', { frameId: id }); item.url = ''; continue; }
      const raw = el.getAttribute('data-bzn-frame-src') || el.getAttribute('data-bzn-src') || '';
      if (!raw || raw === 'about:blank') {if(!item.blankLoaded){item.blankLoaded=true;native.dispatch.call(el,new Event('load'));}continue;}
      let url; try { url = remote(raw); } catch { continue; }
      if (url !== item.url) {
        item.url = url;
        rpc('frame-open', { frameId: id, url, frameName:el.name }).catch(error => { el.textContent = error.message; el.setAttribute('data-frame-error', error.message); });
      }
      const r = el.getBoundingClientRect(), style = getComputedStyle(el);
      const clip = { x: Math.max(0, r.left), y: Math.max(0, r.top), right: Math.min(innerWidth, r.right), bottom: Math.min(innerHeight, r.bottom) };
      let visible = style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) !== 0;
      for (let p = el.parentElement; p; p = p.parentElement) {
        const s = getComputedStyle(p), pr = p.getBoundingClientRect();
        if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) === 0) visible = false;
        if (/hidden|clip|scroll|auto/.test(s.overflowX)) { clip.x = Math.max(clip.x, pr.left); clip.right = Math.min(clip.right, pr.right); }
        if (/hidden|clip|scroll|auto/.test(s.overflowY)) { clip.y = Math.max(clip.y, pr.top); clip.bottom = Math.min(clip.bottom, pr.bottom); }
      }
      send('frame-layout', { frameId: id, rect: { x: r.x, y: r.y, width: r.width, height: r.height }, clip: { x: clip.x, y: clip.y, width: Math.max(0, clip.right - clip.x), height: Math.max(0, clip.bottom - clip.y) }, visible });
    }
  }
  // Bounded rate: layout updates do not contain page text or network data.
  setInterval(scan, 250);
  native.add.call(window, 'scroll', schedule, true);
  native.add.call(window, 'resize', schedule);
  return {
    create, scan, parent,
    attribute(el,key,value){if(!byElement.has(el)||!['width','height'].includes(key))return false;el[key]=String(value);schedule();return true;},
    source(name) {return name==='parent'?parent:name?.startsWith('sibling:')?sibling(name.slice(8)):frames.get(name)?.facade;},
    lookup(key) { if(typeof key!=='string')return;const live=[...frames.values()].filter(f=>f.el.isConnected);return (/^\d+$/.test(key)?live[Number(key)]:live.find(f=>f.el.name===key||f.el.id===key))?.facade; },
    get length() { return [...frames.values()].filter(f=>f.el.isConnected).length; },
    message(d) {
      const source = d.source === 'parent' ? parent : d.source?.startsWith('sibling:')?sibling(d.source.slice(8)):frames.get(d.source)?.facade;
      if (!source) return;
      const e = new MessageEvent('message', { data: d.data, origin: d.origin, ports:d.ports||[] });
      Object.defineProperty(e, 'source', { value: source }); dispatch(e);
    },
    loaded(id) { const el = frames.get(id)?.el; if (el) native.dispatch.call(el, new Event('load')); },
  };
}
