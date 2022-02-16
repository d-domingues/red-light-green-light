const CACHE_NAME = 'my-site-cache-v0';
const urlsToCache = ['/', '/index.html', '/src/styles.css'];

self.addEventListener('install', (ev) => {
  console.log('INSTALL', ev);
  ev.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (ev) => {
  console.log('ACTIVATE', ev);
});
