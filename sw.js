const CACHE_NAME = 'my-cache-v1';
const ASSETS_TO_CACHE = [
  '/assets/index-dancMfip.js', // Change on file js
  '/assets/index-9Phg3iEl.css', // Change on file css
  '/images/error.webp'
];

self.addEventListener('install', e => {
  console.log('Service Worker installed');
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('Service Worker activated');
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});