import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/users/Users.vue')
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import('@/views/payments/Payments.vue')
    }
  ]
})

export default router
