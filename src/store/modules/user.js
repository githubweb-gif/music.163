import { phoneLogin, register, sentCode, verifyCode } from '../../api/login'
const state = {
  name: '',
  avatar: '',
  id: '',
  loginState: false
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_LOGIN_STATE (state, bol) {
    console.log(bol)
    state.loginState = bol || false
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { phone, password } = userInfo
    return new Promise((resolve, reject) => {
      phoneLogin({ phone: phone.trim(), password: password }).then(response => {
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 注册
  register ({ commit }, userInfo) {
    const { phone, password, captcha } = userInfo
    return new Promise((resolve, reject) => {
      register({ phone: phone.trim(), password: password, captcha: captcha }).then(response => {
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 发送验证码
  sentCode ({ commit }, phone) {
    return new Promise((resolve, reject) => {
      sentCode({ phone: phone }).then(response => {
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 验证验证码
  verifyCode ({ commit }, data) {
    return new Promise((resolve, reject) => {
      verifyCode({ phone: data.phone, captcha: data.captcha }).then(response => {
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  // get user info
  //   getInfo ({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //       getInfo(state.token).then(response => {
  //         const { data } = response

  //         if (!data) {
  //           reject('Verification failed, please Login again.')
  //         }

  //         const { roles, name, avatar, introduction } = data

  //         // roles must be a non-empty array
  //         if (!roles || roles.length <= 0) {
  //           reject('getInfo: roles must be a non-null array!')
  //         }

  //         commit('SET_ROLES', roles)
  //         commit('SET_NAME', name)
  //         commit('SET_AVATAR', avatar)
  //         commit('SET_INTRODUCTION', introduction)
  //         resolve(data)
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },

  // user logout
  //   logout ({ commit, state, dispatch }) {
  //     return new Promise((resolve, reject) => {
  //       logout(state.token).then(() => {
  //         commit('SET_TOKEN', '')
  //         commit('SET_ROLES', [])
  //         removeToken()
  //         resetRouter()

  //         // reset visited views and cached views
  //         // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //         dispatch('tagsView/delAllViews', null, { root: true })

//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   }
}

export default {
//   namespaced: true,
  state,
  mutations,
  actions
}
