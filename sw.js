const CACHE='hit30-definitivo-v14-4';
const ASSETS=['./','./index.html','./manifest-v14.3.webmanifest','./hit30-final-192.png','./hit30-final-512.png',
'./catalogo-clasico.js','./catalogo-cine.js','./catalogo-latino.js','./catalogo-ot.js','./catalogo-verano.js','./catalogo-tv.js','./catalogo-espana.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).catch(()=>caches.match(e.request))));
