import { createRouter, createWebHistory } from 'vue-router';

import baseRouters from './modules/base';

const routes = [...baseRouters];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
