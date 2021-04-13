/**
 * @key 播放队列缓存
 */
const key = 'PLAYLIST'

// 播放队列，app运行时应当直接建立，而不是后期添加
// 因为是对象而不是原始值，所以要把对象转换为json对象，用的时候在转换为对象
export function SET_PLAYLIST_LOCAL(data) {
  window.sessionStorage.setItem(key, JSON.stringify(data))
}

// 获取播放队列
export function GET_PLAYLIST_LOCAL() {
  return JSON.parse(window.sessionStorage.getItem(key)) || []
}

// 刪除播放队列
export function REMOVE_PLAYLIST_LOCAL() {
  window.sessionStorage.removeItem(key)
}

/**
 * @key1 最近播放的歌曲
 * 歌曲所有信息
 */
const key1 = 'HISTORY_KEY'

// 最近播放
export function SET_HISTORY(data) {
  console.log(data)
  window.sessionStorage.setItem(key1, JSON.stringify(data))
}

// 获取最近播放
export function GET_HISTORY() {
  console.log(JSON.parse(window.sessionStorage.getItem(key1)))
  return JSON.parse(window.sessionStorage.getItem(key1))
}

// 刪除最近播放
export function REMOVE_HISTORY() {
  window.sessionStorage.removeItem(key1)
}

/** 歌单id
 * @id 播放歌单id
 * @type String
 */
export function setSonglistIdLocal(id) {
  window.sessionStorage.setItem('songListId', id)
}

export function getSonglistIdLocal(id) {
  window.sessionStorage.getItem('songListId', id)
}

export function removeSonglistIdLocal(id) {
  window.sessionStorage.removeItem('songListId', id)
}
