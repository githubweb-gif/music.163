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

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
