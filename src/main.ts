import { Router } from '@vaadin/router';

import { routes } from './routes.js';

export let router = new Router(document.body);

// initialize service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('./../sw.js').then(
      (reg) => console.log('REGISTER', reg),
      (err) => console.log(err)
    )
  );
}

router.setRoutes(routes);
Router.go('home');
