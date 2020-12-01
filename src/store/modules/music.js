import { SET_PLAYLIST, SET_HISTORY } from '@/untils/cache'
const state = {
  // 播放队列
  list: null,
  // 歌曲信息
  musicInfo: {
    // 歌曲总体时间
    duration: 0,
    // 歌手名字
    singerName: '',
    // 歌曲名字
    name: '',
    // 歌曲url
    url: '',
    // 歌曲专辑信息(包含歌曲封面)
    album: null
  },
  // 播放状态
  playing: false,
  // 侧边栏是否显示
  isMusicList: false
}

const mutations = {
  SET_LIST (state, data) {
    state.list = data
  },
  SET_PLAYING (state, flag) {
    state.playing = flag
  },
  SET_MUSICINFO (state, data) {
    for (const i in state.musicInfo) {
      if (data[i]) {
        state.musicInfo[i] = data[i]
      }
    }
  },
  SET_ISMUSICLIST (state, bol) {
    if (!bol) {
      state.isMusicList = false
      return
    }
    state.isMusicList = !state.isMusicList
  }
}
const actions = {
  SET_PLAYLIST ({ commit }, data) {
    commit('SET_LIST', data)
    SET_PLAYLIST(data)
  },
  SET_HISTORY ({ commit }, data) {
    SET_HISTORY(data)
    commit('SET_MUSICINFO', data)
  }
}

export default {
  state,
  mutations,
  actions
}
