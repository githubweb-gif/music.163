import request from '@/untils/request'

/**
 * 搜索歌曲
 * @keywords 关键词
 */
export function searckMusic (data) {
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
export function getMusic (data) {
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
export function getAlbum (data) {
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
export function banner (data) {
  return request({
    url: '/banner',
    method: 'get',
    params: data
  })
}
