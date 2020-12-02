import { phoneLogin, register, sentCode, verifyCode, logoutStatus, logout } from '../../api/login'
const state = {
  name: '',
  avatar: '',
  id: '',
  // 是否显示登录界面
  loginState: false,
  // 登录状态
  loginStatus: false,
  // 右侧边栏是否显示
  isUserRight: false
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
    state.loginState = bol
  },
  SET_LOGIN_STATUS (state, bol) {
    state.loginStatus = bol
  },
  SET_IS_USER_Right (state, bol) {
    state.isUserRight = bol
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
  },
  // 登录状态验证，且返回用户基本信息
  logoutStatus ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logoutStatus().then(async (data) => {
        // // 刷新登录状态
        // const status = await refreshLogin()
        // console.log(status)
        const { profile } = data
        commit('SET_NAME', profile.nickname)
        commit('SET_AVATAR', profile.avatarUrl)
        commit('SET_ID', profile.userId)
        commit('SET_LOGIN_STATUS', true)
        resolve(data)
      }).catch((error) => {
        console.log(error.response)
        commit('SET_LOGIN_STATUS', false)
        reject(error)
      })
    })
  },
  // user logout
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ID', '')
        commit('SET_LOGIN_STATUS', false)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
//   namespaced: true,
  state,
  mutations,
  actions
}
