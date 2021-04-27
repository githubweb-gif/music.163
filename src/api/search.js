import request from '@/untils/request'

/**
 * 搜索歌曲
 * @keywords 关键词
 */
export function searchMusic (data) {
  return request({
    url: '/search',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口,可获取热门搜索列表
 * @keywords 关键词
 */
export function hotKeyWords () {
  return request({
    url: '/search/hot',
    method: 'get'
  })
}

/**
 * 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议
 * 必选参数 :
 * @keywords 关键词
 * 可选参数 :
 * @type : 如果传 'mobile' 则返回移动端数据(这里传入type=mobile)
 */
export function searchSuggest (data) {
  return request({
    url: '/search/suggest',
    method: 'get',
    params: data
  })
}
