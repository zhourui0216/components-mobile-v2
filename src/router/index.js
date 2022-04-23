import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: "/navbar",
    name: "navbar",
    component: () => import('../views/pages/use_navbar.vue')
  },
  {
    path: "/tabbar",
    name: "tabbar",
    component: () => import('../views/pages/use_tabbar.vue')
  },
  {
    path: "/swiper",
    name: "swiper",
    component: () => import('../views/pages/use_swiper.vue')
  },
  {
    path: "/indexList",
    name: "indexList",
    component: () => import('../views/pages/use_index_list.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
