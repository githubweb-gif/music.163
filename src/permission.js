import store from './store'
import router from './router'

router.beforeEach((to, from, next) => {
  const status = store.state.user.loginStatus
  if (status) {
    next()
  } else {
    store.dispatch('logoutStatus')
    next()
  }
})
