import { createRouter, createWebHistory } from 'vue-router'

import useAuthStore from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('../views/CategoriesView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.isLoggedIn && !['Login', 'Register'].includes(to.name!.toString())) {
    next('/login')
  } else if (authStore.isLoggedIn && ['Login', 'Register'].includes(to.name!.toString())) {
    next('/')
  } else {
    next()
  }
})

export default router
