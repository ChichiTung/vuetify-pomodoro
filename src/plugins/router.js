import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'KURODORO'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: {
        title: 'KURODORO | Settings'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/ListView.vue'),
      meta: {
        title: 'KURODORO | List'
      }
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
