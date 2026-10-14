const CACHE = 'vneid-v1';
const FILES = [
    'index.html',
    'manifest.json',
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/5.png',
    'img/icon-180.png',
    'img/icon-512.png'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(FILES))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => 
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});