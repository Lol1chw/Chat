import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/chat/:id',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChatView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to) => {
  const store = useAuthenticationStore()
  if (to.meta.requiresAuth && !store.isAuth) {
    return '/'
  }
})

export default router