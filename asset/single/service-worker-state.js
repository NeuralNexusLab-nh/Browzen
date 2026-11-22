// A blocked registration never yields a controlling worker. Keep the container
// and ready promise stable; do not fabricate a successful registration.
export function blockedServiceWorkers(){
 const ready=new Promise(()=>{});
 return {controller:null,ready,getRegistrations:async()=>[],getRegistration:async()=>undefined,
  register:async()=>{throw new DOMException('Website Service Workers are blocked.','NotSupportedError');},
  addEventListener(){},removeEventListener(){}};
}
