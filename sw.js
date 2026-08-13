
const CACHE="hit30-clasico-temp-v1";
const STATIC=[
 "./",
 "./index.html",
 "./manifest-v12.webmanifest",
 "./hit30-final-192.png",
 "./hit30-final-512.png",
 "./catalogo-clasico.js",
 "./catalogo-cine.js",
 "./catalogo-latino.js",
 "./catalogo-ot.js",
 "./catalogo-verano.js",
 "./catalogo-tv.js"
];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 const u=new URL(e.request.url);
 if(e.request.mode==="navigate"){
   e.respondWith(fetch(e.request,{cache:"no-store"}).catch(()=>caches.match("./index.html")));
   return;
 }
 if(u.origin===location.origin){
   e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{const c=r.clone();caches.open(CACHE).then(k=>k.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
 }
});
