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
