import request from '@/untils/request'

/**
 * 搜索歌曲
 * @keywords 关键词
 */
export function searchMusic(data) {
  return request({
    url: '/search',
    method: 'get',
    params: data
  })
}

/**
 * 获取歌曲url
 * @id 歌曲id
 */
export function getMusic(data) {
  return request({
    url: '/song/url',
    method: 'get',
    params: data
  })
}

/**
 * 获取专辑内容
 * @id 专辑 id
 */
export function getAlbum(data) {
  return request({
    url: '/album',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
 * @type 可选参数默认0
 * 0: pc
 * 1: android
 * 2: iphone
 * 3: ipad 专辑 id
 */
export function banner(data) {
  return request({
    url: '/banner',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 私人 FM( 需要登录 )
 */
export function personalFM() {
  return request({
    url: '/personal_fm',
    method: 'get'
  })
}

/**
 * 说明 : 调用此接口 , 可获取推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 */
export function personalized(data) {
  return request({
    url: '/personalized',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 获取歌单详情,  调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐
 * 可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
 * 必选参数 : id : 歌单 id
 * 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
 */
export function songListDetail(data) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开),
 * 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 * 必选参数 : ids: 音乐 id, 如 ids=347230
 */
export function allSongDetail(ids) {
  return request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids: ids
    }
  })
}
