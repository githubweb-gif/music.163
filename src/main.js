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

Vue.filter('formatTime', (time) => {
  if (!time) {
    return '00:00'
  }
  switch (true) {
    case time < 10:
      return `00:0${parseInt(time)}`
    case time === 60:
      return `01:00`
    case time < 60:
      return `00:${parseInt(time)}`
    case time > 60:
      if (parseInt(time % 60) < 10) {
        return `${parseInt(time / 60)}:0${parseInt(time % 60)}`
      }
      return `${parseInt(time / 60)}:${parseInt(time % 60)}`
    default:
      return '00:00'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
