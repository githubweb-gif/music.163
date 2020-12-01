/**
 * @key 播放队列缓存
 */
const key = 'PLAYLIST'

// 播放队列
export function SET_PLAYLIST (data) {
  window.sessionStorage.setItem(key, data)
}

// 获取播放队列
export function GET_PLAYLIST (data) {
  window.sessionStorage.getItem(key)
}

// 刪除播放队列
export function REMOVE_PLAYLIST (data) {
  window.sessionStorage.removeItem(key)
}

/**
 * @key1 最近播放的歌曲
 * 歌曲所有信息
 */
const key1 = 'HISTORY_KEY'

// 最近播放
export function SET_HISTORY (data) {
  window.sessionStorage.setItem(key1, data)
}

// 获取最近播放
export function GET_HISTORY (data) {
  window.sessionStorage.getItem(key1)
}

// 刪除最近播放
export function REMOVE_HISTORY (data) {
  window.sessionStorage.removeItem(key1)
}
