import { createRouter, createWebHistory, useRoute } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { watch } from 'vue'

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

router.beforeEach((to, from) => {
  const store = useAuthenticationStore()
  const isAuth = store.isAuthentication.some((value) => value.isAuth)
  if (to.meta.requiresAuth && !isAuth && from.name !== 'chat') {
    return '/'
  }
  if (!to.meta.requiresAuth && isAuth) {
    router.push('/chat/0')
  }
})

router.afterEach(() => {
  const { isAuthentication } = useAuthenticationStore()
  const route = useRoute()
  watch(isAuthentication, (isAuthentication) => {
    const isAuth = isAuthentication.find((value) => value.isAuth)
    if (route.meta.requiresAuth && !isAuth) {
      if (route.name === 'chat') {
        router.push('/')
      }
    }
  })
})

export default router
