/* Best-effort static-page protections. Not an engine or OS network boundary. */
(() => {
 // Upstream rewriting also needs UUIDs inside classic Workers.
 const entropy=globalThis.crypto;
 if(entropy&&typeof entropy.randomUUID!=='function'&&typeof entropy.getRandomValues==='function')Object.defineProperty(entropy,'randomUUID',{value:function(){
  const b=new Uint8Array(16);entropy.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
  const h=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
 },configurable:false,writable:false});
 if(globalThis.__browzenPrivacy)return;
 const installed=new WeakSet(),protectedFunctions=new WeakSet(),define=Object.defineProperty;
 function install(g){
  if(installed.has(g))return;
  function fail(){throw new g.DOMException('Blocked by Browzen privacy controls.','SecurityError');}
  function lock(o,k,value){if(!o)return;const old=Object.getOwnPropertyDescriptor(o,k);if(old&&!old.configurable&&(old.value===value||(typeof old.value==='function'&&protectedFunctions.has(old.value))))return;if(typeof value==='function')protectedFunctions.add(value);define(o,k,{value,writable:false,configurable:false});}
  function read(o,k,value){if(!o)return;const old=Object.getOwnPropertyDescriptor(o,k);if(old&&!old.configurable&&old.get&&protectedFunctions.has(old.get))return;const get=()=>value;protectedFunctions.add(get);define(o,k,{get,configurable:false});}
  // Do not allow peer/data/ICE transports to start, even without media permissions.
  for(const key of ['RTCPeerConnection','webkitRTCPeerConnection','mozRTCPeerConnection','RTCIceTransport','RTCDtlsTransport','RTCSctpTransport','WebTransport'])if(key in g)lock(g,key,fail);
  const nav=g.navigator;
  if(nav){
   read(nav,'language','en-US');read(nav,'languages',Object.freeze(['en-US','en']));
   read(nav,'userAgent',nav.userAgent.replace(/\s+Browzen(?:\/[^\s]+)?$/,'')+' Browzen');
   for(const proto of [g.Navigator?.prototype,g.WorkerNavigator?.prototype])if(proto){
    for(const [k,v]of Object.entries({language:'en-US',languages:Object.freeze(['en-US','en'])}))if(k in proto)read(proto,k,v);
   }
  }
  // Rendering, fonts, canvas, audio and hardware information use native behavior.
  // Only locale/time defaults and network-leak protections are changed here.
  // A session-wide fixed JS UTC/English view, applied to each instrumented realm.
  // Native CSS/font/layout/engine behavior still depends on the outer browser.
  const D=g.Date,p=D.prototype,utcString=p.toUTCString,nativeParse=D.parse;
  const parseValue=v=>typeof v==='string'&&/^\d{4}-\d\d-\d\d[T ]\d\d:\d\d(?::\d\d(?:\.\d+)?)?$/.test(v)?v.replace(' ','T')+'Z':v;
  for(const name of ['FullYear','Month','Date','Day','Hours','Minutes','Seconds','Milliseconds'])if(p['getUTC'+name])lock(p,'get'+name,p['getUTC'+name]);
  for(const name of ['FullYear','Month','Date','Hours','Minutes','Seconds','Milliseconds'])if(p['setUTC'+name])lock(p,'set'+name,p['setUTC'+name]);
  lock(p,'getTimezoneOffset',function(){return Number.isNaN(this.getTime())?NaN:0;});
  lock(p,'getYear',function(){return this.getUTCFullYear()-1900;});
  lock(p,'setYear',function(y){y=Number(y);return this.setUTCFullYear(y>=0&&y<=99?y+1900:y);});
  const dateText=d=>{const s=Reflect.apply(utcString,d,[]);if(s==='Invalid Date')return s;const a=s.split(' ');return a[0].replace(',','')+' '+a[2]+' '+a[1]+' '+a[3];};
  const timeText=d=>{const s=Reflect.apply(utcString,d,[]);return s==='Invalid Date'?s:s.split(' ')[4]+' GMT+0000 (Coordinated Universal Time)';};
  const fullText=d=>Number.isNaN(d.getTime())?'Invalid Date':dateText(d)+' '+timeText(d);
  lock(p,'toString',function(){return fullText(this);});
  lock(p,'toDateString',function(){return dateText(this);});
  lock(p,'toTimeString',function(){return timeText(this);});
  for(const name of ['toLocaleString','toLocaleDateString','toLocaleTimeString']){const original=p[name];lock(p,name,function(locale,options){return Reflect.apply(original,this,[locale||'en-US',{...options,timeZone:options?.timeZone||'UTC'}]);});}
  const dateProxy=new Proxy(D,{apply(){return fullText(new D());},construct(target,args,newTarget){
   if(args.length>=2)return Reflect.construct(target,[D.UTC(...args)],newTarget);
   return Reflect.construct(target,args.length?[parseValue(args[0])]:[],newTarget);
  }});
  lock(D,'parse',v=>Reflect.apply(nativeParse,D,[parseValue(v)]));
  lock(p,'constructor',dateProxy);
  lock(g,'Date',dateProxy);
  if(g.Temporal?.Now?.timeZoneId)lock(g.Temporal.Now,'timeZoneId',()=>'UTC');
  for(const name of ['DateTimeFormat','NumberFormat','Collator','PluralRules','RelativeTimeFormat','ListFormat','DisplayNames','Segmenter']){
   const C=g.Intl?.[name];if(!C)continue;
   const options=a=>{const r=[...a];r[0]??='en-US';if(name==='DateTimeFormat')r[1]={...r[1],timeZone:r[1]?.timeZone||'UTC'};return r;};
   const wrapped=new Proxy(C,{apply:(t,that,a)=>Reflect.apply(t,that,options(a)),construct:(t,a,n)=>Reflect.construct(t,options(a),n)});
   if(C.prototype)lock(C.prototype,'constructor',wrapped);lock(g.Intl,name,wrapped);
  }
  // Neutralize ordinary dynamic DNS/preconnect hints before the proxy's DOM hooks wrap them.
  const hints=/\b(dns-prefetch|preconnect|prerender|prefetch)\b/i;
  const E=g.Element?.prototype,L=g.HTMLLinkElement?.prototype;
  if(g.Document?.prototype.execCommand){const command=g.Document.prototype.execCommand;lock(g.Document.prototype,'execCommand',function(name,...args){if(/^(copy|cut|paste)$/i.test(String(name)))return false;return Reflect.apply(command,this,[name,...args]);});}
  if(E){const set=E.setAttribute;define(E,'setAttribute',{configurable:true,writable:true,value:function(k,v){
   if(this.tagName==='LINK'&&((String(k).toLowerCase()==='rel'&&hints.test(String(v)))||(String(k).toLowerCase()==='href'&&hints.test(this.getAttribute('rel')||''))))return Reflect.apply(set,this,[k,'']);
   if(String(k).toLowerCase()==='ping')return Reflect.apply(set,this,[k,'']);return Reflect.apply(set,this,[k,v]);
  }});}
  if(L)for(const key of ['rel','href']){const d=Object.getOwnPropertyDescriptor(L,key);if(d?.set)define(L,key,{...d,set:function(value){if((key==='rel'&&hints.test(String(value)))||(key==='href'&&hints.test(this.rel)))value='';return Reflect.apply(d.set,this,[value]);}});}
  installed.add(g);
 }
 define(globalThis,'__browzenPrivacy',{value:Object.freeze({install}),writable:false,configurable:false});
})();


(() => {
  // work/Browzen/asset/single/idb.js
  var messages = {
    AbortError: "A request was aborted, for example through a call to IDBTransaction.abort.",
    ConstraintError: "A mutation operation in the transaction failed because a constraint was not satisfied. For example, an object such as an object store or index already exists and a request attempted to create a new one.",
    DataCloneError: "The data being stored could not be cloned by the internal structured cloning algorithm.",
    DataError: "Data provided to an operation does not meet requirements.",
    InvalidAccessError: "An invalid operation was performed on an object. For example transaction creation attempt was made, but an empty scope was provided.",
    InvalidStateError: "An operation was called on an object on which it is not allowed or at a time when it is not allowed. Also occurs if a request is made on a source object that has been deleted or removed. Use TransactionInactiveError or ReadOnlyError when possible, as they are more specific variations of InvalidStateError.",
    NotFoundError: "The operation failed because the requested database object could not be found. For example, an object store did not exist but was being opened.",
    ReadOnlyError: 'The mutating operation was attempted in a "readonly" transaction.',
    TransactionInactiveError: "A request was placed against a transaction which is currently not active, or which is finished.",
    SyntaxError: "The keypath argument contains an invalid key path",
    VersionError: "An attempt was made to open a database using a lower version than the existing version."
  };
  var setErrorCode = (error, value) => {
    Object.defineProperty(error, "code", {
      value,
      writable: false,
      enumerable: true,
      configurable: false
    });
  };
  var AbortError = class extends DOMException {
    constructor(message = messages.AbortError) {
      super(message, "AbortError");
    }
  };
  var ConstraintError = class extends DOMException {
    constructor(message = messages.ConstraintError) {
      super(message, "ConstraintError");
    }
  };
  var DataError = class extends DOMException {
    constructor(message = messages.DataError) {
      super(message, "DataError");
      setErrorCode(this, 0);
    }
  };
  var InvalidAccessError = class extends DOMException {
    constructor(message = messages.InvalidAccessError) {
      super(message, "InvalidAccessError");
    }
  };
  var InvalidStateError = class extends DOMException {
    constructor(message = messages.InvalidStateError) {
      super(message, "InvalidStateError");
      setErrorCode(this, 11);
    }
  };
  var NotFoundError = class extends DOMException {
    constructor(message = messages.NotFoundError) {
      super(message, "NotFoundError");
    }
  };
  var ReadOnlyError = class extends DOMException {
    constructor(message = messages.ReadOnlyError) {
      super(message, "ReadOnlyError");
    }
  };
  var SyntaxError = class extends DOMException {
    constructor(message = messages.VersionError) {
      super(message, "SyntaxError");
      setErrorCode(this, 12);
    }
  };
  var TransactionInactiveError = class extends DOMException {
    constructor(message = messages.TransactionInactiveError) {
      super(message, "TransactionInactiveError");
      setErrorCode(this, 0);
    }
  };
  var VersionError = class extends DOMException {
    constructor(message = messages.VersionError) {
      super(message, "VersionError");
    }
  };
  function isSharedArrayBuffer(input) {
    return typeof SharedArrayBuffer !== "undefined" && input instanceof SharedArrayBuffer;
  }
  var INVALID_TYPE = /* @__PURE__ */ Symbol("INVALID_TYPE");
  var INVALID_VALUE = /* @__PURE__ */ Symbol("INVALID_VALUE");
  var valueToKeyWithoutThrowing = (input, seen) => {
    if (typeof input === "number") {
      if (isNaN(input)) {
        return INVALID_VALUE;
      }
      return input;
    } else if (Object.prototype.toString.call(input) === "[object Date]") {
      const ms = input.valueOf();
      if (isNaN(ms)) {
        return INVALID_VALUE;
      }
      return new Date(ms);
    } else if (typeof input === "string") {
      return input;
    } else if (
      // https://w3c.github.io/IndexedDB/#ref-for-dfn-buffer-source-type
      input instanceof ArrayBuffer || isSharedArrayBuffer(input) || typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView && ArrayBuffer.isView(input)
    ) {
      if ("detached" in input ? input.detached : input.byteLength === 0) {
        return INVALID_VALUE;
      }
      let arrayBuffer;
      let offset = 0;
      let length = 0;
      if (input instanceof ArrayBuffer || isSharedArrayBuffer(input)) {
        arrayBuffer = input;
        length = input.byteLength;
      } else {
        arrayBuffer = input.buffer;
        offset = input.byteOffset;
        length = input.byteLength;
      }
      return arrayBuffer.slice(offset, offset + length);
    } else if (Array.isArray(input)) {
      if (seen === void 0) {
        seen = /* @__PURE__ */ new Set();
      } else if (seen.has(input)) {
        return INVALID_VALUE;
      }
      seen.add(input);
      let hasInvalid = false;
      const keys = Array.from({
        length: input.length
      }, (_, i) => {
        if (hasInvalid) {
          return;
        }
        const hop = Object.hasOwn(input, i);
        if (!hop) {
          hasInvalid = true;
          return;
        }
        const entry = input[i];
        const key = valueToKeyWithoutThrowing(entry, seen);
        if (key === INVALID_VALUE || key === INVALID_TYPE) {
          hasInvalid = true;
          return;
        }
        return key;
      });
      if (hasInvalid) {
        return INVALID_VALUE;
      }
      return keys;
    } else {
      return INVALID_TYPE;
    }
  };
  var valueToKeyWithoutThrowing_default = valueToKeyWithoutThrowing;
  var valueToKey = (input, seen) => {
    const result = valueToKeyWithoutThrowing_default(input, seen);
    if (result === INVALID_VALUE || result === INVALID_TYPE) {
      throw new DataError();
    }
    return result;
  };
  var valueToKey_default = valueToKey;
  var getType = (x) => {
    if (typeof x === "number") {
      return "Number";
    }
    if (Object.prototype.toString.call(x) === "[object Date]") {
      return "Date";
    }
    if (Array.isArray(x)) {
      return "Array";
    }
    if (typeof x === "string") {
      return "String";
    }
    if (x instanceof ArrayBuffer) {
      return "Binary";
    }
    throw new DataError();
  };
  var cmpKeys = (first, second) => {
    const t1 = getType(first);
    const t2 = getType(second);
    if (t1 !== t2) {
      if (t1 === "Array") {
        return 1;
      }
      if (t1 === "Binary" && (t2 === "String" || t2 === "Date" || t2 === "Number")) {
        return 1;
      }
      if (t1 === "String" && (t2 === "Date" || t2 === "Number")) {
        return 1;
      }
      if (t1 === "Date" && t2 === "Number") {
        return 1;
      }
      return -1;
    }
    if (t1 === "Binary") {
      const firstBytes = new Uint8Array(first);
      const secondBytes = new Uint8Array(second);
      const firstLen = firstBytes.length;
      const secondLen = secondBytes.length;
      const length = Math.min(firstLen, secondLen);
      for (let i = 0; i < length; i++) {
        if (firstBytes[i] > secondBytes[i]) {
          return 1;
        }
        if (firstBytes[i] < secondBytes[i]) {
          return -1;
        }
      }
      if (firstLen > secondLen) {
        return 1;
      }
      if (firstLen < secondLen) {
        return -1;
      }
      return 0;
    }
    if (t1 === "Array") {
      const length = Math.min(first.length, second.length);
      for (let i = 0; i < length; i++) {
        const result = cmpKeys(first[i], second[i]);
        if (result !== 0) {
          return result;
        }
      }
      if (first.length > second.length) {
        return 1;
      }
      if (first.length < second.length) {
        return -1;
      }
      return 0;
    }
    if (t1 === "Date") {
      if (first.getTime() === second.getTime()) {
        return 0;
      }
    } else {
      if (first === second) {
        return 0;
      }
    }
    return first > second ? 1 : -1;
  };
  var cmp = (first, second) => {
    if (second === void 0) {
      throw new TypeError();
    }
    return cmpKeys(valueToKey_default(first), valueToKey_default(second));
  };
  var cmp_default = cmp;
  var FDBKeyRange = class _FDBKeyRange {
    static only(value) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      value = valueToKey_default(value);
      return new _FDBKeyRange(value, value, false, false);
    }
    static lowerBound(lower, open = false) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      lower = valueToKey_default(lower);
      return new _FDBKeyRange(lower, void 0, open, true);
    }
    static upperBound(upper, open = false) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      upper = valueToKey_default(upper);
      return new _FDBKeyRange(void 0, upper, true, open);
    }
    static bound(lower, upper, lowerOpen = false, upperOpen = false) {
      if (arguments.length < 2) {
        throw new TypeError();
      }
      lower = valueToKey_default(lower);
      upper = valueToKey_default(upper);
      const cmpResult = cmpKeys(lower, upper);
      if (cmpResult === 1 || cmpResult === 0 && (lowerOpen || upperOpen)) {
        throw new DataError();
      }
      return new _FDBKeyRange(lower, upper, lowerOpen, upperOpen);
    }
    constructor(lower, upper, lowerOpen, upperOpen) {
      this.lower = lower;
      this.upper = upper;
      this.lowerOpen = lowerOpen;
      this.upperOpen = upperOpen;
    }
    // https://w3c.github.io/IndexedDB/#dom-idbkeyrange-includes
    includes(key) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      key = valueToKey_default(key);
      if (this.lower !== void 0) {
        const cmpResult = cmpKeys(this.lower, key);
        if (cmpResult === 1 || cmpResult === 0 && this.lowerOpen) {
          return false;
        }
      }
      if (this.upper !== void 0) {
        const cmpResult = cmpKeys(this.upper, key);
        if (cmpResult === -1 || cmpResult === 0 && this.upperOpen) {
          return false;
        }
      }
      return true;
    }
    get [Symbol.toStringTag]() {
      return "IDBKeyRange";
    }
  };
  var FDBKeyRange_default = FDBKeyRange;
  var extractKey = (keyPath, value) => {
    if (Array.isArray(keyPath)) {
      const result = [];
      for (let item of keyPath) {
        if (item !== void 0 && item !== null && typeof item !== "string" && item.toString) {
          item = item.toString();
        }
        const key = extractKey(item, value).key;
        result.push(valueToKey_default(key));
      }
      return {
        type: "found",
        key: result
      };
    }
    if (keyPath === "") {
      return {
        type: "found",
        key: value
      };
    }
    let remainingKeyPath = keyPath;
    let object = value;
    while (remainingKeyPath !== null) {
      let identifier;
      const i = remainingKeyPath.indexOf(".");
      if (i >= 0) {
        identifier = remainingKeyPath.slice(0, i);
        remainingKeyPath = remainingKeyPath.slice(i + 1);
      } else {
        identifier = remainingKeyPath;
        remainingKeyPath = null;
      }
      const isSpecialIdentifier = identifier === "length" && (typeof object === "string" || Array.isArray(object)) || (identifier === "size" || identifier === "type") && typeof Blob !== "undefined" && object instanceof Blob || (identifier === "name" || identifier === "lastModified") && typeof File !== "undefined" && object instanceof File;
      if (!isSpecialIdentifier && (typeof object !== "object" || object === null || !Object.hasOwn(object, identifier))) {
        return {
          type: "notFound"
        };
      }
      object = object[identifier];
    }
    return {
      type: "found",
      key: object
    };
  };
  var extractKey_default = extractKey;
  function cloneValueForInsertion(value, transaction) {
    if (transaction._state !== "active") {
      throw new Error("Assert: transaction state is active");
    }
    transaction._state = "inactive";
    try {
      return structuredClone(value);
    } finally {
      transaction._state = "active";
    }
  }
  var getEffectiveObjectStore = (cursor) => {
    if (cursor.source instanceof FDBObjectStore_default) {
      return cursor.source;
    }
    return cursor.source.objectStore;
  };
  var makeKeyRange = (range, lowers, uppers) => {
    let lower = range !== void 0 ? range.lower : void 0;
    let upper = range !== void 0 ? range.upper : void 0;
    for (const lowerTemp of lowers) {
      if (lowerTemp === void 0) {
        continue;
      }
      if (lower === void 0 || cmpKeys(lower, lowerTemp) === 1) {
        lower = lowerTemp;
      }
    }
    for (const upperTemp of uppers) {
      if (upperTemp === void 0) {
        continue;
      }
      if (upper === void 0 || cmpKeys(upper, upperTemp) === -1) {
        upper = upperTemp;
      }
    }
    if (lower !== void 0 && upper !== void 0) {
      return FDBKeyRange_default.bound(lower, upper);
    }
    if (lower !== void 0) {
      return FDBKeyRange_default.lowerBound(lower);
    }
    if (upper !== void 0) {
      return FDBKeyRange_default.upperBound(upper);
    }
  };
  var FDBCursor = class {
    _gotValue = false;
    _position = void 0;
    // Key of previously returned record
    _objectStorePosition = void 0;
    _keyOnly = false;
    _key = void 0;
    _primaryKey = void 0;
    constructor(source, range, direction = "next", request, keyOnly = false) {
      this._range = range;
      this._source = source;
      this._direction = direction;
      this._request = request;
      this._keyOnly = keyOnly;
    }
    // Read only properties
    get source() {
      return this._source;
    }
    set source(val) {
    }
    get request() {
      return this._request;
    }
    set request(val) {
    }
    get direction() {
      return this._direction;
    }
    set direction(val) {
    }
    get key() {
      return this._key;
    }
    set key(val) {
    }
    get primaryKey() {
      return this._primaryKey;
    }
    set primaryKey(val) {
    }
    // https://w3c.github.io/IndexedDB/#iterate-a-cursor
    _iterate(key, primaryKey) {
      const sourceIsObjectStore = this.source instanceof FDBObjectStore_default;
      const records = this.source instanceof FDBObjectStore_default ? this.source._rawObjectStore.records : this.source._rawIndex.records;
      let foundRecord;
      if (this.direction === "next") {
        const range = makeKeyRange(this._range, [key, this._position], []);
        for (const record of records.values(range)) {
          const cmpResultKey = key !== void 0 ? cmpKeys(record.key, key) : void 0;
          const cmpResultPosition = this._position !== void 0 ? cmpKeys(record.key, this._position) : void 0;
          if (key !== void 0) {
            if (cmpResultKey === -1) {
              continue;
            }
          }
          if (primaryKey !== void 0) {
            if (cmpResultKey === -1) {
              continue;
            }
            const cmpResultPrimaryKey = cmpKeys(record.value, primaryKey);
            if (cmpResultKey === 0 && cmpResultPrimaryKey === -1) {
              continue;
            }
          }
          if (this._position !== void 0 && sourceIsObjectStore) {
            if (cmpResultPosition !== 1) {
              continue;
            }
          }
          if (this._position !== void 0 && !sourceIsObjectStore) {
            if (cmpResultPosition === -1) {
              continue;
            }
            if (cmpResultPosition === 0 && cmpKeys(record.value, this._objectStorePosition) !== 1) {
              continue;
            }
          }
          if (this._range !== void 0) {
            if (!this._range.includes(record.key)) {
              continue;
            }
          }
          foundRecord = record;
          break;
        }
      } else if (this.direction === "nextunique") {
        const range = makeKeyRange(this._range, [key, this._position], []);
        for (const record of records.values(range)) {
          if (key !== void 0) {
            if (cmpKeys(record.key, key) === -1) {
              continue;
            }
          }
          if (this._position !== void 0) {
            if (cmpKeys(record.key, this._position) !== 1) {
              continue;
            }
          }
          if (this._range !== void 0) {
            if (!this._range.includes(record.key)) {
              continue;
            }
          }
          foundRecord = record;
          break;
        }
      } else if (this.direction === "prev") {
        const range = makeKeyRange(this._range, [], [key, this._position]);
        for (const record of records.values(range, "prev")) {
          const cmpResultKey = key !== void 0 ? cmpKeys(record.key, key) : void 0;
          const cmpResultPosition = this._position !== void 0 ? cmpKeys(record.key, this._position) : void 0;
          if (key !== void 0) {
            if (cmpResultKey === 1) {
              continue;
            }
          }
          if (primaryKey !== void 0) {
            if (cmpResultKey === 1) {
              continue;
            }
            const cmpResultPrimaryKey = cmpKeys(record.value, primaryKey);
            if (cmpResultKey === 0 && cmpResultPrimaryKey === 1) {
              continue;
            }
          }
          if (this._position !== void 0 && sourceIsObjectStore) {
            if (cmpResultPosition !== -1) {
              continue;
            }
          }
          if (this._position !== void 0 && !sourceIsObjectStore) {
            if (cmpResultPosition === 1) {
              continue;
            }
            if (cmpResultPosition === 0 && cmpKeys(record.value, this._objectStorePosition) !== -1) {
              continue;
            }
          }
          if (this._range !== void 0) {
            if (!this._range.includes(record.key)) {
              continue;
            }
          }
          foundRecord = record;
          break;
        }
      } else if (this.direction === "prevunique") {
        let tempRecord;
        const range = makeKeyRange(this._range, [], [key, this._position]);
        for (const record of records.values(range, "prev")) {
          if (key !== void 0) {
            if (cmpKeys(record.key, key) === 1) {
              continue;
            }
          }
          if (this._position !== void 0) {
            if (cmpKeys(record.key, this._position) !== -1) {
              continue;
            }
          }
          if (this._range !== void 0) {
            if (!this._range.includes(record.key)) {
              continue;
            }
          }
          tempRecord = record;
          break;
        }
        if (tempRecord) {
          foundRecord = records.get(tempRecord.key);
        }
      }
      let result;
      if (!foundRecord) {
        this._key = void 0;
        if (!sourceIsObjectStore) {
          this._objectStorePosition = void 0;
        }
        if (!this._keyOnly && this.toString() === "[object IDBCursorWithValue]") {
          this.value = void 0;
        }
        result = null;
      } else {
        this._position = foundRecord.key;
        if (!sourceIsObjectStore) {
          this._objectStorePosition = foundRecord.value;
        }
        this._key = foundRecord.key;
        if (sourceIsObjectStore) {
          this._primaryKey = structuredClone(foundRecord.key);
          if (!this._keyOnly && this.toString() === "[object IDBCursorWithValue]") {
            this.value = structuredClone(foundRecord.value);
          }
        } else {
          this._primaryKey = structuredClone(foundRecord.value);
          if (!this._keyOnly && this.toString() === "[object IDBCursorWithValue]") {
            if (this.source instanceof FDBObjectStore_default) {
              throw new Error("This should never happen");
            }
            const value = this.source.objectStore._rawObjectStore.getValue(foundRecord.value);
            this.value = structuredClone(value);
          }
        }
        this._gotValue = true;
        result = this;
      }
      return result;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-update-IDBRequest-any-value
    update(value) {
      if (value === void 0) {
        throw new TypeError();
      }
      const effectiveObjectStore = getEffectiveObjectStore(this);
      const effectiveKey = Object.hasOwn(this.source, "_rawIndex") ? this.primaryKey : this._position;
      const transaction = effectiveObjectStore.transaction;
      if (transaction._state !== "active") {
        throw new TransactionInactiveError();
      }
      if (transaction.mode === "readonly") {
        throw new ReadOnlyError();
      }
      if (effectiveObjectStore._rawObjectStore.deleted) {
        throw new InvalidStateError();
      }
      if (!(this.source instanceof FDBObjectStore_default) && this.source._rawIndex.deleted) {
        throw new InvalidStateError();
      }
      if (!this._gotValue || !Object.hasOwn(this, "value")) {
        throw new InvalidStateError();
      }
      const clone = cloneValueForInsertion(value, transaction);
      if (effectiveObjectStore.keyPath !== null) {
        let tempKey;
        try {
          tempKey = extractKey_default(effectiveObjectStore.keyPath, clone).key;
        } catch (err) {
        }
        if (cmp_default(tempKey, effectiveKey) !== 0) {
          throw new DataError();
        }
      }
      const record = {
        key: effectiveKey,
        value: clone
      };
      return transaction._execRequestAsync({
        operation: effectiveObjectStore._rawObjectStore.storeRecord.bind(effectiveObjectStore._rawObjectStore, record, false, transaction._rollbackLog),
        source: this
      });
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-advance-void-unsigned-long-count
    advance(count) {
      if (!Number.isInteger(count) || count <= 0) {
        throw new TypeError();
      }
      const effectiveObjectStore = getEffectiveObjectStore(this);
      const transaction = effectiveObjectStore.transaction;
      if (transaction._state !== "active") {
        throw new TransactionInactiveError();
      }
      if (effectiveObjectStore._rawObjectStore.deleted) {
        throw new InvalidStateError();
      }
      if (!(this.source instanceof FDBObjectStore_default) && this.source._rawIndex.deleted) {
        throw new InvalidStateError();
      }
      if (!this._gotValue) {
        throw new InvalidStateError();
      }
      if (this._request) {
        this._request.readyState = "pending";
      }
      transaction._execRequestAsync({
        operation: () => {
          let result;
          for (let i = 0; i < count; i++) {
            result = this._iterate();
            if (!result) {
              break;
            }
          }
          return result;
        },
        request: this._request,
        source: this.source
      });
      this._gotValue = false;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-continue-void-any-key
    continue(key) {
      const effectiveObjectStore = getEffectiveObjectStore(this);
      const transaction = effectiveObjectStore.transaction;
      if (transaction._state !== "active") {
        throw new TransactionInactiveError();
      }
      if (effectiveObjectStore._rawObjectStore.deleted) {
        throw new InvalidStateError();
      }
      if (!(this.source instanceof FDBObjectStore_default) && this.source._rawIndex.deleted) {
        throw new InvalidStateError();
      }
      if (!this._gotValue) {
        throw new InvalidStateError();
      }
      if (key !== void 0) {
        key = valueToKey_default(key);
        const cmpResult = cmpKeys(key, this._position);
        if (cmpResult <= 0 && (this.direction === "next" || this.direction === "nextunique") || cmpResult >= 0 && (this.direction === "prev" || this.direction === "prevunique")) {
          throw new DataError();
        }
      }
      if (this._request) {
        this._request.readyState = "pending";
      }
      transaction._execRequestAsync({
        operation: this._iterate.bind(this, key),
        request: this._request,
        source: this.source
      });
      this._gotValue = false;
    }
    // hthttps://w3c.github.io/IndexedDB/#dom-idbcursor-continueprimarykey
    continuePrimaryKey(key, primaryKey) {
      const effectiveObjectStore = getEffectiveObjectStore(this);
      const transaction = effectiveObjectStore.transaction;
      if (transaction._state !== "active") {
        throw new TransactionInactiveError();
      }
      if (effectiveObjectStore._rawObjectStore.deleted) {
        throw new InvalidStateError();
      }
      if (!(this.source instanceof FDBObjectStore_default) && this.source._rawIndex.deleted) {
        throw new InvalidStateError();
      }
      if (this.source instanceof FDBObjectStore_default || this.direction !== "next" && this.direction !== "prev") {
        throw new InvalidAccessError();
      }
      if (!this._gotValue) {
        throw new InvalidStateError();
      }
      if (key === void 0 || primaryKey === void 0) {
        throw new DataError();
      }
      key = valueToKey_default(key);
      const cmpResult = cmpKeys(key, this._position);
      if (cmpResult === -1 && this.direction === "next" || cmpResult === 1 && this.direction === "prev") {
        throw new DataError();
      }
      primaryKey = valueToKey_default(primaryKey);
      const cmpResult2 = cmpKeys(primaryKey, this._objectStorePosition);
      if (cmpResult === 0) {
        if (cmpResult2 <= 0 && this.direction === "next" || cmpResult2 >= 0 && this.direction === "prev") {
          throw new DataError();
        }
      }
      if (this._request) {
        this._request.readyState = "pending";
      }
      transaction._execRequestAsync({
        operation: this._iterate.bind(this, key, primaryKey),
        request: this._request,
        source: this.source
      });
      this._gotValue = false;
    }
    delete() {
      const effectiveObjectStore = getEffectiveObjectStore(this);
      const effectiveKey = Object.hasOwn(this.source, "_rawIndex") ? this.primaryKey : this._position;
      const transaction = effectiveObjectStore.transaction;
      if (transaction._state !== "active") {
        throw new TransactionInactiveError();
      }
      if (transaction.mode === "readonly") {
        throw new ReadOnlyError();
      }
      if (effectiveObjectStore._rawObjectStore.deleted) {
        throw new InvalidStateError();
      }
      if (!(this.source instanceof FDBObjectStore_default) && this.source._rawIndex.deleted) {
        throw new InvalidStateError();
      }
      if (!this._gotValue || !Object.hasOwn(this, "value")) {
        throw new InvalidStateError();
      }
      return transaction._execRequestAsync({
        operation: effectiveObjectStore._rawObjectStore.deleteRecord.bind(effectiveObjectStore._rawObjectStore, effectiveKey, transaction._rollbackLog),
        source: this
      });
    }
    get [Symbol.toStringTag]() {
      return "IDBCursor";
    }
  };
  var FDBCursor_default = FDBCursor;
  var FDBCursorWithValue = class extends FDBCursor_default {
    value = void 0;
    constructor(source, range, direction, request) {
      super(source, range, direction, request);
    }
    get [Symbol.toStringTag]() {
      return "IDBCursorWithValue";
    }
  };
  var FDBCursorWithValue_default = FDBCursorWithValue;
  var stopped = (event, listener) => {
    return event.immediatePropagationStopped || event.eventPhase === event.CAPTURING_PHASE && listener.capture === false || event.eventPhase === event.BUBBLING_PHASE && listener.capture === true;
  };
  var invokeEventListeners = (event, obj) => {
    event.currentTarget = obj;
    const errors = [];
    const invoke = (callbackOrObject) => {
      try {
        const callback2 = typeof callbackOrObject === "function" ? callbackOrObject : callbackOrObject.handleEvent;
        callback2.call(event.currentTarget, event);
      } catch (err) {
        errors.push(err);
      }
    };
    for (const listener of obj.listeners.slice()) {
      if (event.type !== listener.type || stopped(event, listener)) {
        continue;
      }
      invoke(listener.callback);
    }
    const typeToProp = {
      abort: "onabort",
      blocked: "onblocked",
      close: "onclose",
      complete: "oncomplete",
      error: "onerror",
      success: "onsuccess",
      upgradeneeded: "onupgradeneeded",
      versionchange: "onversionchange"
    };
    const prop = typeToProp[event.type];
    if (prop === void 0) {
      throw new Error(`Unknown event type: "${event.type}"`);
    }
    const callback = event.currentTarget[prop];
    if (callback) {
      const listener = {
        callback,
        capture: false,
        type: event.type
      };
      if (!stopped(event, listener)) {
        invoke(listener.callback);
      }
    }
    if (errors.length) {
      throw new AggregateError(errors);
    }
  };
  var FakeEventTarget = class {
    listeners = [];
    // These will be overridden in individual subclasses and made not readonly
    addEventListener(type, callback, options) {
      const capture = !!(typeof options === "object" && options ? options.capture : options);
      this.listeners.push({
        callback,
        capture,
        type
      });
    }
    removeEventListener(type, callback, options) {
      const capture = !!(typeof options === "object" && options ? options.capture : options);
      const i = this.listeners.findIndex((listener) => {
        return listener.type === type && listener.callback === callback && listener.capture === capture;
      });
      this.listeners.splice(i, 1);
    }
    // http://www.w3.org/TR/dom/#dispatching-events
    dispatchEvent(event) {
      if (event.dispatched || !event.initialized) {
        throw new InvalidStateError("The object is in an invalid state.");
      }
      event.isTrusted = false;
      event.dispatched = true;
      event.target = this;
      event.eventPhase = event.CAPTURING_PHASE;
      for (const obj of event.eventPath) {
        if (!event.propagationStopped) {
          invokeEventListeners(event, obj);
        }
      }
      event.eventPhase = event.AT_TARGET;
      if (!event.propagationStopped) {
        invokeEventListeners(event, event.target);
      }
      if (event.bubbles) {
        event.eventPath.reverse();
        event.eventPhase = event.BUBBLING_PHASE;
        for (const obj of event.eventPath) {
          if (!event.propagationStopped) {
            invokeEventListeners(event, obj);
          }
        }
      }
      event.dispatched = false;
      event.eventPhase = event.NONE;
      event.currentTarget = null;
      if (event.canceled) {
        return false;
      }
      return true;
    }
  };
  var FakeEventTarget_default = FakeEventTarget;
  var FDBRequest = class extends FakeEventTarget_default {
    _result = null;
    _error = null;
    source = null;
    transaction = null;
    readyState = "pending";
    onsuccess = null;
    onerror = null;
    get error() {
      if (this.readyState === "pending") {
        throw new InvalidStateError();
      }
      return this._error;
    }
    set error(value) {
      this._error = value;
    }
    get result() {
      if (this.readyState === "pending") {
        throw new InvalidStateError();
      }
      return this._result;
    }
    set result(value) {
      this._result = value;
    }
    get [Symbol.toStringTag]() {
      return "IDBRequest";
    }
  };
  var FDBRequest_default = FDBRequest;
  var FakeDOMStringList = class {
    constructor(...values) {
      this._values = values;
      for (let i = 0; i < values.length; i++) {
        this[i] = values[i];
      }
    }
    contains(value) {
      return this._values.includes(value);
    }
    item(i) {
      if (i < 0 || i >= this._values.length) {
        return null;
      }
      return this._values[i];
    }
    get length() {
      return this._values.length;
    }
    [Symbol.iterator]() {
      return this._values[Symbol.iterator]();
    }
    // Handled by proxy
    // Used internally, should not be used by others. I could maybe get rid of these and replace rather than mutate, but too lazy to check the spec.
    _push(...values) {
      for (let i = 0; i < values.length; i++) {
        this[this._values.length + i] = values[i];
      }
      this._values.push(...values);
    }
    _sort(...values) {
      this._values.sort(...values);
      for (let i = 0; i < this._values.length; i++) {
        this[i] = this._values[i];
      }
      return this;
    }
  };
  var FakeDOMStringList_default = FakeDOMStringList;
  var valueToKeyRange = (value, nullDisallowedFlag = false) => {
    if (value instanceof FDBKeyRange_default) {
      return value;
    }
    if (value === null || value === void 0) {
      if (nullDisallowedFlag) {
        throw new DataError();
      }
      return new FDBKeyRange_default(void 0, void 0, false, false);
    }
    const key = valueToKey_default(value);
    return FDBKeyRange_default.only(key);
  };
  var valueToKeyRange_default = valueToKeyRange;
  var convertKey = (key) => typeof key === "object" && key ? key + "" : key;
  function getKeyPath(keyPath) {
    return Array.isArray(keyPath) ? keyPath.map(convertKey) : convertKey(keyPath);
  }
  var isPotentiallyValidKeyRange = (value) => {
    if (value instanceof FDBKeyRange_default) {
      return true;
    }
    const key = valueToKeyWithoutThrowing_default(value);
    return key !== INVALID_TYPE;
  };
  var isPotentiallyValidKeyRange_default = isPotentiallyValidKeyRange;
  var enforceRange = (num, type) => {
    const min = 0;
    const max = type === "unsigned long" ? 4294967295 : 9007199254740991;
    if (isNaN(num) || num < min || num > max) {
      throw new TypeError();
    }
    if (num >= 0) {
      return Math.floor(num);
    }
  };
  var enforceRange_default = enforceRange;
  var extractGetAllOptions = (queryOrOptions, count, numArguments) => {
    let query;
    let direction;
    if (queryOrOptions === void 0 || queryOrOptions === null || isPotentiallyValidKeyRange_default(queryOrOptions)) {
      query = queryOrOptions;
      if (numArguments > 1 && count !== void 0) {
        count = enforceRange_default(count, "unsigned long");
      }
    } else {
      const getAllOptions = queryOrOptions;
      if (getAllOptions.query !== void 0) {
        query = getAllOptions.query;
      }
      if (getAllOptions.count !== void 0) {
        count = enforceRange_default(getAllOptions.count, "unsigned long");
      }
      if (getAllOptions.direction !== void 0) {
        direction = getAllOptions.direction;
      }
    }
    return {
      query,
      count,
      direction
    };
  };
  var extractGetAllOptions_default = extractGetAllOptions;
  var confirmActiveTransaction = (index) => {
    if (index._rawIndex.deleted || index.objectStore._rawObjectStore.deleted) {
      throw new InvalidStateError();
    }
    if (index.objectStore.transaction._state !== "active") {
      throw new TransactionInactiveError();
    }
  };
  var FDBIndex = class {
    constructor(objectStore, rawIndex) {
      this._rawIndex = rawIndex;
      this._name = rawIndex.name;
      this.objectStore = objectStore;
      this.keyPath = getKeyPath(rawIndex.keyPath);
      this.multiEntry = rawIndex.multiEntry;
      this.unique = rawIndex.unique;
    }
    get name() {
      return this._name;
    }
    // https://w3c.github.io/IndexedDB/#dom-idbindex-name
    set name(name) {
      const transaction = this.objectStore.transaction;
      if (!transaction.db._runningVersionchangeTransaction) {
        throw transaction._state === "active" ? new InvalidStateError() : new TransactionInactiveError();
      }
      if (transaction._state !== "active") {
        throw new TransactionInactiveError();
      }
      if (this._rawIndex.deleted || this.objectStore._rawObjectStore.deleted) {
        throw new InvalidStateError();
      }
      name = String(name);
      if (name === this._name) {
        return;
      }
      if (this.objectStore.indexNames.contains(name)) {
        throw new ConstraintError();
      }
      const oldName = this._name;
      const oldIndexNames = [...this.objectStore.indexNames];
      this._name = name;
      this._rawIndex.name = name;
      this.objectStore._indexesCache.delete(oldName);
      this.objectStore._indexesCache.set(name, this);
      this.objectStore._rawObjectStore.rawIndexes.delete(oldName);
      this.objectStore._rawObjectStore.rawIndexes.set(name, this._rawIndex);
      this.objectStore.indexNames = new FakeDOMStringList_default(...Array.from(this.objectStore._rawObjectStore.rawIndexes.keys()).filter((indexName) => {
        const index = this.objectStore._rawObjectStore.rawIndexes.get(indexName);
        return index && !index.deleted;
      }).sort());
      if (!this.objectStore.transaction._createdIndexes.has(this._rawIndex)) {
        transaction._rollbackLog.push(() => {
          this._name = oldName;
          this._rawIndex.name = oldName;
          this.objectStore._indexesCache.delete(name);
          this.objectStore._indexesCache.set(oldName, this);
          this.objectStore._rawObjectStore.rawIndexes.delete(name);
          this.objectStore._rawObjectStore.rawIndexes.set(oldName, this._rawIndex);
          this.objectStore.indexNames = new FakeDOMStringList_default(...oldIndexNames);
        });
      }
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-openCursor-IDBRequest-any-range-IDBCursorDirection-direction
    openCursor(range, direction) {
      confirmActiveTransaction(this);
      if (range === null) {
        range = void 0;
      }
      if (range !== void 0 && !(range instanceof FDBKeyRange_default)) {
        range = FDBKeyRange_default.only(valueToKey_default(range));
      }
      const request = new FDBRequest_default();
      request.source = this;
      request.transaction = this.objectStore.transaction;
      const cursor = new FDBCursorWithValue_default(this, range, direction, request);
      return this.objectStore.transaction._execRequestAsync({
        operation: cursor._iterate.bind(cursor),
        request,
        source: this
      });
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-openKeyCursor-IDBRequest-any-range-IDBCursorDirection-direction
    openKeyCursor(range, direction) {
      confirmActiveTransaction(this);
      if (range === null) {
        range = void 0;
      }
      if (range !== void 0 && !(range instanceof FDBKeyRange_default)) {
        range = FDBKeyRange_default.only(valueToKey_default(range));
      }
      const request = new FDBRequest_default();
      request.source = this;
      request.transaction = this.objectStore.transaction;
      const cursor = new FDBCursor_default(this, range, direction, request, true);
      return this.objectStore.transaction._execRequestAsync({
        operation: cursor._iterate.bind(cursor),
        request,
        source: this
      });
    }
    get(key) {
      confirmActiveTransaction(this);
      if (!(key instanceof FDBKeyRange_default)) {
        key = valueToKey_default(key);
      }
      return this.objectStore.transaction._execRequestAsync({
        operation: this._rawIndex.getValue.bind(this._rawIndex, key),
        source: this
      });
    }
    // http://w3c.github.io/IndexedDB/#dom-idbindex-getall
    getAll(queryOrOptions, count) {
      const options = extractGetAllOptions_default(queryOrOptions, count, arguments.length);
      confirmActiveTransaction(this);
      const range = valueToKeyRange_default(options.query);
      return this.objectStore.transaction._execRequestAsync({
        operation: this._rawIndex.getAllValues.bind(this._rawIndex, range, options.count, options.direction),
        source: this
      });
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-getKey-IDBRequest-any-key
    getKey(key) {
      confirmActiveTransaction(this);
      if (!(key instanceof FDBKeyRange_default)) {
        key = valueToKey_default(key);
      }
      return this.objectStore.transaction._execRequestAsync({
        operation: this._rawIndex.getKey.bind(this._rawIndex, key),
        source: this
      });
    }
    // http://w3c.github.io/IndexedDB/#dom-idbindex-getallkeys
    getAllKeys(queryOrOptions, count) {
      const options = extractGetAllOptions_default(queryOrOptions, count, arguments.length);
      confirmActiveTransaction(this);
      const range = valueToKeyRange_default(options.query);
      return this.objectStore.transaction._execRequestAsync({
        operation: this._rawIndex.getAllKeys.bind(this._rawIndex, range, options.count, options.direction),
        source: this
      });
    }
    // https://www.w3.org/TR/IndexedDB/#dom-idbobjectstore-getallrecords
    getAllRecords(options) {
      let query;
      let count;
      let direction;
      if (options !== void 0) {
        if (options.query !== void 0) {
          query = options.query;
        }
        if (options.count !== void 0) {
          count = enforceRange_default(options.count, "unsigned long");
        }
        if (options.direction !== void 0) {
          direction = options.direction;
        }
      }
      confirmActiveTransaction(this);
      const range = valueToKeyRange_default(query);
      return this.objectStore.transaction._execRequestAsync({
        operation: this._rawIndex.getAllRecords.bind(this._rawIndex, range, count, direction),
        source: this
      });
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-count-IDBRequest-any-key
    count(key) {
      confirmActiveTransaction(this);
      if (key === null) {
        key = void 0;
      }
      if (key !== void 0 && !(key instanceof FDBKeyRange_default)) {
        key = FDBKeyRange_default.only(valueToKey_default(key));
      }
      return this.objectStore.transaction._execRequestAsync({
        operation: () => {
          return this._rawIndex.count(key);
        },
        source: this
      });
    }
    get [Symbol.toStringTag]() {
      return "IDBIndex";
    }
  };
  var FDBIndex_default = FDBIndex;
  var canInjectKey = (keyPath, value) => {
    if (Array.isArray(keyPath)) {
      throw new Error("The key paths used in this section are always strings and never sequences, since it is not possible to create a object store which has a key generator and also has a key path that is a sequence.");
    }
    const identifiers = keyPath.split(".");
    if (identifiers.length === 0) {
      throw new Error("Assert: identifiers is not empty");
    }
    identifiers.pop();
    for (const identifier of identifiers) {
      if (typeof value !== "object" && !Array.isArray(value)) {
        return false;
      }
      const hop = Object.hasOwn(value, identifier);
      if (!hop) {
        return true;
      }
      value = value[identifier];
    }
    return typeof value === "object" || Array.isArray(value);
  };
  var canInjectKey_default = canInjectKey;
  var FDBRecord = class {
    constructor(key, primaryKey, value) {
      this._key = key;
      this._primaryKey = primaryKey;
      this._value = value;
    }
    get key() {
      return this._key;
    }
    set key(_) {
    }
    get primaryKey() {
      return this._primaryKey;
    }
    set primaryKey(_) {
    }
    get value() {
      return this._value;
    }
    set value(_) {
    }
    get [Symbol.toStringTag]() {
      return "IDBRecord";
    }
  };
  var FDBRecord_default = FDBRecord;
  var MAX_TOMBSTONE_FACTOR = 2 / 3;
  var EVERYTHING_KEY_RANGE = new FDBKeyRange_default(void 0, void 0, false, false);
  var BinarySearchTree = class {
    _numTombstones = 0;
    _numNodes = 0;
    /**
     *
     * @param keysAreUnique - whether keys can be unique, and thus whether we cn skip checking `record.value` when
     * comparing. This is basically used to distinguish ObjectStores (where the value is the entire object, not used
     * as a key) from non-unique Indexes (where both the key and the value are meaningful keys used for sorting)
     */
    constructor(keysAreUnique) {
      this._keysAreUnique = !!keysAreUnique;
    }
    size() {
      return this._numNodes - this._numTombstones;
    }
    get(record) {
      return this._getByComparator(this._root, (otherRecord) => this._compare(record, otherRecord));
    }
    contains(record) {
      return !!this.get(record);
    }
    _compare(a, b) {
      const keyComparison = cmpKeys(a.key, b.key);
      if (keyComparison !== 0) {
        return keyComparison;
      }
      return this._keysAreUnique ? 0 : cmpKeys(a.value, b.value);
    }
    _getByComparator(node, comparator) {
      let current = node;
      while (current) {
        const comparison = comparator(current.record);
        if (comparison < 0) {
          current = current.left;
        } else if (comparison > 0) {
          current = current.right;
        } else {
          return current.record;
        }
      }
    }
    /**
     * Put a new record, and return the overwritten record if an overwrite occurred.
     * @param record
     * @param noOverwrite - throw a ConstraintError in case of overwrite
     */
    put(record, noOverwrite = false) {
      if (!this._root) {
        this._root = {
          record,
          left: void 0,
          right: void 0,
          parent: void 0,
          deleted: false,
          // the root is always black in a red-black tree
          red: false
        };
        this._numNodes++;
        return;
      }
      return this._put(this._root, record, noOverwrite);
    }
    _put(node, record, noOverwrite) {
      const comparison = this._compare(record, node.record);
      if (comparison < 0) {
        if (node.left) {
          return this._put(node.left, record, noOverwrite);
        } else {
          node.left = {
            record,
            left: void 0,
            right: void 0,
            parent: node,
            deleted: false,
            red: true
          };
          this._onNewNodeInserted(node.left);
        }
      } else if (comparison > 0) {
        if (node.right) {
          return this._put(node.right, record, noOverwrite);
        } else {
          node.right = {
            record,
            left: void 0,
            right: void 0,
            parent: node,
            deleted: false,
            red: true
          };
          this._onNewNodeInserted(node.right);
        }
      } else if (node.deleted) {
        node.deleted = false;
        node.record = record;
        this._numTombstones--;
      } else if (noOverwrite) {
        throw new ConstraintError();
      } else {
        const overwrittenRecord = node.record;
        node.record = record;
        return overwrittenRecord;
      }
    }
    delete(record) {
      if (!this._root) {
        return;
      }
      this._delete(this._root, record);
      if (this._numTombstones > this._numNodes * MAX_TOMBSTONE_FACTOR) {
        const records = [...this.getAllRecords()];
        this._root = this._rebuild(records, void 0, false);
        this._numNodes = records.length;
        this._numTombstones = 0;
      }
    }
    _delete(node, record) {
      if (!node) {
        return;
      }
      const comparison = this._compare(record, node.record);
      if (comparison < 0) {
        this._delete(node.left, record);
      } else if (comparison > 0) {
        this._delete(node.right, record);
      } else if (!node.deleted) {
        this._numTombstones++;
        node.deleted = true;
      }
    }
    *getAllRecords(descending = false) {
      yield* this.getRecords(EVERYTHING_KEY_RANGE, descending);
    }
    *getRecords(keyRange, descending = false) {
      yield* this._getRecordsForNode(this._root, keyRange, descending);
    }
    *_getRecordsForNode(node, keyRange, descending = false) {
      if (!node) {
        return;
      }
      yield* this._findRecords(node, keyRange, descending);
    }
    *_findRecords(node, keyRange, descending = false) {
      const {
        lower,
        upper,
        lowerOpen,
        upperOpen
      } = keyRange;
      const {
        record: {
          key
        }
      } = node;
      const lowerComparison = lower === void 0 ? -1 : cmpKeys(lower, key);
      const upperComparison = upper === void 0 ? 1 : cmpKeys(upper, key);
      const moreLeft = this._keysAreUnique ? lowerComparison < 0 : lowerComparison <= 0;
      const moreRight = this._keysAreUnique ? upperComparison > 0 : upperComparison >= 0;
      const moreStart = descending ? moreRight : moreLeft;
      const moreEnd = descending ? moreLeft : moreRight;
      const start = descending ? "right" : "left";
      const end = descending ? "left" : "right";
      const lowerMatches = lowerOpen ? lowerComparison < 0 : lowerComparison <= 0;
      const upperMatches = upperOpen ? upperComparison > 0 : upperComparison >= 0;
      if (moreStart && node[start]) {
        yield* this._findRecords(node[start], keyRange, descending);
      }
      if (lowerMatches && upperMatches && !node.deleted) {
        yield node.record;
      }
      if (moreEnd && node[end]) {
        yield* this._findRecords(node[end], keyRange, descending);
      }
    }
    _onNewNodeInserted(newNode) {
      this._numNodes++;
      this._rebalanceTree(newNode);
    }
    // based on https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Insertion
    _rebalanceTree(node) {
      let parent2 = node.parent;
      do {
        if (!parent2.red) {
          return;
        }
        const grandparent = parent2.parent;
        if (!grandparent) {
          parent2.red = false;
          return;
        }
        const parentIsRightChild = parent2 === grandparent.right;
        const uncle = parentIsRightChild ? grandparent.left : grandparent.right;
        if (!uncle || !uncle.red) {
          if (node === (parentIsRightChild ? parent2.left : parent2.right)) {
            this._rotateSubtree(parent2, parentIsRightChild);
            node = parent2;
            parent2 = parentIsRightChild ? grandparent.right : grandparent.left;
          }
          this._rotateSubtree(grandparent, !parentIsRightChild);
          parent2.red = false;
          grandparent.red = true;
          return;
        }
        parent2.red = false;
        uncle.red = false;
        grandparent.red = true;
        node = grandparent;
      } while (node.parent ? parent2 = node.parent : false);
    }
    // based on https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Implementation
    _rotateSubtree(node, right) {
      const parent2 = node.parent;
      const newRoot = right ? node.left : node.right;
      const newChild = right ? newRoot.right : newRoot.left;
      node[right ? "left" : "right"] = newChild;
      if (newChild) {
        newChild.parent = node;
      }
      newRoot[right ? "right" : "left"] = node;
      newRoot.parent = parent2;
      node.parent = newRoot;
      if (parent2) {
        parent2[node === parent2.right ? "right" : "left"] = newRoot;
      } else {
        this._root = newRoot;
      }
      return newRoot;
    }
    // rebuild the whole tree from scratch, used to avoid too many deletion tombstones accumulating
    _rebuild(records, parent2, red, startIndex = 0, endIndex = records.length) {
      const length = endIndex - startIndex;
      if (length <= 0) {
        return void 0;
      }
      const mid = startIndex + (length >>> 1);
      const node = {
        record: records[mid],
        left: void 0,
        right: void 0,
        parent: parent2,
        deleted: false,
        red
      };
      const left = this._rebuild(records, node, !red, startIndex, mid);
      const right = this._rebuild(records, node, !red, mid + 1, endIndex);
      node.left = left;
      node.right = right;
      return node;
    }
  };
  var RecordStore = class {
    constructor(keysAreUnique) {
      this.keysAreUnique = keysAreUnique;
      this.records = new BinarySearchTree(this.keysAreUnique);
    }
    get(key) {
      const range = key instanceof FDBKeyRange_default ? key : FDBKeyRange_default.only(key);
      return this.records.getRecords(range).next().value;
    }
    /**
     * Put a new record, and return the overwritten record if an overwrite occurred.
     * @param newRecord
     * @param noOverwrite - throw a ConstraintError in case of overwrite
     */
    put(newRecord, noOverwrite = false) {
      return this.records.put(newRecord, noOverwrite);
    }
    delete(key) {
      const range = key instanceof FDBKeyRange_default ? key : FDBKeyRange_default.only(key);
      const deletedRecords = [...this.records.getRecords(range)];
      for (const record of deletedRecords) {
        this.records.delete(record);
      }
      return deletedRecords;
    }
    /**
     * Delete the record with this key and this value, if there is one. Used by indexes, where the value is the primary
     * key of the object store record that the index record points to.
     */
    deleteByKeyAndValue(key, value) {
      const record = this.records.get({
        key,
        value
      });
      if (record !== void 0 && cmpKeys(record.value, value) === 0) {
        this.records.delete(record);
      }
    }
    clear() {
      const deletedRecords = [...this.records.getAllRecords()];
      this.records = new BinarySearchTree(this.keysAreUnique);
      return deletedRecords;
    }
    values(range, direction = "next") {
      const descending = direction === "prev" || direction === "prevunique";
      const records = range ? this.records.getRecords(range, descending) : this.records.getAllRecords(descending);
      return {
        [Symbol.iterator]: () => {
          const next = () => {
            return records.next();
          };
          if (direction === "next" || direction === "prev") {
            return {
              next
            };
          }
          if (direction === "nextunique") {
            let previousValue = void 0;
            return {
              next: () => {
                let current2 = next();
                while (!current2.done && previousValue !== void 0 && cmpKeys(previousValue.key, current2.value.key) === 0) {
                  current2 = next();
                }
                previousValue = current2.value;
                return current2;
              }
            };
          }
          let current = next();
          let nextResult = next();
          return {
            next: () => {
              while (!nextResult.done && cmpKeys(current.value.key, nextResult.value.key) === 0) {
                current = nextResult;
                nextResult = next();
              }
              const result = current;
              current = nextResult;
              nextResult = next();
              return result;
            }
          };
        }
      };
    }
    size() {
      return this.records.size();
    }
  };
  var RecordStore_default = RecordStore;
  var Index = class {
    deleted = false;
    // Initialized should be used to decide whether to throw an error or abort the versionchange transaction when there is a
    // constraint
    initialized = false;
    constructor(rawObjectStore, name, keyPath, multiEntry, unique) {
      this.rawObjectStore = rawObjectStore;
      this.name = name;
      this.keyPath = keyPath;
      this.multiEntry = multiEntry;
      this.unique = unique;
      this.records = new RecordStore_default(unique);
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-index
    getKey(key) {
      const record = this.records.get(key);
      return record !== void 0 ? record.value : void 0;
    }
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-referenced-values-from-an-index
    getAllKeys(range, count, direction) {
      if (count === void 0 || count === 0) {
        count = Infinity;
      }
      const records = [];
      for (const record of this.records.values(range, direction)) {
        records.push(structuredClone(record.value));
        if (records.length >= count) {
          break;
        }
      }
      return records;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#index-referenced-value-retrieval-operation
    getValue(key) {
      const record = this.records.get(key);
      return record !== void 0 ? this.rawObjectStore.getValue(record.value) : void 0;
    }
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-referenced-values-from-an-index
    getAllValues(range, count, direction) {
      if (count === void 0 || count === 0) {
        count = Infinity;
      }
      const records = [];
      for (const record of this.records.values(range, direction)) {
        records.push(this.rawObjectStore.getValue(record.value));
        if (records.length >= count) {
          break;
        }
      }
      return records;
    }
    // https://www.w3.org/TR/IndexedDB/#dom-idbindex-getallrecords
    getAllRecords(range, count, direction) {
      if (count === void 0 || count === 0) {
        count = Infinity;
      }
      const records = [];
      for (const record of this.records.values(range, direction)) {
        records.push(new FDBRecord_default(structuredClone(record.key), structuredClone(this.rawObjectStore.getKey(record.value)), this.rawObjectStore.getValue(record.value)));
        if (records.length >= count) {
          break;
        }
      }
      return records;
    }
    // The index key that an object store record with this value is stored under, or undefined if the value does not
    // belong in this index. For a multiEntry index given an array, this is the array of individual index keys (invalid
    // and duplicate elements removed). Shared by storeRecord and deleteRecord so that deletion finds exactly what
    // insertion stored.
    getIndexKey(value) {
      let indexKey;
      try {
        indexKey = extractKey_default(this.keyPath, value).key;
      } catch (err) {
        if (err.name === "DataError") {
          return;
        }
        throw err;
      }
      if (!this.multiEntry || !Array.isArray(indexKey)) {
        try {
          return valueToKey_default(indexKey);
        } catch (e) {
          return;
        }
      }
      const keep = [];
      for (const part of indexKey) {
        if (keep.indexOf(part) < 0) {
          try {
            keep.push(valueToKey_default(part));
          } catch (err) {
          }
        }
      }
      return keep;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-storing-a-record-into-an-object-store (step 7)
    storeRecord(newRecord) {
      const indexKey = this.getIndexKey(newRecord.value);
      if (indexKey === void 0) {
        return;
      }
      if (!this.multiEntry || !Array.isArray(indexKey)) {
        if (this.unique) {
          const existingRecord = this.records.get(indexKey);
          if (existingRecord) {
            throw new ConstraintError();
          }
        }
        this.records.put({
          key: indexKey,
          value: newRecord.key
        });
      } else {
        if (this.unique) {
          for (const individualIndexKey of indexKey) {
            const existingRecord = this.records.get(individualIndexKey);
            if (existingRecord) {
              throw new ConstraintError();
            }
          }
        }
        for (const individualIndexKey of indexKey) {
          this.records.put({
            key: individualIndexKey,
            value: newRecord.key
          });
        }
      }
    }
    // Remove the index records that storeRecord created for this object store record. Looking them up by index key is
    // O(log n) per index record, where scanning the whole index for records pointing at this primary key is O(n).
    deleteRecord(record) {
      const indexKey = this.getIndexKey(record.value);
      if (indexKey === void 0) {
        return;
      }
      if (!this.multiEntry || !Array.isArray(indexKey)) {
        this.records.deleteByKeyAndValue(indexKey, record.key);
      } else {
        for (const individualIndexKey of indexKey) {
          this.records.deleteByKeyAndValue(individualIndexKey, record.key);
        }
      }
    }
    initialize(transaction) {
      if (this.initialized) {
        throw new Error("Index already initialized");
      }
      transaction._execRequestAsync({
        operation: () => {
          try {
            for (const record of this.rawObjectStore.records.values()) {
              this.storeRecord(record);
            }
            this.initialized = true;
          } catch (err) {
            transaction._abort(err.name);
          }
        },
        source: null
      });
    }
    count(range) {
      let count = 0;
      for (const record of this.records.values(range)) {
        count += 1;
      }
      return count;
    }
  };
  var Index_default = Index;
  var validateKeyPath = (keyPath, parent2) => {
    if (keyPath !== void 0 && keyPath !== null && typeof keyPath !== "string" && keyPath.toString && (parent2 === "array" || !Array.isArray(keyPath))) {
      keyPath = keyPath.toString();
    }
    if (typeof keyPath === "string") {
      if (keyPath === "" && parent2 !== "string") {
        return;
      }
      try {
        const validIdentifierRegex = (
          // eslint-disable-next-line no-misleading-character-class
          /^(?:[$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])(?:[$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])*$/
        );
        if (keyPath.length >= 1 && validIdentifierRegex.test(keyPath)) {
          return;
        }
      } catch (err) {
        throw new SyntaxError(err.message);
      }
      if (keyPath.indexOf(" ") >= 0) {
        throw new SyntaxError("The keypath argument contains an invalid key path (no spaces allowed).");
      }
    }
    if (Array.isArray(keyPath) && keyPath.length > 0) {
      if (parent2) {
        throw new SyntaxError("The keypath argument contains an invalid key path (nested arrays).");
      }
      for (const part of keyPath) {
        validateKeyPath(part, "array");
      }
      return;
    } else if (typeof keyPath === "string" && keyPath.indexOf(".") >= 0) {
      keyPath = keyPath.split(".");
      for (const part of keyPath) {
        validateKeyPath(part, "string");
      }
      return;
    }
    throw new SyntaxError();
  };
  var validateKeyPath_default = validateKeyPath;
  var confirmActiveTransaction2 = (objectStore) => {
    if (objectStore._rawObjectStore.deleted) {
      throw new InvalidStateError();
    }
    if (objectStore.transaction._state !== "active") {
      throw new TransactionInactiveError();
    }
  };
  var buildRecordAddPut = (objectStore, value, key) => {
    confirmActiveTransaction2(objectStore);
    if (objectStore.transaction.mode === "readonly") {
      throw new ReadOnlyError();
    }
    if (objectStore.keyPath !== null) {
      if (key !== void 0) {
        throw new DataError();
      }
    }
    const clone = cloneValueForInsertion(value, objectStore.transaction);
    if (objectStore.keyPath !== null) {
      const tempKey = extractKey_default(objectStore.keyPath, clone);
      if (tempKey.type === "found") {
        valueToKey_default(tempKey.key);
      } else {
        if (!objectStore._rawObjectStore.keyGenerator) {
          throw new DataError();
        } else if (!canInjectKey_default(objectStore.keyPath, clone)) {
          throw new DataError();
        }
      }
    }
    if (objectStore.keyPath === null && objectStore._rawObjectStore.keyGenerator === null && key === void 0) {
      throw new DataError();
    }
    if (key !== void 0) {
      key = valueToKey_default(key);
    }
    return {
      key,
      value: clone
    };
  };
  var FDBObjectStore = class {
    _indexesCache = /* @__PURE__ */ new Map();
    constructor(transaction, rawObjectStore) {
      this._rawObjectStore = rawObjectStore;
      this._name = rawObjectStore.name;
      this.keyPath = getKeyPath(rawObjectStore.keyPath);
      this.autoIncrement = rawObjectStore.autoIncrement;
      this.transaction = transaction;
      this.indexNames = new FakeDOMStringList_default(...Array.from(rawObjectStore.rawIndexes.keys()).sort());
    }
    get name() {
      return this._name;
    }
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-name
    set name(name) {
      const transaction = this.transaction;
      if (!transaction.db._runningVersionchangeTransaction) {
        throw transaction._state === "active" ? new InvalidStateError() : new TransactionInactiveError();
      }
      confirmActiveTransaction2(this);
      name = String(name);
      if (name === this._name) {
        return;
      }
      if (this._rawObjectStore.rawDatabase.rawObjectStores.has(name)) {
        throw new ConstraintError();
      }
      const oldName = this._name;
      const oldObjectStoreNames = [...transaction.db.objectStoreNames];
      this._name = name;
      this._rawObjectStore.name = name;
      this.transaction._objectStoresCache.delete(oldName);
      this.transaction._objectStoresCache.set(name, this);
      this._rawObjectStore.rawDatabase.rawObjectStores.delete(oldName);
      this._rawObjectStore.rawDatabase.rawObjectStores.set(name, this._rawObjectStore);
      transaction.db.objectStoreNames = new FakeDOMStringList_default(...Array.from(this._rawObjectStore.rawDatabase.rawObjectStores.keys()).filter((objectStoreName) => {
        const objectStore = this._rawObjectStore.rawDatabase.rawObjectStores.get(objectStoreName);
        return objectStore && !objectStore.deleted;
      }).sort());
      const oldScope = new Set(transaction._scope);
      const oldTransactionObjectStoreNames = [...transaction.objectStoreNames];
      this.transaction._scope.delete(oldName);
      transaction._scope.add(name);
      transaction.objectStoreNames = new FakeDOMStringList_default(...Array.from(transaction._scope).sort());
      if (!this.transaction._createdObjectStores.has(this._rawObjectStore)) {
        transaction._rollbackLog.push(() => {
          this._name = oldName;
          this._rawObjectStore.name = oldName;
          this.transaction._objectStoresCache.delete(name);
          this.transaction._objectStoresCache.set(oldName, this);
          this._rawObjectStore.rawDatabase.rawObjectStores.delete(name);
          this._rawObjectStore.rawDatabase.rawObjectStores.set(oldName, this._rawObjectStore);
          transaction.db.objectStoreNames = new FakeDOMStringList_default(...oldObjectStoreNames);
          transaction._scope = oldScope;
          transaction.objectStoreNames = new FakeDOMStringList_default(...oldTransactionObjectStoreNames);
        });
      }
    }
    put(value, key) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      const record = buildRecordAddPut(this, value, key);
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.storeRecord.bind(this._rawObjectStore, record, false, this.transaction._rollbackLog),
        source: this
      });
    }
    add(value, key) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      const record = buildRecordAddPut(this, value, key);
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.storeRecord.bind(this._rawObjectStore, record, true, this.transaction._rollbackLog),
        source: this
      });
    }
    delete(key) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      confirmActiveTransaction2(this);
      if (this.transaction.mode === "readonly") {
        throw new ReadOnlyError();
      }
      if (!(key instanceof FDBKeyRange_default)) {
        key = valueToKey_default(key);
      }
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.deleteRecord.bind(this._rawObjectStore, key, this.transaction._rollbackLog),
        source: this
      });
    }
    get(key) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      confirmActiveTransaction2(this);
      if (!(key instanceof FDBKeyRange_default)) {
        key = valueToKey_default(key);
      }
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.getValue.bind(this._rawObjectStore, key),
        source: this
      });
    }
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getall
    getAll(queryOrOptions, count) {
      const options = extractGetAllOptions_default(queryOrOptions, count, arguments.length);
      confirmActiveTransaction2(this);
      const range = valueToKeyRange_default(options.query);
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.getAllValues.bind(this._rawObjectStore, range, options.count, options.direction),
        source: this
      });
    }
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getkey
    getKey(key) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      confirmActiveTransaction2(this);
      if (!(key instanceof FDBKeyRange_default)) {
        key = valueToKey_default(key);
      }
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.getKey.bind(this._rawObjectStore, key),
        source: this
      });
    }
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getallkeys
    getAllKeys(queryOrOptions, count) {
      const options = extractGetAllOptions_default(queryOrOptions, count, arguments.length);
      confirmActiveTransaction2(this);
      const range = valueToKeyRange_default(options.query);
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.getAllKeys.bind(this._rawObjectStore, range, options.count, options.direction),
        source: this
      });
    }
    // https://www.w3.org/TR/IndexedDB/#dom-idbobjectstore-getallrecords
    getAllRecords(options) {
      let query;
      let count;
      let direction;
      if (options !== void 0) {
        if (options.query !== void 0) {
          query = options.query;
        }
        if (options.count !== void 0) {
          count = enforceRange_default(options.count, "unsigned long");
        }
        if (options.direction !== void 0) {
          direction = options.direction;
        }
      }
      confirmActiveTransaction2(this);
      const range = valueToKeyRange_default(query);
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.getAllRecords.bind(this._rawObjectStore, range, count, direction),
        source: this
      });
    }
    clear() {
      confirmActiveTransaction2(this);
      if (this.transaction.mode === "readonly") {
        throw new ReadOnlyError();
      }
      return this.transaction._execRequestAsync({
        operation: this._rawObjectStore.clear.bind(this._rawObjectStore, this.transaction._rollbackLog),
        source: this
      });
    }
    openCursor(range, direction) {
      confirmActiveTransaction2(this);
      if (range === null) {
        range = void 0;
      }
      if (range !== void 0 && !(range instanceof FDBKeyRange_default)) {
        range = FDBKeyRange_default.only(valueToKey_default(range));
      }
      const request = new FDBRequest_default();
      request.source = this;
      request.transaction = this.transaction;
      const cursor = new FDBCursorWithValue_default(this, range, direction, request);
      return this.transaction._execRequestAsync({
        operation: cursor._iterate.bind(cursor),
        request,
        source: this
      });
    }
    openKeyCursor(range, direction) {
      confirmActiveTransaction2(this);
      if (range === null) {
        range = void 0;
      }
      if (range !== void 0 && !(range instanceof FDBKeyRange_default)) {
        range = FDBKeyRange_default.only(valueToKey_default(range));
      }
      const request = new FDBRequest_default();
      request.source = this;
      request.transaction = this.transaction;
      const cursor = new FDBCursor_default(this, range, direction, request, true);
      return this.transaction._execRequestAsync({
        operation: cursor._iterate.bind(cursor),
        request,
        source: this
      });
    }
    // tslint:-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBObjectStore-createIndex-IDBIndex-DOMString-name-DOMString-sequence-DOMString--keyPath-IDBIndexParameters-optionalParameters
    createIndex(name, keyPath, optionalParameters = {}) {
      if (arguments.length < 2) {
        throw new TypeError();
      }
      const multiEntry = optionalParameters.multiEntry !== void 0 ? optionalParameters.multiEntry : false;
      const unique = optionalParameters.unique !== void 0 ? optionalParameters.unique : false;
      if (this.transaction.mode !== "versionchange") {
        throw new InvalidStateError();
      }
      confirmActiveTransaction2(this);
      if (this.indexNames.contains(name)) {
        throw new ConstraintError();
      }
      validateKeyPath_default(keyPath);
      if (Array.isArray(keyPath) && multiEntry) {
        throw new InvalidAccessError();
      }
      const indexNames = [...this.indexNames];
      const index = new Index_default(this._rawObjectStore, name, keyPath, multiEntry, unique);
      this.indexNames._push(name);
      this.indexNames._sort();
      this.transaction._createdIndexes.add(index);
      this._rawObjectStore.rawIndexes.set(name, index);
      index.initialize(this.transaction);
      this.transaction._rollbackLog.push(() => {
        index.deleted = true;
        this.indexNames = new FakeDOMStringList_default(...indexNames);
        this._rawObjectStore.rawIndexes.delete(index.name);
      });
      return new FDBIndex_default(this, index);
    }
    // https://w3c.github.io/IndexedDB/#dom-idbobjectstore-index
    index(name) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      if (this._rawObjectStore.deleted || this.transaction._state === "finished") {
        throw new InvalidStateError();
      }
      const index = this._indexesCache.get(name);
      if (index !== void 0) {
        return index;
      }
      const rawIndex = this._rawObjectStore.rawIndexes.get(name);
      if (!this.indexNames.contains(name) || rawIndex === void 0) {
        throw new NotFoundError();
      }
      const index2 = new FDBIndex_default(this, rawIndex);
      this._indexesCache.set(name, index2);
      return index2;
    }
    deleteIndex(name) {
      if (arguments.length === 0) {
        throw new TypeError();
      }
      if (this.transaction.mode !== "versionchange") {
        throw new InvalidStateError();
      }
      confirmActiveTransaction2(this);
      const rawIndex = this._rawObjectStore.rawIndexes.get(name);
      if (rawIndex === void 0) {
        throw new NotFoundError();
      }
      this.transaction._rollbackLog.push(() => {
        rawIndex.deleted = false;
        this._rawObjectStore.rawIndexes.set(rawIndex.name, rawIndex);
        this.indexNames._push(rawIndex.name);
        this.indexNames._sort();
      });
      this.indexNames = new FakeDOMStringList_default(...Array.from(this.indexNames).filter((indexName) => {
        return indexName !== name;
      }));
      rawIndex.deleted = true;
      this.transaction._execRequestAsync({
        operation: () => {
          const rawIndex2 = this._rawObjectStore.rawIndexes.get(name);
          if (rawIndex === rawIndex2) {
            this._rawObjectStore.rawIndexes.delete(name);
          }
        },
        source: this
      });
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBObjectStore-count-IDBRequest-any-key
    count(key) {
      confirmActiveTransaction2(this);
      if (key === null) {
        key = void 0;
      }
      if (key !== void 0 && !(key instanceof FDBKeyRange_default)) {
        key = FDBKeyRange_default.only(valueToKey_default(key));
      }
      return this.transaction._execRequestAsync({
        operation: () => {
          return this._rawObjectStore.count(key);
        },
        source: this
      });
    }
    get [Symbol.toStringTag]() {
      return "IDBObjectStore";
    }
  };
  var FDBObjectStore_default = FDBObjectStore;
  var Event2 = class {
    eventPath = [];
    NONE = 0;
    CAPTURING_PHASE = 1;
    AT_TARGET = 2;
    BUBBLING_PHASE = 3;
    // Flags
    propagationStopped = false;
    immediatePropagationStopped = false;
    canceled = false;
    initialized = true;
    dispatched = false;
    target = null;
    currentTarget = null;
    eventPhase = 0;
    defaultPrevented = false;
    isTrusted = false;
    timeStamp = Date.now();
    constructor(type, eventInitDict = {}) {
      this.type = type;
      this.bubbles = eventInitDict.bubbles !== void 0 ? eventInitDict.bubbles : false;
      this.cancelable = eventInitDict.cancelable !== void 0 ? eventInitDict.cancelable : false;
    }
    preventDefault() {
      if (this.cancelable) {
        this.canceled = true;
      }
    }
    stopPropagation() {
      this.propagationStopped = true;
    }
    stopImmediatePropagation() {
      this.propagationStopped = true;
      this.immediatePropagationStopped = true;
    }
  };
  var FakeEvent_default = Event2;
  function getSetImmediateFromJsdom() {
    if (typeof navigator !== "undefined" && /jsdom/.test(navigator.userAgent)) {
      const outerRealmFunctionConstructor = Node.constructor;
      return new outerRealmFunctionConstructor("return setImmediate")();
    } else {
      return void 0;
    }
  }
  var schedulerPostTask = typeof scheduler !== "undefined" && ((fn) => scheduler.postTask(fn));
  var doSetTimeout = (fn) => setTimeout(fn, 0);
  var queueTask = (fn) => {
    const setImmediate = globalThis.setImmediate || getSetImmediateFromJsdom() || schedulerPostTask || doSetTimeout;
    setImmediate(fn);
  };
  var prioritizedListenerTypes = ["error", "abort", "complete"];
  var FDBTransaction = class extends FakeEventTarget_default {
    _state = "active";
    _started = false;
    _rollbackLog = [];
    _objectStoresCache = /* @__PURE__ */ new Map();
    _openRequest = null;
    error = null;
    onabort = null;
    oncomplete = null;
    onerror = null;
    _prioritizedListeners = /* @__PURE__ */ new Map();
    _requests = [];
    _createdIndexes = /* @__PURE__ */ new Set();
    _createdObjectStores = /* @__PURE__ */ new Set();
    constructor(storeNames, mode, durability, db) {
      super();
      this._scope = new Set(storeNames);
      this.mode = mode;
      this.durability = durability;
      this.db = db;
      this.objectStoreNames = new FakeDOMStringList_default(...Array.from(this._scope).sort());
      for (const type of prioritizedListenerTypes) {
        this.addEventListener(type, () => {
          this._prioritizedListeners.get(type)?.();
        });
      }
    }
    // https://w3c.github.io/IndexedDB/#abort-transaction
    _abort(errName) {
      for (const f of this._rollbackLog.reverse()) {
        f();
      }
      if (errName !== null) {
        const e = new DOMException(void 0, errName);
        this.error = e;
      }
      for (const {
        request
      } of this._requests) {
        if (request.readyState !== "done") {
          request.readyState = "done";
          if (request.source) {
            queueTask(() => {
              request.result = void 0;
              request.error = new AbortError();
              const event = new FakeEvent_default("error", {
                bubbles: true,
                cancelable: true
              });
              event.eventPath = [this.db, this];
              try {
                request.dispatchEvent(event);
              } catch (_err) {
                if (this._state === "active") {
                  this._abort("AbortError");
                }
              }
            });
          }
        }
      }
      queueTask(() => {
        const isUpgradeTransaction = this.mode === "versionchange";
        if (isUpgradeTransaction) {
          this.db._rawDatabase.connections = this.db._rawDatabase.connections.filter((connection) => !connection._rawDatabase.transactions.includes(this));
        }
        const event = new FakeEvent_default("abort", {
          bubbles: true,
          cancelable: false
        });
        event.eventPath = [this.db];
        this.dispatchEvent(event);
        if (isUpgradeTransaction) {
          const request = this._openRequest;
          request.transaction = null;
          request.result = void 0;
        }
      });
      this._markFinished();
    }
    abort() {
      if (this._state === "committing" || this._state === "finished") {
        throw new InvalidStateError();
      }
      this._state = "active";
      this._abort(null);
    }
    // http://w3c.github.io/IndexedDB/#dom-idbtransaction-objectstore
    objectStore(name) {
      if (this._state !== "active") {
        throw new InvalidStateError();
      }
      const objectStore = this._objectStoresCache.get(name);
      if (objectStore !== void 0) {
        return objectStore;
      }
      const rawObjectStore = this.db._rawDatabase.rawObjectStores.get(name);
      if (!this._scope.has(name) || rawObjectStore === void 0) {
        throw new NotFoundError();
      }
      const objectStore2 = new FDBObjectStore_default(this, rawObjectStore);
      this._objectStoresCache.set(name, objectStore2);
      return objectStore2;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-asynchronously-executing-a-request
    _execRequestAsync(obj) {
      const source = obj.source;
      const operation = obj.operation;
      let request = Object.hasOwn(obj, "request") ? obj.request : null;
      if (this._state !== "active") {
        throw new TransactionInactiveError();
      }
      if (!request) {
        if (!source) {
          request = new FDBRequest_default();
        } else {
          request = new FDBRequest_default();
          request.source = source;
          request.transaction = source.transaction;
        }
      }
      this._requests.push({
        operation,
        request
      });
      return request;
    }
    _start() {
      this._started = true;
      let operation;
      let request;
      while (this._requests.length > 0) {
        const r = this._requests.shift();
        if (r && r.request.readyState !== "done") {
          request = r.request;
          operation = r.operation;
          break;
        }
      }
      if (request && operation) {
        if (!request.source) {
          operation();
        } else {
          let defaultAction;
          let event;
          try {
            const result = operation();
            request.readyState = "done";
            request.result = result;
            request.error = void 0;
            if (this._state === "inactive") {
              this._state = "active";
            }
            event = new FakeEvent_default("success", {
              bubbles: false,
              cancelable: false
            });
          } catch (err) {
            request.readyState = "done";
            request.result = void 0;
            request.error = err;
            if (this._state === "inactive") {
              this._state = "active";
            }
            event = new FakeEvent_default("error", {
              bubbles: true,
              cancelable: true
            });
            defaultAction = this._abort.bind(this, err.name);
          }
          try {
            event.eventPath = [this.db, this];
            request.dispatchEvent(event);
          } catch (_err) {
            if (this._state === "active") {
              this._abort("AbortError");
              defaultAction = void 0;
            }
          }
          if (!event.canceled) {
            if (defaultAction) {
              defaultAction();
            }
          }
        }
        queueTask(this._start.bind(this));
        return;
      }
      if (this._state !== "finished") {
        this._markFinished();
        if (!this.error) {
          const event = new FakeEvent_default("complete");
          this.dispatchEvent(event);
        }
      }
    }
    _markFinished() {
      this._state = "finished";
      queueTask(() => {
        const {
          transactions
        } = this.db._rawDatabase;
        const idx = transactions.indexOf(this);
        if (idx !== -1) {
          transactions.splice(idx, 1);
        }
      });
    }
    commit() {
      if (this._state !== "active") {
        throw new InvalidStateError();
      }
      this._state = "committing";
    }
    get [Symbol.toStringTag]() {
      return "IDBTransaction";
    }
  };
  var FDBTransaction_default = FDBTransaction;
  var MAX_KEY = 9007199254740992;
  var KeyGenerator = class {
    // This is kind of wrong. Should start at 1 and increment only after record is saved
    num = 0;
    next() {
      if (this.num >= MAX_KEY) {
        throw new ConstraintError();
      }
      this.num += 1;
      return this.num;
    }
    // https://w3c.github.io/IndexedDB/#possibly-update-the-key-generator
    setIfLarger(num) {
      const value = Math.floor(Math.min(num, MAX_KEY)) - 1;
      if (value >= this.num) {
        this.num = value + 1;
      }
    }
  };
  var KeyGenerator_default = KeyGenerator;
  var ObjectStore = class {
    deleted = false;
    records = new RecordStore_default(true);
    rawIndexes = /* @__PURE__ */ new Map();
    constructor(rawDatabase, name, keyPath, autoIncrement) {
      this.rawDatabase = rawDatabase;
      this.keyGenerator = autoIncrement === true ? new KeyGenerator_default() : null;
      this.deleted = false;
      this.name = name;
      this.keyPath = keyPath;
      this.autoIncrement = autoIncrement;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-object-store
    getKey(key) {
      const record = this.records.get(key);
      return record !== void 0 ? structuredClone(record.key) : void 0;
    }
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-keys-from-an-object-store
    getAllKeys(range, count, direction) {
      if (count === void 0 || count === 0) {
        count = Infinity;
      }
      const records = [];
      for (const record of this.records.values(range, direction)) {
        records.push(structuredClone(record.key));
        if (records.length >= count) {
          break;
        }
      }
      return records;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-object-store
    getValue(key) {
      const record = this.records.get(key);
      return record !== void 0 ? structuredClone(record.value) : void 0;
    }
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-values-from-an-object-store
    getAllValues(range, count, direction) {
      if (count === void 0 || count === 0) {
        count = Infinity;
      }
      const records = [];
      for (const record of this.records.values(range, direction)) {
        records.push(structuredClone(record.value));
        if (records.length >= count) {
          break;
        }
      }
      return records;
    }
    // https://www.w3.org/TR/IndexedDB/#dom-idbobjectstore-getallrecords
    getAllRecords(range, count, direction) {
      if (count === void 0 || count === 0) {
        count = Infinity;
      }
      const records = [];
      for (const record of this.records.values(range, direction)) {
        records.push(new FDBRecord_default(structuredClone(record.key), structuredClone(record.key), structuredClone(record.value)));
        if (records.length >= count) {
          break;
        }
      }
      return records;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-storing-a-record-into-an-object-store
    storeRecord(newRecord, noOverwrite, rollbackLog) {
      if (this.keyPath !== null) {
        const key = extractKey_default(this.keyPath, newRecord.value).key;
        if (key !== void 0) {
          newRecord.key = valueToKey_default(key);
        }
      }
      const rollbackLogForThisOperation = [];
      if (this.keyGenerator !== null && newRecord.key === void 0) {
        let rolledBack2 = false;
        const keyGeneratorBefore = this.keyGenerator.num;
        const rollbackKeyGenerator = () => {
          if (rolledBack2) {
            return;
          }
          rolledBack2 = true;
          if (this.keyGenerator) {
            this.keyGenerator.num = keyGeneratorBefore;
          }
        };
        rollbackLogForThisOperation.push(rollbackKeyGenerator);
        if (rollbackLog) {
          rollbackLog.push(rollbackKeyGenerator);
        }
        newRecord.key = this.keyGenerator.next();
        if (this.keyPath !== null) {
          if (Array.isArray(this.keyPath)) {
            throw new Error("Cannot have an array key path in an object store with a key generator");
          }
          let remainingKeyPath = this.keyPath;
          let object = newRecord.value;
          let identifier;
          let i = 0;
          while (i >= 0) {
            if (typeof object !== "object") {
              throw new DataError();
            }
            i = remainingKeyPath.indexOf(".");
            if (i >= 0) {
              identifier = remainingKeyPath.slice(0, i);
              remainingKeyPath = remainingKeyPath.slice(i + 1);
              if (!Object.hasOwn(object, identifier)) {
                Object.defineProperty(object, identifier, {
                  configurable: true,
                  enumerable: true,
                  writable: true,
                  value: {}
                });
              }
              object = object[identifier];
            }
          }
          identifier = remainingKeyPath;
          Object.defineProperty(object, identifier, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: newRecord.key
          });
        }
      } else if (this.keyGenerator !== null && typeof newRecord.key === "number") {
        this.keyGenerator.setIfLarger(newRecord.key);
      }
      const existingRecord = this.records.put(newRecord, noOverwrite);
      let rolledBack = false;
      const rollbackStoreRecord = () => {
        if (rolledBack) {
          return;
        }
        rolledBack = true;
        if (existingRecord) {
          this.storeRecord(existingRecord, false);
        } else {
          this.deleteRecord(newRecord.key);
        }
      };
      rollbackLogForThisOperation.push(rollbackStoreRecord);
      if (rollbackLog) {
        rollbackLog.push(rollbackStoreRecord);
      }
      if (existingRecord) {
        for (const rawIndex of this.rawIndexes.values()) {
          rawIndex.deleteRecord(existingRecord);
        }
      }
      try {
        for (const rawIndex of this.rawIndexes.values()) {
          if (rawIndex.initialized) {
            rawIndex.storeRecord(newRecord);
          }
        }
      } catch (err) {
        if (err.name === "ConstraintError") {
          for (const rollback of rollbackLogForThisOperation) {
            rollback();
          }
        }
        throw err;
      }
      return newRecord.key;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-deleting-records-from-an-object-store
    deleteRecord(key, rollbackLog) {
      const deletedRecords = this.records.delete(key);
      if (rollbackLog) {
        for (const record of deletedRecords) {
          rollbackLog.push(() => {
            this.storeRecord(record, true);
          });
        }
      }
      for (const rawIndex of this.rawIndexes.values()) {
        for (const record of deletedRecords) {
          rawIndex.deleteRecord(record);
        }
      }
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-clearing-an-object-store
    clear(rollbackLog) {
      const deletedRecords = this.records.clear();
      if (rollbackLog) {
        for (const record of deletedRecords) {
          rollbackLog.push(() => {
            this.storeRecord(record, true);
          });
        }
      }
      for (const rawIndex of this.rawIndexes.values()) {
        rawIndex.records.clear();
      }
    }
    count(range) {
      if (range === void 0 || range.lower === void 0 && range.upper === void 0) {
        return this.records.size();
      }
      let count = 0;
      for (const record of this.records.values(range)) {
        count += 1;
      }
      return count;
    }
  };
  var ObjectStore_default = ObjectStore;
  var closeConnection = (connection, forced = false) => {
    connection._closePending = true;
    const transactionsComplete = connection._rawDatabase.transactions.every((transaction) => {
      return transaction._state === "finished";
    });
    if (transactionsComplete) {
      connection._closed = true;
      connection._rawDatabase.connections = connection._rawDatabase.connections.filter((otherConnection) => {
        return connection !== otherConnection;
      });
      if (forced) {
        const event = new FakeEvent_default("close", {
          bubbles: false,
          cancelable: false
        });
        event.eventPath = [];
        connection.dispatchEvent(event);
      }
    } else {
      queueTask(() => {
        closeConnection(connection, forced);
      });
    }
  };
  var closeConnection_default = closeConnection;
  var confirmActiveVersionchangeTransaction = (database) => {
    let transaction;
    if (database._runningVersionchangeTransaction) {
      transaction = database._rawDatabase.transactions.findLast((tx) => {
        return tx.mode === "versionchange";
      });
    }
    if (!transaction) {
      throw new InvalidStateError();
    }
    if (transaction._state !== "active") {
      throw new TransactionInactiveError();
    }
    return transaction;
  };
  var FDBDatabase = class extends FakeEventTarget_default {
    _closePending = false;
    _closed = false;
    _runningVersionchangeTransaction = false;
    constructor(rawDatabase) {
      super();
      this._rawDatabase = rawDatabase;
      this._rawDatabase.connections.push(this);
      this.name = rawDatabase.name;
      this.version = rawDatabase.version;
      this.objectStoreNames = new FakeDOMStringList_default(...Array.from(rawDatabase.rawObjectStores.keys()).sort());
    }
    // http://w3c.github.io/IndexedDB/#dom-idbdatabase-createobjectstore
    createObjectStore(name, options = {}) {
      if (name === void 0) {
        throw new TypeError();
      }
      const transaction = confirmActiveVersionchangeTransaction(this);
      const keyPath = options !== null && options.keyPath !== void 0 ? options.keyPath : null;
      const autoIncrement = options !== null && options.autoIncrement !== void 0 ? options.autoIncrement : false;
      if (keyPath !== null) {
        validateKeyPath_default(keyPath);
      }
      if (this._rawDatabase.rawObjectStores.has(name)) {
        throw new ConstraintError();
      }
      if (autoIncrement && (keyPath === "" || Array.isArray(keyPath))) {
        throw new InvalidAccessError();
      }
      const objectStoreNames = [...this.objectStoreNames];
      const transactionObjectStoreNames = [...transaction.objectStoreNames];
      const rawObjectStore = new ObjectStore_default(this._rawDatabase, name, keyPath, autoIncrement);
      this.objectStoreNames._push(name);
      this.objectStoreNames._sort();
      transaction._scope.add(name);
      transaction._createdObjectStores.add(rawObjectStore);
      this._rawDatabase.rawObjectStores.set(name, rawObjectStore);
      transaction.objectStoreNames = new FakeDOMStringList_default(...this.objectStoreNames);
      transaction._rollbackLog.push(() => {
        rawObjectStore.deleted = true;
        this.objectStoreNames = new FakeDOMStringList_default(...objectStoreNames);
        transaction.objectStoreNames = new FakeDOMStringList_default(...transactionObjectStoreNames);
        transaction._scope.delete(rawObjectStore.name);
        this._rawDatabase.rawObjectStores.delete(rawObjectStore.name);
      });
      return transaction.objectStore(name);
    }
    // https://www.w3.org/TR/IndexedDB/#dom-idbdatabase-deleteobjectstore
    deleteObjectStore(name) {
      if (name === void 0) {
        throw new TypeError();
      }
      const transaction = confirmActiveVersionchangeTransaction(this);
      const store = this._rawDatabase.rawObjectStores.get(name);
      if (store === void 0) {
        throw new NotFoundError();
      }
      this.objectStoreNames = new FakeDOMStringList_default(...Array.from(this.objectStoreNames).filter((objectStoreName) => {
        return objectStoreName !== name;
      }));
      transaction.objectStoreNames = new FakeDOMStringList_default(...this.objectStoreNames);
      const objectStore = transaction._objectStoresCache.get(name);
      let prevIndexNames;
      if (objectStore) {
        prevIndexNames = [...objectStore.indexNames];
        objectStore.indexNames = new FakeDOMStringList_default();
      }
      transaction._rollbackLog.push(() => {
        store.deleted = false;
        this._rawDatabase.rawObjectStores.set(store.name, store);
        this.objectStoreNames._push(store.name);
        transaction.objectStoreNames._push(store.name);
        this.objectStoreNames._sort();
        if (objectStore && prevIndexNames) {
          objectStore.indexNames = new FakeDOMStringList_default(...prevIndexNames);
        }
      });
      store.deleted = true;
      this._rawDatabase.rawObjectStores.delete(name);
      transaction._objectStoresCache.delete(name);
    }
    transaction(storeNames, mode, options) {
      mode = mode !== void 0 ? mode : "readonly";
      if (mode !== "readonly" && mode !== "readwrite" && mode !== "versionchange") {
        throw new TypeError("Invalid mode: " + mode);
      }
      const hasActiveVersionchange = this._rawDatabase.transactions.some((transaction) => {
        return transaction._state === "active" && transaction.mode === "versionchange" && transaction.db === this;
      });
      if (hasActiveVersionchange) {
        throw new InvalidStateError();
      }
      if (this._closePending) {
        throw new InvalidStateError();
      }
      if (!Array.isArray(storeNames)) {
        storeNames = [storeNames];
      }
      if (storeNames.length === 0 && mode !== "versionchange") {
        throw new InvalidAccessError();
      }
      for (const storeName of storeNames) {
        if (!this.objectStoreNames.contains(storeName)) {
          throw new NotFoundError("No objectStore named " + storeName + " in this database");
        }
      }
      const durability = options?.durability ?? "default";
      if (durability !== "default" && durability !== "strict" && durability !== "relaxed") {
        throw new TypeError(
          // based on Firefox's error message
          `'${durability}' (value of 'durability' member of IDBTransactionOptions) is not a valid value for enumeration IDBTransactionDurability`
        );
      }
      const tx = new FDBTransaction_default(storeNames, mode, durability, this);
      this._rawDatabase.transactions.push(tx);
      this._rawDatabase.processTransactions();
      return tx;
    }
    close() {
      closeConnection_default(this);
    }
    get [Symbol.toStringTag]() {
      return "IDBDatabase";
    }
  };
  var FDBDatabase_default = FDBDatabase;
  var FDBOpenDBRequest = class extends FDBRequest_default {
    onupgradeneeded = null;
    onblocked = null;
    get [Symbol.toStringTag]() {
      return "IDBOpenDBRequest";
    }
  };
  var FDBOpenDBRequest_default = FDBOpenDBRequest;
  var FDBVersionChangeEvent = class extends FakeEvent_default {
    constructor(type, parameters = {}) {
      super(type);
      this.newVersion = parameters.newVersion !== void 0 ? parameters.newVersion : null;
      this.oldVersion = parameters.oldVersion !== void 0 ? parameters.oldVersion : 0;
    }
    get [Symbol.toStringTag]() {
      return "IDBVersionChangeEvent";
    }
  };
  var FDBVersionChangeEvent_default = FDBVersionChangeEvent;
  function intersection(set1, set2) {
    if ("intersection" in set1) {
      return set1.intersection(set2);
    }
    return new Set([...set1].filter((item) => set2.has(item)));
  }
  var Database = class {
    transactions = [];
    rawObjectStores = /* @__PURE__ */ new Map();
    connections = [];
    constructor(name, version) {
      this.name = name;
      this.version = version;
      this.processTransactions = this.processTransactions.bind(this);
    }
    processTransactions() {
      queueTask(() => {
        const running = this.transactions.filter((transaction) => transaction._started && transaction._state !== "finished");
        const waiting = this.transactions.filter((transaction) => !transaction._started && transaction._state !== "finished");
        const next = waiting.find((transaction, i) => {
          const anyRunning = running.some((other) => !(transaction.mode === "readonly" && other.mode === "readonly") && intersection(other._scope, transaction._scope).size > 0);
          if (anyRunning) {
            return false;
          }
          const anyWaiting = waiting.slice(0, i).some((other) => intersection(other._scope, transaction._scope).size > 0);
          return !anyWaiting;
        });
        if (next) {
          next.addEventListener("complete", this.processTransactions);
          next.addEventListener("abort", this.processTransactions);
          next._start();
        }
      });
    }
  };
  var Database_default = Database;
  function validateRequiredArguments(numArguments, expectedNumArguments, methodName) {
    if (numArguments < expectedNumArguments) {
      throw new TypeError(`${methodName}: At least ${expectedNumArguments} ${expectedNumArguments === 1 ? "argument" : "arguments"} required, but only ${arguments.length} passed`);
    }
  }
  var runTaskInConnectionQueue = (connectionQueues, name, task) => {
    const queue = connectionQueues.get(name) ?? Promise.resolve();
    connectionQueues.set(name, queue.then(task));
  };
  var waitForOthersClosedDelete = (databases, name, openDatabases, cb) => {
    const anyOpen = openDatabases.some((openDatabase2) => {
      return !openDatabase2._closed && !openDatabase2._closePending;
    });
    if (anyOpen) {
      queueTask(() => waitForOthersClosedDelete(databases, name, openDatabases, cb));
      return;
    }
    databases.delete(name);
    cb(null);
  };
  var deleteDatabase = (databases, connectionQueues, name, request, cb) => {
    const deleteDBTask = () => {
      return new Promise((resolve) => {
        const db = databases.get(name);
        const oldVersion = db !== void 0 ? db.version : 0;
        const onComplete = (err) => {
          try {
            if (err) {
              cb(err);
            } else {
              cb(null, oldVersion);
            }
          } finally {
            resolve();
          }
        };
        try {
          const db2 = databases.get(name);
          if (db2 === void 0) {
            onComplete(null);
            return;
          }
          const openConnections = db2.connections.filter((connection) => {
            return !connection._closed;
          });
          for (const openDatabase2 of openConnections) {
            if (!openDatabase2._closePending) {
              queueTask(() => {
                const event = new FDBVersionChangeEvent_default("versionchange", {
                  newVersion: null,
                  oldVersion: db2.version
                });
                openDatabase2.dispatchEvent(event);
              });
            }
          }
          queueTask(() => {
            const anyOpen = openConnections.some((openDatabase3) => {
              return !openDatabase3._closed && !openDatabase3._closePending;
            });
            if (anyOpen) {
              queueTask(() => {
                const event = new FDBVersionChangeEvent_default("blocked", {
                  newVersion: null,
                  oldVersion: db2.version
                });
                request.dispatchEvent(event);
              });
            }
            waitForOthersClosedDelete(databases, name, openConnections, onComplete);
          });
        } catch (err) {
          onComplete(err);
        }
      });
    };
    runTaskInConnectionQueue(connectionQueues, name, deleteDBTask);
  };
  var runVersionchangeTransaction = (connection, version, request, cb) => {
    connection._runningVersionchangeTransaction = true;
    const oldVersion = connection._oldVersion = connection.version;
    const openConnections = connection._rawDatabase.connections.filter((otherDatabase) => {
      return connection !== otherDatabase;
    });
    for (const openDatabase2 of openConnections) {
      if (!openDatabase2._closed && !openDatabase2._closePending) {
        queueTask(() => {
          const event = new FDBVersionChangeEvent_default("versionchange", {
            newVersion: version,
            oldVersion
          });
          openDatabase2.dispatchEvent(event);
        });
      }
    }
    queueTask(() => {
      const anyOpen = openConnections.some((openDatabase3) => {
        return !openDatabase3._closed && !openDatabase3._closePending;
      });
      if (anyOpen) {
        queueTask(() => {
          const event = new FDBVersionChangeEvent_default("blocked", {
            newVersion: version,
            oldVersion
          });
          request.dispatchEvent(event);
        });
      }
      const waitForOthersClosed = () => {
        const anyOpen2 = openConnections.some((openDatabase2) => {
          return !openDatabase2._closed && !openDatabase2._closePending;
        });
        if (anyOpen2) {
          queueTask(waitForOthersClosed);
          return;
        }
        connection._rawDatabase.version = version;
        connection.version = version;
        const transaction = connection.transaction(Array.from(connection.objectStoreNames), "versionchange");
        transaction._openRequest = request;
        request.result = connection;
        request.readyState = "done";
        request.transaction = transaction;
        transaction._rollbackLog.push(() => {
          connection._rawDatabase.version = oldVersion;
          connection.version = oldVersion;
        });
        transaction._state = "active";
        const event = new FDBVersionChangeEvent_default("upgradeneeded", {
          newVersion: version,
          oldVersion
        });
        let didThrow = false;
        try {
          request.dispatchEvent(event);
        } catch (_err) {
          didThrow = true;
        }
        const concludeUpgrade = () => {
          if (transaction._state === "active") {
            transaction._state = "inactive";
            if (didThrow) {
              transaction._abort("AbortError");
            }
          }
        };
        if (didThrow) {
          concludeUpgrade();
        } else {
          queueTask(concludeUpgrade);
        }
        transaction._prioritizedListeners.set("error", () => {
          connection._runningVersionchangeTransaction = false;
          connection._oldVersion = void 0;
        });
        transaction._prioritizedListeners.set("abort", () => {
          connection._runningVersionchangeTransaction = false;
          connection._oldVersion = void 0;
          queueTask(() => {
            request.transaction = null;
            cb(new AbortError());
          });
        });
        transaction._prioritizedListeners.set("complete", () => {
          connection._runningVersionchangeTransaction = false;
          connection._oldVersion = void 0;
          queueTask(() => {
            request.transaction = null;
            if (connection._closePending) {
              cb(new AbortError());
            } else {
              cb(null);
            }
          });
        });
      };
      waitForOthersClosed();
    });
  };
  var openDatabase = (databases, connectionQueues, name, version, request, cb) => {
    const openDBTask = () => {
      return new Promise((resolve) => {
        const onComplete = (err) => {
          try {
            if (err) {
              cb(err);
            } else {
              cb(null, connection);
            }
          } finally {
            resolve();
          }
        };
        let db = databases.get(name);
        if (db === void 0) {
          db = new Database_default(name, 0);
          databases.set(name, db);
        }
        if (version === void 0) {
          version = db.version !== 0 ? db.version : 1;
        }
        if (db.version > version) {
          return onComplete(new VersionError());
        }
        const connection = new FDBDatabase_default(db);
        if (db.version < version) {
          runVersionchangeTransaction(connection, version, request, (err) => {
            onComplete(err);
          });
        } else {
          onComplete(null);
        }
      });
    };
    runTaskInConnectionQueue(connectionQueues, name, openDBTask);
  };
  var FDBFactory = class {
    _databases = /* @__PURE__ */ new Map();
    // https://w3c.github.io/IndexedDB/#connection-queue
    _connectionQueues = /* @__PURE__ */ new Map();
    // promise chain as lightweight FIFO task queue
    // https://w3c.github.io/IndexedDB/#dom-idbfactory-cmp
    cmp(first, second) {
      validateRequiredArguments(arguments.length, 2, "IDBFactory.cmp");
      return cmp_default(first, second);
    }
    // https://w3c.github.io/IndexedDB/#dom-idbfactory-deletedatabase
    deleteDatabase(name) {
      validateRequiredArguments(arguments.length, 1, "IDBFactory.deleteDatabase");
      const request = new FDBOpenDBRequest_default();
      request.source = null;
      queueTask(() => {
        deleteDatabase(this._databases, this._connectionQueues, name, request, (err, oldVersion) => {
          if (err) {
            request.error = new DOMException(err.message, err.name);
            request.readyState = "done";
            const event = new FakeEvent_default("error", {
              bubbles: true,
              cancelable: true
            });
            event.eventPath = [];
            request.dispatchEvent(event);
            return;
          }
          request.result = void 0;
          request.readyState = "done";
          const event2 = new FDBVersionChangeEvent_default("success", {
            newVersion: null,
            oldVersion
          });
          request.dispatchEvent(event2);
        });
      });
      return request;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBFactory-open-IDBOpenDBRequest-DOMString-name-unsigned-long-long-version
    open(name, version) {
      validateRequiredArguments(arguments.length, 1, "IDBFactory.open");
      if (arguments.length > 1 && version !== void 0) {
        version = enforceRange_default(version, "MAX_SAFE_INTEGER");
      }
      if (version === 0) {
        throw new TypeError("Database version cannot be 0");
      }
      const request = new FDBOpenDBRequest_default();
      request.source = null;
      queueTask(() => {
        openDatabase(this._databases, this._connectionQueues, name, version, request, (err, connection) => {
          if (err) {
            request.result = void 0;
            request.readyState = "done";
            request.error = new DOMException(err.message, err.name);
            const event = new FakeEvent_default("error", {
              bubbles: true,
              cancelable: true
            });
            event.eventPath = [];
            request.dispatchEvent(event);
            return;
          }
          request.result = connection;
          request.readyState = "done";
          const event2 = new FakeEvent_default("success");
          event2.eventPath = [];
          request.dispatchEvent(event2);
        });
      });
      return request;
    }
    // https://w3c.github.io/IndexedDB/#dom-idbfactory-databases
    databases() {
      return Promise.resolve(Array.from(this._databases.entries(), ([name, database]) => {
        const activeVersionChangeConnection = database.connections.find((connection) => connection._runningVersionchangeTransaction);
        const version = activeVersionChangeConnection ? activeVersionChangeConnection._oldVersion : database.version;
        return {
          name,
          version
        };
      }).filter(({
        version
      }) => {
        return version > 0;
      }));
    }
    get [Symbol.toStringTag]() {
      return "IDBFactory";
    }
  };
  var FDBFactory_default = FDBFactory;
  var fakeIndexedDB = new FDBFactory_default();

  // work/Browzen/asset/single/css-rewrite.js
  function neutralizeCSS(text) {
    return String(text).replace(/@import\s+(?:url\([^)]*\)|["'][^"']*["'])[^;]*;?/gi, "").replace(/url\(\s*(["']?)(.*?)\1\s*\)/gi, (all, q, url) => /^(data|blob):/i.test(url) || url.startsWith("#") ? all : 'url("data:,")');
  }

  // work/Browzen/asset/single/html-policy.js
  function hasRel(value, token) {
    return String(value || "").toLowerCase().split(/\s+/).includes(token);
  }

  // work/Browzen/asset/single/window-value.js
  var windowMethods = /* @__PURE__ */ new Set(["addEventListener", "removeEventListener", "dispatchEvent", "postMessage", "getComputedStyle", "requestAnimationFrame", "cancelAnimationFrame", "requestIdleCallback", "cancelIdleCallback", "setTimeout", "clearTimeout", "setInterval", "clearInterval", "atob", "btoa", "matchMedia", "alert", "confirm", "prompt", "scroll", "scrollTo", "scrollBy", "focus", "blur", "getSelection", "createImageBitmap", "queueMicrotask"]);
  function windowValue(target, key) {
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    if (descriptor && !descriptor.configurable) {
      if ("value" in descriptor && !descriptor.writable) return descriptor.value;
      if (!("value" in descriptor) && !descriptor.get) return void 0;
    }
    const value = Reflect.get(target, key, target);
    return typeof value === "function" && (!value.prototype || windowMethods.has(key)) ? value.bind(target) : value;
  }
  function windowFacade(nativeWindow, readVirtual, writeVirtual) {
    const shell = /* @__PURE__ */ Object.create(null);
    return new Proxy(shell, { get(target, key, receiver) {
      if (Object.hasOwn(target, key)) return Reflect.get(target, key, receiver);
      const virtual = readVirtual(key);
      return virtual.handled ? virtual.value : windowValue(nativeWindow, key);
    }, set(target, key, value) {
      if (writeVirtual(key, value)) return true;
      if (Object.hasOwn(target, key)) return Reflect.set(target, key, value, target);
      if (Reflect.set(nativeWindow, key, value, nativeWindow)) return true;
      return Reflect.set(target, key, value, target);
    }, defineProperty(target, key, descriptor) {
      const old = Reflect.getOwnPropertyDescriptor(nativeWindow, key);
      if (!old || old.configurable) Reflect.defineProperty(nativeWindow, key, descriptor);
      return Reflect.defineProperty(target, key, descriptor);
    }, deleteProperty(target, key) {
      const own = Reflect.getOwnPropertyDescriptor(target, key), native = Reflect.getOwnPropertyDescriptor(nativeWindow, key);
      if (own) {
        if (!own.configurable) return false;
        if (native?.configurable) Reflect.deleteProperty(nativeWindow, key);
        return Reflect.deleteProperty(target, key);
      }
      return Reflect.deleteProperty(nativeWindow, key);
    }, has: (target, key) => Reflect.has(target, key) || Reflect.has(nativeWindow, key), ownKeys: (target) => [.../* @__PURE__ */ new Set([...Reflect.ownKeys(nativeWindow), ...Reflect.ownKeys(target)])], getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(target, key) || ((d) => d ? { ...d, configurable: true } : void 0)(Reflect.getOwnPropertyDescriptor(nativeWindow, key));
    } });
  }

  // work/Browzen/asset/single/dynamic-css.js
  function installDynamicCSS(g, convert) {
    const versions = /* @__PURE__ */ new WeakMap();
    const ticket = (object, key) => {
      key = key.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
      let state = versions.get(object);
      if (!state) versions.set(object, state = { epoch: 0, keys: /* @__PURE__ */ new Map() });
      if (["css-text", "sheet", "style-text"].includes(key)) state.epoch++;
      const epoch = state.epoch, n = (state.keys.get(key) || 0) + 1;
      state.keys.set(key, n);
      return () => state.epoch === epoch && state.keys.get(key) === n;
    };
    const hasURL = (value) => /url\s*\(|@import\b/i.test(value);
    function write(object, key, value, apply) {
      value = String(value);
      const current = ticket(object, key);
      if (!hasURL(value)) return apply(value);
      apply(neutralizeCSS(value));
      Promise.resolve().then(() => convert(value)).then((css) => {
        if (current()) apply(css);
      }).catch(() => {
      });
    }
    const style = g.CSSStyleDeclaration?.prototype;
    if (style) {
      for (const key of Object.getOwnPropertyNames(style)) {
        const d2 = Object.getOwnPropertyDescriptor(style, key);
        if (d2?.set && d2.configurable) Object.defineProperty(style, key, { ...d2, set(value) {
          write(this, key, value, (v) => d2.set.call(this, v));
        } });
      }
      const set = style.setProperty;
      style.setProperty = function(key, value, priority) {
        write(this, String(key), value, (v) => set.call(this, key, v, priority));
      };
      const remove = style.removeProperty;
      style.removeProperty = function(key) {
        ticket(this, String(key));
        return remove.call(this, key);
      };
    }
    const sheet = g.CSSStyleSheet?.prototype;
    if (sheet) {
      const insert = sheet.insertRule, remove = sheet.deleteRule, replace = sheet.replaceSync, replaceAsync = sheet.replace;
      if (insert) sheet.insertRule = function(rule, index = 0) {
        rule = String(rule);
        if (!hasURL(rule)) return insert.call(this, rule, index);
        const result = insert.call(this, neutralizeCSS(rule) || "@media not all {}", index), placeholder = this.cssRules[result];
        Promise.resolve().then(() => convert(rule)).then((css) => {
          const at = [...this.cssRules].indexOf(placeholder);
          if (at < 0) return;
          remove.call(this, at);
          insert.call(this, css, at);
        }).catch(() => {
        });
        return result;
      };
      if (replace) sheet.replaceSync = function(text) {
        write(this, "sheet", text, (v) => replace.call(this, v));
      };
      if (replaceAsync) sheet.replace = function(text) {
        const current = ticket(this, "sheet");
        return Promise.resolve(convert(String(text))).then((css) => current() ? replaceAsync.call(this, css) : this);
      };
    }
    const nodes = g.Node?.prototype, d = nodes && Object.getOwnPropertyDescriptor(nodes, "textContent");
    if (d?.set && d.configurable) Object.defineProperty(nodes, "textContent", { ...d, set(value) {
      if (this.nodeType === 1 && this.tagName === "STYLE") write(this, "style-text", value, (v) => d.set.call(this, v));
      else d.set.call(this, value);
    } });
  }

  // work/Browzen/asset/single/content-entry.js
  (() => {
    const native = { append: Node.prototype.appendChild, insert: Node.prototype.insertBefore, replace: Node.prototype.replaceChild, set: Element.prototype.setAttribute, get: Element.prototype.getAttribute, remove: Element.prototype.removeAttribute, inner: Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML"), add: EventTarget.prototype.addEventListener, dispatch: EventTarget.prototype.dispatchEvent, Blob, create: URL.createObjectURL.bind(URL), revoke: URL.revokeObjectURL.bind(URL), Function };
    window.__browzenPrivacy?.install(window);
    let port, current, sequence = 0, cookie = "", ready = false, documentInstalled = false, readyState = "loading", scriptErrors = 0;
    const pending = /* @__PURE__ */ new Map(), resources = /* @__PURE__ */ new Map(), urls = /* @__PURE__ */ new Map(), internal = /* @__PURE__ */ new WeakSet(), processed = /* @__PURE__ */ new WeakSet(), popups = /* @__PURE__ */ new Map();
    const downloadBlobs = /* @__PURE__ */ new Map(), ownedBlobs = /* @__PURE__ */ new Set();
    define(URL, "createObjectURL", (blob) => {
      if (ownedBlobs.size >= 128) throw new DOMException("Blob limit reached.", "QuotaExceededError");
      if (blob instanceof native.Blob && blob.size > 32 * 1024 * 1024) throw new DOMException("Blob limit reached.", "QuotaExceededError");
      const url = native.create(blob);
      ownedBlobs.add(url);
      if (blob instanceof native.Blob) downloadBlobs.set(url, blob);
      return url;
    });
    define(URL, "revokeObjectURL", (url) => {
      ownedBlobs.delete(String(url));
      downloadBlobs.delete(String(url));
      native.revoke(url);
    });
    const scope = () => ({ id: current.scope, origin: new URL(current.url).origin, topOrigin: new URL(current.url).origin, isMain: true });
    function send(type, data = {}) {
      port.postMessage({ type, ...data });
    }
    function rpc(type, data = {}) {
      return new Promise((resolve, reject) => {
        const id = ++sequence;
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(new DOMException("Website operation timed out.", "TimeoutError"));
        }, 65e3);
        pending.set(id, { resolve, reject, timer });
        port.postMessage({ type, rpc: id, ...data });
      });
    }
    function fail(message = "Unavailable in this isolated web version.") {
      throw new DOMException(message, "NotSupportedError");
    }
    function define(o, k, v) {
      try {
        Object.defineProperty(o, k, { configurable: false, writable: false, value: v });
      } catch {
      }
    }
    function compatible(o, k, v) {
      Object.defineProperty(o, k, { configurable: true, writable: true, value: v });
    }
    function read(o, k, get) {
      try {
        Object.defineProperty(o, k, { configurable: false, get });
      } catch {
      }
    }
    const blockedTags = /* @__PURE__ */ new Set(["iframe", "frame", "frameset", "object", "embed", "portal"]);
    const createElement = Document.prototype.createElement, createElementNS = Document.prototype.createElementNS;
    compatible(Document.prototype, "createElement", function(name, ...args) {
      return createElement.call(this, blockedTags.has(String(name).toLowerCase()) ? "div" : name, ...args);
    });
    compatible(Document.prototype, "createElementNS", function(ns, name, ...args) {
      return createElementNS.call(this, ns, blockedTags.has(String(name).toLowerCase().split(":").pop()) ? "div" : name, ...args);
    });
    function remote(value, base = current.base) {
      const u = new URL(String(value), base);
      if (!/^https?:$/.test(u.protocol)) throw new TypeError("Only HTTP and HTTPS website addresses are supported.");
      return u.href;
    }
    function addResources(list) {
      for (const r of list || []) if (!resources.has(r.id)) resources.set(r.id, r);
    }
    function materialize(id, stack = /* @__PURE__ */ new Set()) {
      if (id.startsWith("data:")) return id;
      if (urls.has(id)) return urls.get(id);
      const r = resources.get(id);
      if (!r) return "data:,";
      if (stack.has(id)) return "data:,";
      if (r.opaqueURL) return r.opaqueURL;
      let body = r.body;
      if (typeof body === "string" && r.type === "text/css") {
        const next = /* @__PURE__ */ new Set([...stack, id]);
        body = body.replace(/bzn-resource:(r\d+)/g, (_, dep) => materialize(dep, next));
      }
      const url = native.create(new native.Blob([body], { type: r.type }));
      urls.set(id, url);
      return url;
    }
    async function materializeAsync(id, stack = /* @__PURE__ */ new Set()) {
      if (urls.has(id)) return urls.get(id);
      const r = resources.get(id);
      if (!r || r.type !== "text/css") return materialize(id);
      if (stack.has(id)) return "data:,";
      const next = /* @__PURE__ */ new Set([...stack, id]), dependencies = r.dependencies || [...new Set([...String(r.body).matchAll(/bzn-resource:(r\d+)/g)].map((m) => m[1]))], mapped = /* @__PURE__ */ new Map();
      for (const dep of dependencies) mapped.set(dep, await materializeAsync(dep, next));
      const url = native.create(new native.Blob([String(r.body).replace(/bzn-resource:(r\d+)/g, (_, dep) => mapped.get(dep) || "data:,")], { type: "text/css" }));
      urls.set(id, url);
      return url;
    }
    const aliasNames = /* @__PURE__ */ new Set();
    function aliases() {
      const imports = {};
      for (const r of resources.values()) if (r.module && !aliasNames.has(r.url)) {
        imports["bzn:" + r.url] = materialize(r.id);
        aliasNames.add(r.url);
      }
      if (!Object.keys(imports).length) return;
      const node = document.createElement("script");
      internal.add(node);
      node.type = "importmap";
      node.textContent = JSON.stringify({ imports });
      native.append.call(document.head, node);
    }
    const resourcePending = /* @__PURE__ */ new Map();
    async function resourceEntry(url, kind = "asset", integrity = "") {
      const key = kind + ":" + remote(url) + ":" + integrity;
      if (!resourcePending.has(key)) {
        const promise = rpc("resource", { url: remote(url), base: current.base, kind, integrity }).then((result) => {
          addResources(result.resources);
          return result.id;
        });
        resourcePending.set(key, promise);
        promise.catch(() => resourcePending.delete(key));
      }
      return resourcePending.get(key);
    }
    async function resource(url, kind = "asset", integrity = "") {
      return materializeAsync(await resourceEntry(url, kind, integrity));
    }
    async function convertCSS(source) {
      const result = await rpc("css", { source, base: current.base });
      addResources(result.resources);
      let text = result.css;
      const ids = [...new Set([...text.matchAll(/bzn-resource:(r\d+)/g)].map((m) => m[1]))];
      for (const id of ids) {
        const url = await materializeAsync(id);
        text = text.replaceAll("bzn-resource:" + id + '"', url + '"').replaceAll("bzn-resource:" + id + "'", url + "'");
      }
      return text;
    }
    installDynamicCSS(window, convertCSS);
    const locationFacade = {};
    for (const key of ["href", "origin", "protocol", "host", "hostname", "port", "pathname", "search", "hash"]) Object.defineProperty(locationFacade, key, { enumerable: true, get: () => new URL(current.url)[key], set: (value) => {
      const u = new URL(current.url);
      if (key === "origin") return;
      u[key] = value;
      navigate(u.href);
    } });
    Object.assign(locationFacade, { assign: navigate, replace: navigate, reload: () => navigate(current.url), toString: () => current.url });
    function navigate(value) {
      const url = remote(value, current.url);
      if (url.split("#")[0] === current.url.split("#")[0]) {
        current.url = url;
        send("history", { url });
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        const id = decodeURIComponent(new URL(url).hash.slice(1));
        document.getElementById(id)?.scrollIntoView();
        return;
      }
      send("navigate", { url });
    }
    const proxy = windowFacade(window, (key) => {
      if (["window", "self", "globalThis", "parent", "top", "frames"].includes(key)) return { handled: true, value: proxy };
      if (key === "location") return { handled: true, value: locationFacade };
      if (key === "history") return { handled: true, value: historyFacade };
      if (key === "opener") return { handled: true, value: current.opener ? openerFacade : null };
      if (key === "origin") return { handled: true, value: new URL(current.url).origin };
      return { handled: false };
    }, (key, value) => {
      if (key === "location") {
        navigate(value);
        return true;
      }
      return false;
    });
    const bridge = { window: proxy, self: proxy, globalThis: proxy, parent: proxy, top: proxy, frames: proxy, get fetch() {
      return proxy.fetch;
    }, set fetch(value) {
      proxy.fetch = value;
    }, get history() {
      return historyFacade;
    }, get opener() {
      return current.opener ? openerFacade : null;
    }, get location() {
      return locationFacade;
    }, set location(v) {
      navigate(v);
    }, async importModule(value, base) {
      const result = await rpc("resource", { url: remote(value, base), base, kind: "module" });
      addResources(result.resources);
      aliases();
      return import(materialize(result.id));
    } };
    define(window, "__bzn", bridge);
    function action(action2, data = {}) {
      return rpc("site-action", { action: action2, scope: scope(), ...data });
    }
    function popup(url = "", name = "_blank", features = "") {
      if (["_self", "_top", "_parent"].includes(name)) {
        if (url && url !== "about:blank") navigate(url);
        return proxy;
      }
      const token = "p" + ++sequence, noOpener = /\bnoopener\b/i.test(features);
      let closed = false, href = url && url !== "about:blank" ? remote(url) : "about:blank";
      const queue = [];
      let opened = false;
      const invoke = (actionName, data = {}) => opened ? action(actionName, { token, ...data }) : queue.push([actionName, data]);
      const loc = { get href() {
        return href;
      }, set href(v) {
        href = remote(v);
        invoke("popup-navigate", { url: href });
      }, assign(v) {
        this.href = v;
      }, replace(v) {
        this.href = v;
      }, toString() {
        return href;
      } };
      const handle = { get closed() {
        return closed;
      }, get location() {
        return loc;
      }, set location(v) {
        loc.href = v;
      }, close() {
        closed = true;
        invoke("popup-close");
      }, focus() {
        invoke("popup-focus");
      }, postMessage(message, targetOrigin = "*") {
        invoke("popup-message", { message, targetOrigin });
      } };
      popups.set(token, { handle, close: () => closed = true });
      action("popup-open", { token, url: href, target: name, gesture: navigator.userActivation?.isActive, noOpener }).then(() => {
        opened = true;
        for (const [a, d] of queue) action(a, { token, ...d }).catch(console.warn);
      }).catch((e) => {
        closed = true;
        console.warn(e.message);
      });
      return noOpener ? null : handle;
    }
    const openerFacade = { postMessage: (message, targetOrigin = "*") => action("opener-message", { message, targetOrigin }), close: () => {
    }, get closed() {
      return false;
    } };
    const NativeMessageEvent = MessageEvent;
    define(window, "MessageEvent", new Proxy(NativeMessageEvent, { construct(target, args, newTarget) {
      const init = args[1], source = init?.source, managed = source === proxy || source === openerFacade || [...popups.values()].some((p) => p.handle === source);
      const event = Reflect.construct(target, managed ? [args[0], { ...init, source: null }] : args, newTarget);
      if (managed) Object.defineProperty(event, "source", { value: source });
      return event;
    } }));
    define(window, "open", popup);
    define(window, "close", () => action("opener-close-self").catch(() => {
    }));
    const nativeHistory = history, oldPush = history.pushState.bind(history), oldReplace = history.replaceState.bind(history);
    const historyFacade = { get state() {
      return nativeHistory.state;
    }, get length() {
      return nativeHistory.length;
    }, get scrollRestoration() {
      return nativeHistory.scrollRestoration;
    }, set scrollRestoration(value) {
      nativeHistory.scrollRestoration = value;
    }, back: () => send("traverse", { delta: -1 }), forward: () => send("traverse", { delta: 1 }), go: (delta) => Number(delta) ? send("traverse", { delta: Math.trunc(Number(delta)) }) : navigate(current.url) };
    for (const [k, fn] of [["pushState", oldPush], ["replaceState", oldReplace]]) {
      const mediated = function(state, title, url) {
        let u = current.url;
        if (url != null) {
          u = remote(url, current.url);
          if (new URL(u).origin !== new URL(current.url).origin) throw new DOMException("History must keep the same origin.", "SecurityError");
        }
        fn(state, title);
        current.url = u;
        send("history", { url: u, replace: k === "replaceState" });
      };
      define(nativeHistory, k, mediated);
      historyFacade[k] = mediated;
    }
    read(document, "URL", () => current?.url || "about:blank");
    read(document, "documentURI", () => current?.url || "about:blank");
    read(document, "baseURI", () => current?.base || "about:blank");
    read(document, "referrer", () => "");
    read(Node.prototype, "baseURI", () => current?.base || "about:blank");
    read(document, "readyState", () => readyState);
    Object.defineProperty(Document.prototype, "cookie", { configurable: false, get() {
      return cookie;
    }, set(value) {
      const pair = String(value).split(";")[0], name = pair.split("=")[0].trim();
      cookie = cookie.split("; ").filter((p) => p.split("=")[0] !== name).concat(pair).filter(Boolean).join("; ");
      send("cookie", { value: String(value) });
    } });
    class MemoryCookieStore extends EventTarget {
      onchange = null;
      async getAll(options = {}) {
        const name = typeof options === "string" ? options : options.name;
        const { cookies } = await rpc("cookie-store", { op: "get" });
        return name === void 0 ? cookies : cookies.filter((c) => c.name === String(name));
      }
      async get(options) {
        return (await this.getAll(options))[0] || null;
      }
      async set(name, value) {
        const o = typeof name === "object" ? name : { name, value };
        if (!o || !o.name || /[;=\s\x00-\x1f]/.test(String(o.name)) || /[;\r\n]/.test(String(o.value ?? ""))) throw new TypeError("Invalid cookie name or value.");
        let text = String(o.name) + "=" + String(o.value ?? "") + "; Path=" + (o.path || "/");
        if (o.domain) {
          if (/[;\r\n]/.test(o.domain)) throw new TypeError("Invalid cookie domain.");
          text += "; Domain=" + o.domain;
        }
        if (o.secure !== false) text += "; Secure";
        if (o.sameSite) {
          if (!["strict", "lax", "none"].includes(o.sameSite)) throw new TypeError("Invalid SameSite.");
          text += "; SameSite=" + o.sameSite;
        }
        if (o.expires != null) text += "; Expires=" + new Date(o.expires).toUTCString();
        await rpc("cookie-store", { op: "set", value: text });
        const event = new Event("change");
        Object.defineProperties(event, { changed: { value: await this.getAll(o.name) }, deleted: { value: [] } });
        this.dispatchEvent(event);
        this.onchange?.(event);
      }
      async delete(options) {
        const o = typeof options === "string" ? { name: options } : options;
        await this.set({ ...o, value: "", expires: 0 });
      }
    }
    define(window, "cookieStore", new MemoryCookieStore());
    function storage(kind, initial) {
      let values = { ...initial };
      const api = { get length() {
        return Object.keys(values).length;
      }, key: (i) => Object.keys(values)[i] ?? null, getItem: (k) => Object.hasOwn(values, String(k)) ? String(values[k]) : null, setItem(k, v) {
        const copy = { ...values, [String(k)]: String(v) };
        if (JSON.stringify(copy).length > 1024 * 1024) throw new DOMException("Website storage exceeds 1 MB.", "QuotaExceededError");
        values = copy;
        send("store", { kind, values });
      }, removeItem(k) {
        delete values[String(k)];
        send("store", { kind, values });
      }, clear() {
        values = {};
        send("store", { kind, values });
      } };
      return new Proxy(api, { get: (t, k) => k in t ? t[k] : t.getItem(k), set: (t, k, v) => {
        t.setItem(k, v);
        return true;
      }, deleteProperty: (t, k) => {
        t.removeItem(k);
        return true;
      }, ownKeys: () => Object.keys(values), getOwnPropertyDescriptor: (t, k) => Object.hasOwn(values, k) ? { enumerable: true, configurable: true, value: values[k] } : Object.getOwnPropertyDescriptor(t, k) });
    }
    async function bodyBytes(body) {
      if (body == null) return void 0;
      if (body instanceof FormData) {
        const r = new Response(body);
        return { body: await r.arrayBuffer(), type: r.headers.get("content-type") };
      }
      if (body instanceof URLSearchParams) return { body: new TextEncoder().encode(body.toString()).buffer, type: "application/x-www-form-urlencoded;charset=UTF-8" };
      if (body instanceof Blob) return { body: await body.arrayBuffer(), type: body.type };
      if (body instanceof ArrayBuffer) return { body };
      if (ArrayBuffer.isView(body)) return { body: body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength) };
      return { body: new TextEncoder().encode(String(body)).buffer, type: "text/plain;charset=UTF-8" };
    }
    const NativeRequest = Request;
    define(window, "Request", new Proxy(NativeRequest, { construct(t, args, newTarget) {
      if (!(args[0] instanceof NativeRequest)) args[0] = remote(args[0]);
      return Reflect.construct(t, args, newTarget);
    } }));
    async function websiteFetch(input, init = {}) {
      const request = input instanceof Request ? input : null, url = remote(request?.url || input), headers = new Headers(init.headers || request?.headers || {}), method = String(init.method || request?.method || "GET").toUpperCase();
      const data = await bodyBytes(init.body ?? (request && !["GET", "HEAD"].includes(method) ? await request.arrayBuffer() : void 0));
      if (data?.type && !headers.has("content-type")) headers.set("content-type", data.type);
      if (init.signal?.aborted) throw new DOMException("Request aborted.", "AbortError");
      const r = await rpc("fetch", { url, method, headers: [...headers], body: data?.body, credentials: init.credentials || request?.credentials || "same-origin", mode: init.mode || request?.mode || "cors" });
      if (init.signal?.aborted) throw new DOMException("Request aborted.", "AbortError");
      if (r.opaque) {
        const opaque = new Response(null);
        Object.defineProperties(opaque, { type: { value: "opaque" }, status: { value: 0 }, statusText: { value: "" }, ok: { value: false }, url: { value: "" } });
        return opaque;
      }
      const response = new Response([101, 204, 205, 304].includes(r.status) ? null : r.body, { status: r.status, statusText: r.statusText, headers: r.headers });
      Object.defineProperty(response, "url", { value: r.url });
      return response;
    }
    define(window, "fetch", websiteFetch);
    class XHR extends EventTarget {
      readyState = 0;
      status = 0;
      responseType = "";
      responseText = "";
      response = null;
      responseURL = "";
      withCredentials = false;
      timeout = 0;
      headers = new Headers();
      upload = new EventTarget();
      fire(type) {
        this.dispatchEvent(new Event(type));
        this["on" + type]?.call(this, new Event(type));
      }
      open(method, url, async = true) {
        if (async === false) fail("Synchronous XHR is unavailable.");
        this.method = method;
        this.url = remote(url);
        this.readyState = 1;
        this.fire("readystatechange");
      }
      setRequestHeader(k, v) {
        this.headers.append(k, v);
      }
      getAllResponseHeaders() {
        return this.result ? [...this.result.headers].map(([k, v]) => k + ": " + v).join("\r\n") : "";
      }
      getResponseHeader(k) {
        return this.result?.headers.get(k) || null;
      }
      overrideMimeType() {
      }
      abort() {
        this.aborted = true;
        this.fire("abort");
      }
      async send(body) {
        this.aborted = false;
        this.fire("loadstart");
        try {
          const r = await websiteFetch(this.url, { method: this.method, headers: this.headers, body, credentials: this.withCredentials ? "include" : "same-origin" });
          if (this.aborted) return;
          this.result = r;
          this.status = r.status;
          this.statusText = r.statusText;
          this.responseURL = r.url;
          this.readyState = 2;
          this.fire("readystatechange");
          const bytes = await r.arrayBuffer();
          this.responseText = new TextDecoder().decode(bytes);
          this.response = this.responseType === "arraybuffer" ? bytes : this.responseType === "blob" ? new Blob([bytes], { type: r.headers.get("content-type") }) : this.responseType === "json" ? JSON.parse(this.responseText) : this.responseText;
          this.readyState = 4;
          this.fire("readystatechange");
          this.fire("load");
        } catch {
          if (!this.aborted) {
            this.readyState = 4;
            this.fire("readystatechange");
            this.fire("error");
          }
        }
        this.fire("loadend");
      }
    }
    Object.assign(XHR, { UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4 });
    define(window, "XMLHttpRequest", XHR);
    for (const key of ["WebSocket", "WebTransport", "EventSource", "RTCPeerConnection", "webkitRTCPeerConnection"]) define(window, key, function() {
      fail("This transport is blocked in static Browzen.");
    });
    for (const key of ["Worker", "SharedWorker"]) define(window, key, void 0);
    define(navigator, "sendBeacon", () => false);
    define(navigator, "storage", { estimate: async () => ({ quota: 1024 * 1024, usage: new native.Blob([JSON.stringify({ ...localStorage }) + JSON.stringify({ ...sessionStorage })]).size }), persisted: async () => false, persist: async () => false, getDirectory: async () => fail("Persistent filesystem access is unavailable.") });
    read(navigator, "serviceWorker", () => ({ controller: null, getRegistrations: async () => [], getRegistration: async () => void 0, register: async () => fail("Website Service Workers are blocked."), addEventListener() {
    }, removeEventListener() {
    } }));
    const memoryCaches = /* @__PURE__ */ new Map();
    const cacheName = (k) => String(k), cacheKey = (r) => typeof r === "string" ? remote(r) : r.url;
    define(window, "caches", { async open(name) {
      name = cacheName(name);
      if (!memoryCaches.has(name)) memoryCaches.set(name, /* @__PURE__ */ new Map());
      const entries = memoryCaches.get(name);
      return { async match(r) {
        return entries.get(cacheKey(r))?.clone();
      }, async put(r, response) {
        if (entries.size >= 128) throw new DOMException("Memory cache limit reached.", "QuotaExceededError");
        entries.set(cacheKey(r), response.clone());
      }, async delete(r) {
        return entries.delete(cacheKey(r));
      }, async keys() {
        return [...entries.keys()].map((u) => new Request(u));
      }, async add(r) {
        const response = await websiteFetch(r);
        if (!response.ok) throw new TypeError("Cache fetch failed.");
        entries.set(cacheKey(r), response);
      }, async addAll(items) {
        for (const r of items) await this.add(r);
      } };
    }, async keys() {
      return [...memoryCaches.keys()];
    }, async has(n) {
      return memoryCaches.has(cacheName(n));
    }, async delete(n) {
      return memoryCaches.delete(cacheName(n));
    }, async match(r) {
      for (const entries of memoryCaches.values()) {
        const response = entries.get(cacheKey(r));
        if (response) return response.clone();
      }
    } });
    define(navigator, "permissions", { query: async () => ({ state: "denied", onchange: null, addEventListener() {
    }, removeEventListener() {
    } }) });
    function unavailablePermission(names) {
      return action("permission", { names }).then(() => fail("This device API cannot be enabled inside an opaque-origin page."));
    }
    define(navigator, "mediaDevices", { enumerateDevices: async () => [], getUserMedia: (c) => unavailablePermission([...c?.video ? ["camera"] : [], ...c?.audio ? ["microphone"] : []]) });
    define(navigator, "geolocation", { getCurrentPosition: (ok, error) => unavailablePermission(["geolocation"]).catch(() => error?.({ code: 1, message: "Location is blocked in this web version." })), watchPosition: (ok, error) => {
      error?.({ code: 1, message: "Location is blocked." });
      return 0;
    }, clearWatch() {
    } });
    define(navigator, "clipboard", { async readText() {
      return (await action("clipboard", { op: "readText" })).text || "";
    }, async writeText(text) {
      await action("clipboard", { op: "writeText", text: String(text) });
    }, read: () => fail(), write: () => fail() });
    class Notice {
      static permission = "default";
      static async requestPermission() {
        try {
          await action("permission", { names: ["notifications"] });
          Notice.permission = "granted";
          return "granted";
        } catch {
          return "denied";
        }
      }
      constructor(title, options = {}) {
        this.token = "n" + ++sequence;
        action("notification-show", { token: this.token, title, body: options.body }).catch(console.warn);
      }
      close() {
        action("notification-close", { token: this.token });
      }
    }
    define(window, "Notification", Notice);
    const urlAttrs = /* @__PURE__ */ new Set(["src", "href", "xlink:href", "poster", "action", "formaction", "srcset", "imagesrcset", "data", "srcdoc", "ping"]);
    function attr(el, key, value) {
      native.set.call(el, key, value);
    }
    function assetURL(el, key, value) {
      attr(el, key, value);
      if (el.tagName === "SOURCE" && ["VIDEO", "AUDIO"].includes(el.parentElement?.tagName)) el.parentElement.load();
    }
    async function compile(source, module = false) {
      return (await rpc("compile", { source, base: current.base, module })).source;
    }
    function scriptFailure(error, url = "inline script") {
      scriptErrors++;
      console.warn("Browzen could not run " + url + ": " + error.message);
      send("script-error", { count: scriptErrors });
    }
    native.add.call(window, "error", (e) => {
      if (e.target === window) {
        scriptErrors++;
        send("script-error", { count: scriptErrors });
      }
    });
    async function prepare(data) {
      try {
        if (data.error) throw Error(data.error);
        if (data.external) {
          const id = await resourceEntry(data.url, data.module ? "module" : data.cors ? "script-cors" : "script", data.integrity);
          return { ...data, id };
        }
        if (data.raw) {
          const out = await rpc("compile", { source: data.source, base: data.url, module: data.module });
          data = { ...data, source: out.source, imports: out.imports };
        }
        for (const dep of data.imports || []) await resourceEntry(dep.url, "module");
        return data;
      } catch (error) {
        return { ...data, error: error.message };
      }
    }
    async function execute(data, marker) {
      if (!marker?.parentNode) return;
      if (data.error) {
        scriptFailure(Error(data.error), data.url);
        marker.remove();
        return;
      }
      const node = document.createElement("script");
      internal.add(node);
      for (const [k, v] of data.attrs || []) if (!k.startsWith("data-bzn-") && !["src", "integrity", "nonce", "crossorigin", "async", "defer", "nomodule"].includes(k)) attr(node, k, v);
      if (data.external) attr(node, "data-bzn-src", data.url);
      if (data.module) node.type = "module";
      aliases();
      if (data.id || data.module) {
        const url = data.id ? await materializeAsync(data.id) : native.create(new native.Blob([data.source], { type: "text/javascript" }));
        attr(node, "src", url);
        await new Promise((resolve) => {
          const timer = setTimeout(() => {
            scriptFailure(Error("Script execution timed out."), data.url);
            resolve();
          }, 3e4);
          node.onload = () => {
            clearTimeout(timer);
            resolve();
          };
          node.onerror = () => {
            clearTimeout(timer);
            scriptFailure(Error("Script execution failed."), data.url);
            resolve();
          };
          native.insert.call(marker.parentNode, node, marker);
        });
      } else {
        node.textContent = data.source;
        native.insert.call(marker.parentNode, node, marker);
      }
      marker.remove();
    }
    async function prepareScript(el) {
      if (processed.has(el) || internal.has(el)) return;
      processed.add(el);
      if (current.noScript) return;
      const type = (native.get.call(el, "type") || "").toLowerCase();
      if (type && type !== "module" && !/^(text|application)\/(javascript|ecmascript)$/.test(type)) return;
      const src = native.get.call(el, "data-bzn-src"), module = type === "module";
      if (!module && el.noModule) return;
      try {
        const data = await prepare({ url: src ? remote(src) : current.base, external: !!src, module, cors: el.hasAttribute("crossorigin"), integrity: native.get.call(el, "integrity") || "", source: src ? "" : await compile(el.textContent, module), attrs: [...el.attributes].map((a) => [a.name, a.value]) });
        const marker = document.createElement("template");
        native.insert.call(el.parentNode || document.head, marker, el.parentNode ? el : null);
        await execute(data, marker);
        el.dispatchEvent(new Event(data.error ? "error" : "load"));
      } catch (error) {
        scriptFailure(error, src || "inline script");
        el.dispatchEvent(new Event("error"));
      }
    }
    function scheduleURL(el, key, value) {
      attr(el, "data-bzn-" + key, value);
      if (key === "href" && ["A", "AREA"].includes(el.tagName)) {
        attr(el, "href", "#");
        return;
      }
      if (el.tagName === "SCRIPT") {
        if (el.isConnected) prepareScript(el);
        return;
      }
      if (["action", "formaction", "srcdoc", "srcset", "imagesrcset", "ping"].includes(key)) return;
      const kind = el.tagName === "LINK" && hasRel(native.get.call(el, "rel"), "stylesheet") ? "style" : "asset";
      if (el.tagName === "LINK" && kind !== "style") return;
      if (/^data:/i.test(String(value)) || ownedBlobs.has(String(value)) || [...urls.values()].includes(String(value))) {
        assetURL(el, key, value);
        return;
      }
      resource(value, kind, native.get.call(el, "data-bzn-integrity") || native.get.call(el, "integrity") || "").then((url) => {
        assetURL(el, key, url);
      }).catch(() => el.dispatchEvent(new Event("error")));
    }
    Element.prototype.setAttribute = function(key, value) {
      const k = String(key).toLowerCase();
      if (internal.has(this)) return native.set.call(this, key, value);
      if (k === "style" && this.style) {
        this.style.cssText = String(value);
        return;
      }
      if (urlAttrs.has(k)) {
        scheduleURL(this, k, String(value));
        return;
      }
      if (k.startsWith("on")) {
        attr(this, "data-bzn-" + k, String(value));
        native.set.call(this, key, "");
        if (!current?.noScript) compile(String(value)).then((code) => this[k] = native.Function("event", code)).catch(() => {
        });
        return;
      }
      return native.set.call(this, key, value);
    };
    Element.prototype.getAttribute = function(key) {
      const k = String(key).toLowerCase();
      return urlAttrs.has(k) || k.startsWith("on") ? native.get.call(this, "data-bzn-" + k) ?? native.get.call(this, key) : native.get.call(this, key);
    };
    for (const [cls, keys] of [[HTMLScriptElement, ["src"]], [HTMLImageElement, ["src", "srcset"]], [HTMLLinkElement, ["href"]], [HTMLAnchorElement, ["href"]], [HTMLFormElement, ["action"]], [HTMLInputElement, ["src", "formAction"]], [HTMLButtonElement, ["formAction"]], [HTMLMediaElement, ["src"]], [HTMLSourceElement, ["src", "srcset"]], [HTMLIFrameElement, ["src", "srcdoc"]]]) for (const key of keys) {
      const d = Object.getOwnPropertyDescriptor(cls.prototype, key);
      if (d?.configurable) Object.defineProperty(cls.prototype, key, { ...d, get() {
        const value = native.get.call(this, "data-bzn-" + key.toLowerCase());
        if (value != null) try {
          return remote(value);
        } catch {
          return value;
        }
        return d.get?.call(this);
      }, set(value) {
        scheduleURL(this, key.toLowerCase(), String(value));
      } });
    }
    function sanitize(node) {
      if (!node?.querySelectorAll || internal.has(node)) return;
      const nodes = [...node.nodeType === 1 ? [node] : [], ...node.querySelectorAll("*")];
      for (const el of nodes) {
        if (internal.has(el)) continue;
        if (["IFRAME", "FRAME", "OBJECT", "EMBED", "BASE", "META"].includes(el.tagName)) {
          el.remove();
          continue;
        }
        if (el.tagName === "STYLE" && neutralizeCSS(el.textContent) !== el.textContent) el.textContent = el.textContent;
        const rawStyle = native.get.call(el, "style");
        if (rawStyle && neutralizeCSS(rawStyle) !== rawStyle) el.style.cssText = rawStyle;
        for (const a of [...el.attributes]) if (urlAttrs.has(a.name.toLowerCase())) {
          const k = a.name.toLowerCase(), original = native.get.call(el, "data-bzn-" + k) ?? a.value;
          native.remove.call(el, a.name);
          scheduleURL(el, k, original);
        } else if (a.name.startsWith("on")) {
          native.remove.call(el, a.name);
          if (!current.noScript) compile(a.value).then((code) => el[a.name] = native.Function("event", code));
        }
        if (el.tagName === "SCRIPT") {
          if (!processed.has(el)) {
            attr(el, "data-bzn-type", el.type);
            attr(el, "type", "application/x-browzen-pending");
            queueMicrotask(() => {
              attr(el, "type", native.get.call(el, "data-bzn-type") || "");
              prepareScript(el);
            });
          }
        }
      }
    }
    for (const [key, fn] of [["appendChild", native.append], ["insertBefore", native.insert], ["replaceChild", native.replace]]) Node.prototype[key] = function(node, ...args) {
      if (node?.nodeType === 1 && blockedTags.has(node.localName.toLowerCase())) return node;
      sanitize(node);
      return fn.call(this, node, ...args);
    };
    Object.defineProperty(Element.prototype, "innerHTML", { ...native.inner, set(value) {
      const t = document.createElement("template");
      native.inner.set.call(t, String(value));
      sanitize(t.content);
      (this.tagName === "TEMPLATE" ? this.content : this).replaceChildren(t.content);
    }, get: native.inner.get });
    Element.prototype.insertAdjacentHTML = function(position, html) {
      const t = document.createElement("template");
      native.inner.set.call(t, String(html));
      sanitize(t.content);
      const fragment2 = t.content;
      switch (String(position).toLowerCase()) {
        case "beforebegin":
          if (!this.parentNode) throw new DOMException("No parent node.", "NoModificationAllowedError");
          native.insert.call(this.parentNode, fragment2, this);
          break;
        case "afterend":
          if (!this.parentNode) throw new DOMException("No parent node.", "NoModificationAllowedError");
          native.insert.call(this.parentNode, fragment2, this.nextSibling);
          break;
        case "afterbegin":
          native.insert.call(this, fragment2, this.firstChild);
          break;
        case "beforeend":
          native.append.call(this, fragment2);
          break;
        default:
          throw new DOMException("Invalid insertion position.", "SyntaxError");
      }
    };
    const adjacentElement = Element.prototype.insertAdjacentElement;
    compatible(Element.prototype, "insertAdjacentElement", function(position, node) {
      if (blockedTags.has(node?.localName?.toLowerCase())) return null;
      sanitize(node);
      return adjacentElement.call(this, position, node);
    });
    const outer = Object.getOwnPropertyDescriptor(Element.prototype, "outerHTML");
    Object.defineProperty(Element.prototype, "outerHTML", { ...outer, set(value) {
      this.insertAdjacentHTML("beforebegin", value);
      this.remove();
    } });
    if (window.ShadowRoot) {
      const inner = Object.getOwnPropertyDescriptor(ShadowRoot.prototype, "innerHTML");
      Object.defineProperty(ShadowRoot.prototype, "innerHTML", { ...inner, set(value) {
        const t = document.createElement("template");
        native.inner.set.call(t, String(value));
        sanitize(t.content);
        this.replaceChildren(t.content);
      } });
    }
    for (const proto of [Element.prototype, window.ShadowRoot?.prototype]) if (proto) {
      for (const name of ["setHTML", "setHTMLUnsafe"]) if (name in proto) compatible(proto, name, function(value) {
        this.innerHTML = value;
      });
    }
    const parseHTML = DOMParser.prototype.parseFromString;
    compatible(DOMParser.prototype, "parseFromString", function(...args) {
      const doc = parseHTML.apply(this, args);
      sanitize(doc);
      return doc;
    });
    const fragment = Range.prototype.createContextualFragment;
    compatible(Range.prototype, "createContextualFragment", function(value) {
      const result = fragment.call(this, value);
      sanitize(result);
      return result;
    });
    const insertRange = Range.prototype.insertNode;
    compatible(Range.prototype, "insertNode", function(node) {
      if (blockedTags.has(node?.localName?.toLowerCase())) return;
      sanitize(node);
      return insertRange.call(this, node);
    });
    for (const proto of [Element.prototype, Document.prototype, DocumentFragment.prototype, CharacterData.prototype]) for (const key of ["append", "prepend", "replaceChildren", "before", "after", "replaceWith"]) {
      const fn = proto[key];
      if (fn && Object.hasOwn(proto, key)) compatible(proto, key, function(...nodes) {
        nodes = nodes.filter((n) => typeof n === "string" || !blockedTags.has(n?.localName?.toLowerCase()));
        nodes.forEach((n) => {
          if (typeof n !== "string") sanitize(n);
        });
        return fn.apply(this, nodes);
      });
    }
    for (const name of ["parseHTML", "parseHTMLUnsafe"]) if (Document[name]) {
      const fn = Document[name];
      compatible(Document, name, function(...args) {
        const doc = fn.apply(this, args);
        sanitize(doc);
        return doc;
      });
    }
    compatible(document, "write", (...text) => {
      const t = document.createElement("template");
      native.inner.set.call(t, text.join(""));
      sanitize(t.content);
      native.append.call(document.body, t.content);
    });
    compatible(document, "writeln", (...text) => document.write(...text, "\n"));
    compatible(Document.prototype, "open", function() {
      return this;
    });
    compatible(Document.prototype, "close", () => {
    });
    compatible(Document.prototype, "write", function(...text) {
      document.write(...text);
    });
    compatible(Document.prototype, "writeln", function(...text) {
      document.writeln(...text);
    });
    function formData(form, submitter) {
      const data = new FormData(form, submitter);
      return { method: (form.method || "get").toLowerCase(), enctype: form.enctype || "application/x-www-form-urlencoded", entries: [...data] };
    }
    function submit(form, submitter) {
      let url = remote(native.get.call(submitter || form, "data-bzn-formaction") || native.get.call(form, "data-bzn-action") || current.url);
      const data = formData(form, submitter), target = submitter?.formTarget || form.target;
      if (target && target !== "_self" && target !== "_top" && target !== "_parent") {
        if (data.method === "get") {
          const u = new URL(url);
          u.search = new URLSearchParams(data.entries).toString();
          popup(u.href, target);
        } else {
          const token = "p" + ++sequence;
          action("popup-open", { token, url, target, form: data, gesture: navigator.userActivation?.isActive });
        }
      } else send("navigate", { url, form: data });
    }
    HTMLFormElement.prototype.submit = function() {
      submit(this);
    };
    async function startDownload(raw, filename) {
      let blob = downloadBlobs.get(raw);
      if (!blob && /^data:/i.test(raw)) {
        if (raw.length > 44 * 1024 * 1024) throw new TypeError("Download data URL is too large.");
        const match = /^data:([^,]*),([\s\S]*)$/i.exec(raw);
        if (!match) throw new TypeError("Invalid download data URL.");
        const value = /;base64\s*$/i.test(match[1]) ? Uint8Array.from(atob(decodeURIComponent(match[2])), (c) => c.charCodeAt(0)) : new TextEncoder().encode(decodeURIComponent(match[2]));
        blob = new native.Blob([value]);
      }
      if (blob) {
        if (blob.size > 32 * 1024 * 1024) throw new TypeError("Download exceeds 32 MB.");
        return rpc("download", { body: await blob.arrayBuffer(), filename });
      }
      return rpc("download", { url: remote(raw), filename });
    }
    native.add.call(window, "submit", (e) => {
      if (e.defaultPrevented) return;
      e.preventDefault();
      submit(e.target, e.submitter);
    });
    native.add.call(window, "click", (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const a = e.target.closest?.("a,area");
      if (!a) return;
      const raw = native.get.call(a, "data-bzn-href") || native.get.call(a, "href");
      if (!raw) return;
      e.preventDefault();
      if (a.hasAttribute("download")) {
        startDownload(raw, native.get.call(a, "download")).catch((error) => console.warn("Browzen download: " + error.message));
        return;
      }
      if (/^javascript:/i.test(raw)) {
        if (!current.noScript) compile(raw.slice(11)).then((code) => (0, eval)(code));
        return;
      }
      try {
        const url = remote(raw);
        if (a.target && a.target !== "_self" || e.ctrlKey || e.metaKey) popup(url, a.target || "_blank");
        else navigate(url);
      } catch {
      }
    });
    async function hydrateStyles() {
      const jobs = [];
      for (const el of document.querySelectorAll("link[data-bzn-href],style[data-bzn-css],[data-bzn-style]")) {
        if (el.tagName === "LINK") {
          jobs.push(resource(native.get.call(el, "data-bzn-href"), "style", native.get.call(el, "data-bzn-integrity") || "").then((url) => new Promise((resolve) => {
            const timer = setTimeout(resolve, 15e3);
            el.onload = el.onerror = () => {
              clearTimeout(timer);
              resolve();
            };
            attr(el, "href", url);
          })).catch((error) => console.warn("Browzen stylesheet: " + error.message)));
        }
        if (el.hasAttribute("data-bzn-css")) jobs.push(convertCSS(native.get.call(el, "data-bzn-css")).then((css) => {
          el.textContent = css;
        }).catch(() => {
        }));
        if (el.hasAttribute("data-bzn-style")) jobs.push(convertCSS(native.get.call(el, "data-bzn-style")).then((css) => attr(el, "style", css)).catch(() => {
        }));
      }
      return Promise.allSettled(jobs);
    }
    function hydrateImages() {
      const jobs = [];
      for (const el of document.querySelectorAll("[data-bzn-src],[data-bzn-srcset],[data-bzn-poster],image[data-bzn-href],image[data-bzn-xlink\\:href]")) {
        if (!["IMG", "IMAGE", "INPUT", "VIDEO", "AUDIO", "SOURCE", "TRACK", "image"].includes(el.tagName)) continue;
        for (const key of ["src", "srcset", "poster", "href", "xlink:href"]) {
          const value = native.get.call(el, "data-bzn-" + key);
          if (!value) continue;
          const task = () => resource(value).then((url) => assetURL(el, key, url)).catch(() => {
          });
          if (el.tagName === "IMG" && el.loading === "lazy" && "IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                observer.disconnect();
                task();
              }
            }, { rootMargin: "400px" });
            observer.observe(el);
          } else jobs.push(task());
        }
      }
      return Promise.allSettled(jobs);
    }
    async function install(payload) {
      documentInstalled = true;
      current = payload;
      cookie = payload.cookies || "";
      addResources(payload.resources);
      define(window, "localStorage", storage("local", payload.local));
      define(window, "sessionStorage", storage("session", payload.session));
      define(window, "indexedDB", new FDBFactory_default());
      define(window, "IDBKeyRange", FDBKeyRange_default);
      for (const [tag, attrs] of Object.entries(payload.documentAttrs || {})) {
        const el = tag === "html" ? document.documentElement : tag === "body" ? document.body : null;
        if (!el) continue;
        for (const [key, value] of attrs) if (key === "style") {
          attr(el, "data-bzn-style", value);
          attr(el, "style", neutralizeCSS(value));
        } else if (["class", "id", "lang", "dir"].includes(key) || key.startsWith("data-") && !key.startsWith("data-bzn-")) attr(el, key, value);
      }
      const head = document.createElement("template");
      native.inner.set.call(head, payload.head || "");
      native.append.call(document.head, head.content);
      const t = document.createElement("template");
      native.inner.set.call(t, payload.html);
      native.append.call(document.body, t.content);
      document.documentElement.style.zoom = String(payload.zoom / 100);
      let lastTitle = document.title;
      send("title", { title: lastTitle });
      new MutationObserver(() => {
        if (document.title !== lastTitle) {
          lastTitle = document.title;
          send("title", { title: lastTitle });
        }
      }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
      const handlers = [];
      for (const el of document.querySelectorAll("*")) for (const a of [...el.attributes]) if (a.name.startsWith("data-bzn-on") && !current.noScript) handlers.push(compile(a.value).then((code) => {
        el[a.name.slice(9)] = native.Function("event", code);
      }).catch(() => {
      }));
      const prepared = payload.scripts.map((data) => data && !(!data.module && data.nomodule) ? prepare(data) : Promise.resolve(null));
      const styles = hydrateStyles();
      let painted = false;
      const paint = () => {
        if (!painted) {
          painted = true;
          send("paint");
        }
      };
      requestAnimationFrame(paint);
      setTimeout(paint, 100);
      const images = new Promise((resolve) => setTimeout(() => resolve(hydrateImages()), 0));
      const deferred = [], asyncTasks = [];
      for (let i = 0; i < payload.scripts.length; i++) {
        const original = payload.scripts[i];
        if (!original) continue;
        const marker = document.querySelector('template[data-bzn-script="' + i + '"]');
        const run = async () => {
          const data = await prepared[i];
          if (data) await execute(data, marker);
          else marker?.remove();
        };
        if (original.async && original.external) asyncTasks.push(run());
        else if (original.module || original.defer && original.external) deferred.push(run);
        else await run();
      }
      readyState = "interactive";
      for (const run of deferred) await run();
      await Promise.allSettled([styles, ...handlers]);
      native.dispatch.call(document, new Event("DOMContentLoaded", { bubbles: true }));
      send("dom-ready");
      await Promise.allSettled([...asyncTasks, images]);
      readyState = "complete";
      native.dispatch.call(window, new Event("load"));
      send("loaded", { title: document.title, scriptErrors });
    }
    const accept = (e) => {
      if (ready || e.source !== parent || e.data?.type !== "browzen-port" || !e.ports[0]) return;
      ready = true;
      port = e.ports[0];
      window.removeEventListener("message", accept);
      port.onmessage = (e2) => {
        const d = e2.data;
        if (d.rpc) {
          const p = pending.get(d.rpc);
          if (!p) return;
          clearTimeout(p.timer);
          pending.delete(d.rpc);
          d.error ? p.reject(Object.assign(new Error(d.error.message), { name: d.error.name })) : p.resolve(d.result);
          return;
        }
        if (d.type === "document" && !documentInstalled) install(d).catch((error) => {
          document.body.textContent = "Browzen could not render this page: " + error.message;
          send("loaded", { title: "Render error" });
        });
        if (d.type === "cookies") cookie = d.value;
        if (d.type === "zoom") document.documentElement.style.zoom = String(d.zoom / 100);
        if (d.type === "managed-close-notice") popups.get(d.token)?.close();
        if (d.type === "managed-message") {
          const source = d.source?.kind === "popup" ? popups.get(d.source.token)?.handle : openerFacade;
          const event = new MessageEvent("message", { origin: d.origin, data: d.data });
          Object.defineProperty(event, "source", { value: source });
          native.dispatch.call(window, event);
        }
      };
      port.start();
      send("ready");
    };
    window.addEventListener("message", accept);
  })();
})();
