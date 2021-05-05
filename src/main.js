import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// normalize.css
import './style/normalize.css'
import './style/index.css'
// ele
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// font
import './assets/font/iconfont.css'
import './style/transition.css'
// 路由守卫
import './permission'
// filter
import '@/utils/filter'

import VueLazyLoad from 'vue-lazyload'
import vueBus from './utils/vue_bus'

Vue.use(ElementUI)
// vue_bus
Vue.prototype.$bus = vueBus
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require('./assets/logo.png'),
  loading: require('./assets/logo.png'),
  attempt: 2,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove', 'click']
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
