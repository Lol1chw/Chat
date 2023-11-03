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
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to) => {
  const store = useAuthenticationStore()
  const isAuth = store.isAuthentication.some((value) => value.isAuth)

  if (to.meta.requiresAuth && !isAuth) {
    return '/'
  }

  if (!to.meta.requiresAuth && isAuth) {
    return '/chat/0'
  }

  // Guard for logined users
})
export default router
