import Vue from 'vue'
import VueRouter from 'vue-router'
// import cookie from '@js/cookie'
Vue.use(VueRouter)
// 首页、登录等基础页面
const base = [
  {
    // 首页
    path: '/',
    name: 'home',
    meta: { title: '金晨' },
    component: () =>
      import(/* webpackChunkName: "base" */ '@views/home/index.vue')
  }
]

const router = new VueRouter({
  routes: [...base]
})

router.beforeEach(async (to, from, next) => {
  // const jwt = cookie.getItem('X-JWT')
  // if (!jwt) {
  //   if (['login'].includes(to.name)) {
  //     next()
  //   } else {
  //     next('/')
  //   }
  // } else {
  // next()
  // }
  next()
})
export default router
