// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

const CACHE_NAME = 'rlgl-cache-v0';
/*
const urlsToCache = ['/', 'public'];

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
 */

const KEY = 'key';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.payload);
      })
    );
  }
});
