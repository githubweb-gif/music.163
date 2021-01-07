import store from './store'
import router from './router'
import { getAuth } from './untils/auth'

router.beforeEach((to, from, next) => {
  const status = store.state.user.loginStatus
  if (getAuth('MUSIC_U')) {
    if (status) {
      next()
    } else {
      store.dispatch('logoutStatus')
      next()
    }
  } else {
    next()
  }
})
