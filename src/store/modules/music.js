import { SET_PLAYLIST_LOCAL, SET_HISTORY, GET_PLAYLIST_LOCAL, setSonglistIdLocal, getSonglistIdLocal } from '@/untils/cache'
const state = {
  // 播放队列
  list: GET_PLAYLIST_LOCAL() || [],
  // 歌曲信息
  musicInfo: {
    // 歌曲id
    id: '',
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
  isMusicList: false,
  // 歌单id用来记录那个歌单播放歌曲了
  songListId: getSonglistIdLocal() || ''
}

const mutations = {
  SET_LIST(state, data) {
    // one表示添加，而不是更新整个表单
    let i, n
    if (data.one) {
      if (state.list instanceof Array) {
        state.list.forEach((x, index) => {
          if (state.musicInfo.id === x.id) {
            i = index
          }
          if (x.id === data.list.id) {
            n = index
          }
        })
        if (n) {
          state.list.splice(n, 1)
          state.list.splice(i + 1, 0, data.list)
        } else {
          state.list.push(data.list)
        }
      } else {
        state.list = []
        state.list.push(data.list)
      }
    } else {
      state.list = data.list
    }
    // 播放队列放在本地, 不是从云端获取
    SET_PLAYLIST_LOCAL(state.list)
  },
  SET_PLAYING(state, flag) {
    state.playing = flag
  },
  SET_MUSICINFO(state, data) {
    for (const i in state.musicInfo) {
      if (data[i]) {
        state.musicInfo[i] = data[i]
      } else {
        state.musicInfo[i] = null
      }
    }
    console.log(state.musicInfo)
  },
  SET_ISMUSICLIST(state, bol) {
    if (!bol) {
      state.isMusicList = false
      return
    }
    state.isMusicList = !state.isMusicList
  },
  SET_SONGLISTID(state, id) {
    // 非歌单播放歌曲清空歌单id
    setSonglistIdLocal(id)
    state.songListId = id
  }
}
const actions = {
  /** 播放列表
   * 从新的歌单播放歌曲，播放列表替换为歌单内的所有歌曲
   * 下一首播放，添加此歌曲到播放列表
   * 搜索到的歌曲，如果播放了其中一首则把此歌曲添加到播放队列
   * 播放队列存储在本地，也就是多设备登录不会共享播放列表，都是单独的
   */
  SET_PLAYLIST({ commit }, data) {
    commit('SET_LIST', data)
  },
  // 添加播放记录
  SET_HISTORY({ commit }, data) {
    SET_HISTORY(data)
    commit('SET_MUSICINFO', data)
  }
}

export default {
  state,
  mutations,
  actions
}
