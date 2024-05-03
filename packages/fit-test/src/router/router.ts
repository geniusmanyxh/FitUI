import type { RouteRecordRaw } from 'vue-router'
const routes:Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/index.vue'),
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('@/examples/FButton/index.vue')
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('@/examples/FIcon/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/examples/FMessage/index.vue')
  },

]


export default routes