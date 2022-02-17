import { Router } from '@vaadin/router';

import { routes } from './routes.js';

export let router = new Router(document.body);
router.setRoutes(routes);

// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw10.js').then(
    (reg) => console.log('REGISTER', reg),
    (err) => console.log(err)
  );
}
