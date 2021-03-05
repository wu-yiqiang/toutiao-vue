import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home') },
      { path: '/my', name: 'my', component: () => import('@/views/my') },
      { path: '/qa', name: 'qa', component: () => import('@/views/qa') },
      { path: '/video', name: 'video', component: () => import('@/views/video') }
    ]
  },
  { path: '/search', name: 'search', component: () => import('@/views/search') },
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article'), props: true }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
