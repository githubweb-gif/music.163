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

import VueLazyLoad from 'vue-lazyload'
import vueBus from './untils/vue_bus'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper)
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

Vue.filter('formatTime', (time) => {
  if (!time) {
    return '00:00'
  }
  switch (true) {
    case time < 10:
      return `00:0${parseInt(time)}`
    case time === 60:
      return '01:00'
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

Vue.filter('count',
  (val) => {
    if (val) {
      val = val.toString()
      switch (true) {
        case Math.ceil(val) >= 10000 && Math.ceil(val) < 100000:
          return `${val.slice(0, 1)}万`
        case Math.ceil(val) >= 100000 && Math.ceil(val) < 1000000:
          return `${val.slice(0, 2)}万`
        case Math.ceil(val) >= 1000000 && Math.ceil(val) < 10000000:
          return `${val.slice(0, 3)}万`
        case Math.ceil(val) >= 10000000 && Math.ceil(val) < 100000000:
          return `${val.slice(0, 4)}千万`
        default:
          return val
      }
    }
    return 0
  }
)

Vue.filter('commentTime', (value) => {
  if (!value) {
    return ''
  }
  const time = new Date(value)
  const now = new Date()
  // const cz = now.getTime() - time.getTime()
  switch (true) {
    case time.getFullYear() === now.getFullYear() && time.getMonth() === now.getMonth() && time.getDate() === now.getDate():
      return `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`
    case time.getFullYear() === now.getFullYear() && time.getMonth() === now.getMonth() && time.getDate() === now.getDate() - 1:
      return '昨天'
    case now.getFullYear() === time.getFullYear():
      return `${time.getMonth() + 1}月${time.getDate()}日`
    default:
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
