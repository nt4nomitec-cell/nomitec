// Version 2 (Cache Update Fix)
const CACHE_NAME = 'nomitec-v2'; 
const urlsToCache = [
  '/',
  '/index.html',
  '/packages.html',
  '/portfolio.html',
  '/images/logo.png'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Purane cache ko foran replace karega
});

// Activate Event (Purana Cache Delete Karne Ka Magic Code)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Purana cache delete ho jayega
          }
        })
      );
    })
  );
  self.clients.claim(); // Naya cache foran apply hoga
});

// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});