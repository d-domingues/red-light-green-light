import { Router } from '@vaadin/router';

import { routes } from './routes.js';

export let router = new Router();
router.setOutlet(document.body);
router.setRoutes(routes);
Router.go('home');
