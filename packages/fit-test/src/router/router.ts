import type { RouteRecordRaw } from 'vue-router'
const routes:Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/index.vue'),
  },
  // 基础组件
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
    path: '/tag',
    name: 'tag',
    component: () => import('@/examples/FTag/index.vue')
  },
  {
    path: '/badge',
    name: 'badge',
    component: () => import('@/examples/FBadge/index.vue')
  },
  {
    path: '/avatar',
    name: 'avatar',
    component: () => import('@/examples/FAvatar/index.vue')
  },
  {
    path: '/divider',
    name: 'divider',
    component: () => import('@/examples/FDivider/index.vue')
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import('@/examples/FProgress/index.vue')
  },
  // 表单组件
  {
    path: '/input',
    name: 'input',
    component: () => import('@/examples/FInput/index.vue')
  },
  {
    path: '/input-number',
    name: 'input-number',
    component: () => import('@/examples/FInputNumber/index.vue')
  },
  {
    path: '/textarea',
    name: 'textarea',
    component: () => import('@/examples/FTextarea/index.vue')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('@/examples/FSelect/index.vue')
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component: () => import('@/examples/FCheckbox/index.vue')
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import('@/examples/FRadio/index.vue')
  },
  {
    path: '/switch',
    name: 'switch',
    component: () => import('@/examples/FSwitch/index.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/examples/FForm/index.vue')
  },
  // 数据展示
  {
    path: '/table',
    name: 'table',
    component: () => import('@/examples/FTable/index.vue')
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('@/examples/FCard/index.vue')
  },
  {
    path: '/pagination',
    name: 'pagination',
    component: () => import('@/examples/FPagination/index.vue')
  },
  {
    path: '/empty',
    name: 'empty',
    component: () => import('@/examples/FEmpty/index.vue')
  },
  {
    path: '/skeleton',
    name: 'skeleton',
    component: () => import('@/examples/FSkeleton/index.vue')
  },
  {
    path: '/code-block',
    name: 'code-block',
    component: () => import('@/examples/FCodeBlock/index.vue')
  },
  // 导航组件
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/examples/FMenu/index.vue')
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: () => import('@/examples/FTabs/index.vue')
  },
  {
    path: '/breadcrumb',
    name: 'breadcrumb',
    component: () => import('@/examples/FBreadcrumb/index.vue')
  },
  {
    path: '/dropdown',
    name: 'dropdown',
    component: () => import('@/examples/FDropdown/index.vue')
  },
  // 反馈组件
  {
    path: '/alert',
    name: 'alert',
    component: () => import('@/examples/FAlert/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/examples/FMessage/index.vue')
  },
  {
    path: '/notification',
    name: 'notification',
    component: () => import('@/examples/FNotification/index.vue')
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('@/examples/FLoading/index.vue')
  },
  {
    path: '/modal',
    name: 'modal',
    component: () => import('@/examples/FModal/index.vue')
  },
  {
    path: '/drawer',
    name: 'drawer',
    component: () => import('@/examples/FDrawer/index.vue')
  },
  {
    path: '/popover',
    name: 'popover',
    component: () => import('@/examples/FPopover/index.vue')
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: () => import('@/examples/FToolTip/index.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/examples/FResult/index.vue')
  },
]


export default routes