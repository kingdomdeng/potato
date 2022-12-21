import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import menu from '@/views/menu/router'
import user from '@/views/user/router'
import role from '@/views/role/router'
import notice from '@/views/notice/router'
import log from '@/views/log/router'
import pipeline from '@/views/pipeline/router'
import NProgress from 'NProgress'
import 'NProgress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/menu',
      children: [
        ...menu,
        ...user,
        ...role,
        ...notice,
        ...log,
        ...pipeline,
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

NProgress.configure({
  speed: 500,
  showSpinner: false,
});

router.beforeEach((to, from, next) => {
  if (from.fullPath !== '/') {
    NProgress.start()
  }
  
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    NProgress.done()
  }, 200)
})

export default router
