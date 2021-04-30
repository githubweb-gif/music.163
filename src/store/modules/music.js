import { SET_PLAYLIST_LOCAL, SET_HISTORY, GET_PLAYLIST_LOCAL, setSonglistIdLocal, getSonglistIdLocal } from '@/untils/cache'
import norepeat from '@/untils/norepeat.js'
import { songListDetail, albumDetail } from '@/api/music'
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
  // 当前播放时间
  currentTime: 0,
  // 播放状态
  playing: false,
  // 侧边栏是否显示
  isMusicList: false,
  // 歌单id用来记录那个歌单播放歌曲了
  songListId: getSonglistIdLocal() || '',
  // 歌单内容详情
  playlistDetails: null,
  // 歌单拥有者id
  userId: '',
  // 专辑内容详情
  albumDetails: null
}

const mutations = {
  SET_LIST (state, data) {
    // one表示下一首或者更多首，而不是更新整个表单
    if (data.one) {
      state.list = norepeat(state.list, data.list, state.musicInfo.id)
    } else {
      state.list = data.list
    }
    // 播放队列放在本地, 不是从云端获取
    SET_PLAYLIST_LOCAL(state.list)
  },
  SET_PLAYING (state, flag) {
    state.playing = flag
  },
  SET_MUSICINFO (state, data) {
    for (const i in state.musicInfo) {
      if (data[i]) {
        state.musicInfo[i] = data[i]
      } else {
        state.musicInfo[i] = null
      }
    }
  },
  SET_ISMUSICLIST (state, bol) {
    if (!bol) {
      state.isMusicList = false
      return
    }
    state.isMusicList = !state.isMusicList
  },
  SET_SONGLISTID (state, id) {
    // 非歌单播放歌曲清空歌单id
    setSonglistIdLocal(id)
    state.songListId = id
  },
  SET_PLAYLISTDETAIL (state, data) {
    state.playlistDetails = data
  },
  SET_ALNUMDETAILS (state, data) {
    state.albumDetails = data
  },
  SET_USERID (state, id) {
    state.userId = id
  },
  SET_CURRENTTIME (state, currentTime) {
    state.currentTime = currentTime
  }
}
const actions = {
  /** 播放列表
   * 从新的歌单播放歌曲，播放列表替换为歌单内的所有歌曲
   * 下一首播放，添加此歌曲到播放列表
   * 搜索到的歌曲，如果播放了其中一首则把此歌曲添加到播放队列
   * 播放队列存储在本地，也就是多设备登录不会共享播放列表，都是单独的
   */
  SET_PLAYLIST ({ commit }, data) {
    commit('SET_LIST', data)
  },
  // 添加播放记录
  SET_HISTORY ({ commit }, data) {
    SET_HISTORY(data)
    commit('SET_MUSICINFO', data)
  },
  // 获取歌单详细内容
  GET_SONGS_DETAIL ({ commit }, id) {
    return new Promise((resolve, reject) => {
      songListDetail({ id, timestamp: Date.now() }).then(data => {
        commit('SET_PLAYLISTDETAIL', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取专辑详细内容
  GET_ALBUM_DETAIL ({ commit }, id) {
    return new Promise((resolve, reject) => {
      albumDetail({ id, timestamp: Date.now() }).then(data => {
        commit('SET_ALNUMDETAILS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
