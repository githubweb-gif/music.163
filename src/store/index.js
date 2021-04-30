import Vue from 'vue'
import Vuex from 'vuex'
import music from './modules/music'
import getters from './getters'
import user from './modules/user'
import loading from './modules/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    music,
    user,
    loading
  },
  getters
})
