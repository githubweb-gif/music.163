const loading = {
  state: {
    loadingElement: null,
    // 请求次数
    n: 0
  },
  mutations: {
    SET_LOADINGELEMENT (state, val) {
      state.loadingElement = val || null
    },
    SET_N (state, val) {
      state.n = val || 0
    }
  },
  actions: {
    SET_STAET ({ commit }, data) {
      commit('SET_LOADINGELEMENT', data.loadingElement)
      commit('SET_N', data.n)
    }
  }
}

export default loading
