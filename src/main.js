import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import navbar from "./components/navbar/navbar.vue"
Vue.component("navbar", navbar)

import tabbar from "./components/tabbar/tabbar.vue"
Vue.component("tabbar", tabbar)

import swiper from "./components/swiper/swiper.vue"
Vue.component("swiper", swiper)

import indexList from "./components/index-list/index-list.vue"
Vue.component("indexList", indexList)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
