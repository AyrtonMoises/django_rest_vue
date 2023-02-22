// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { createToast } from 'mosha-vue-toastify';

import { useAppStore } from '@/store/app';


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/list-users',
        name: 'ListUsers',
        component: () => import('@/views/ListUsers.vue'),
      },
    ],
  }

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {

  const publicPages = ['/login','/register'];
  const authRequired = !publicPages.includes(to.path);
  const appStore = useAppStore();

  if (authRequired && !appStore.is_connected) {
      createToast('User disconnected', {type: 'danger'})
      useAppStore.returnUrl = to.fullPath;
      return '/login';
   }
});

export default router
