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
      { path: '', name: 'home', component: () => import('@/views/home'), meta: { keepAlive: true, scollTopPosition: 0 } },
      { path: '/my', name: 'my', component: () => import('@/views/my') },
      { path: '/qa', name: 'qa', component: () => import('@/views/qa') },
      { path: '/video', name: 'video', component: () => import('@/views/video') }
    ]
  },
  { path: '/search', name: 'search', component: () => import('@/views/search') },
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article'), props: true },
  { path: '/user/profile', name: 'userprofile', component: () => import('@/views/user-profile') }
]

const router = new VueRouter({
  routes
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  // 设置路由守卫，进行强制跳转
  next()
})

export default router
