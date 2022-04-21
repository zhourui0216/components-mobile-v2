import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/navbar",
    name: "navbar",
    component: () => import('../views/pages/navbar.vue')
  },
  {
    path: "/tabbar",
    name: "tabbar",
    component: () => import('../views/pages/tabbar.vue')
  },
  {
    path: "/swiper",
    name: "swiper",
    component: () => import('../views/pages/swiper.vue')
  },
  {
    path: "/indexList",
    name: "indexList",
    component: () => import('../views/pages/indexList.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
