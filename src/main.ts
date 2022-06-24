import { Router } from '@vaadin/router';
import { initializeApp } from 'firebase/app';

import { routes } from './routes.js';

export let router = new Router(document.body);
router.setRoutes(routes);
screen?.orientation?.lock('landscape').catch(() => null);

// register service worker
/* if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw10.js').then(
    (reg) => console.log('REGISTER', reg),
    (err) => console.log(err)
  );
} */

/* if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      const data = {
        type: 'CACHE_URLS',
        payload: [location.href, ...performance.getEntriesByType('dist').map((r) => r.name)],
      };
      registration.installing?.postMessage(data);
    })
    .catch((err) => console.log('SW registration FAIL:', err));
} */

// Initialize Firebase
export const firebase = initializeApp({
...
});
