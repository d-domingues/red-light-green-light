import { Route } from '@vaadin/router';
import './views/game-view.js';
import './views/home-view.js';
import './views/ranking-view.js';

export const routes: Route[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: 'home-view' },
  { path: '/game', component: 'game-view' },
  { path: '/ranking', component: 'ranking-view' },
  { path: '(.*)', component: 'home-view' },
];
