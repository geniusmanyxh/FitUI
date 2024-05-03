import { createRouter, createWebHistory } from 'vue-router';
import allRoute from './router';
const routes = createRouter({
  history: createWebHistory(), 
  routes: allRoute
});

export default routes;