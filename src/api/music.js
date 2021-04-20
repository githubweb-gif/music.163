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

/**
 * 说明 : 私人 FM( 需要登录 )
 */
export function personalFM () {
  return request({
    url: '/personal_fm',
    method: 'get'
  })
}

/**
 * 说明 : 调用此接口 , 可获取推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 */
export function personalized (data) {
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
 * 可选参数 :
 * @s : 歌单最近的 s 个收藏者,默认为8
 */
export function songListDetail (data) {
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
export function allSongDetail (ids) {
  return request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids: ids
    }
  })
}

/**
 * 说明 : 对歌单添加或删除歌曲( 需要登录 )
 * 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 * 必选参数 :
 * @op : 从歌单增加单曲为 add, 删除为 del
 * @pid : 歌单 id
 * @tracks : 歌曲 id,可多个,用逗号隔开
 * 可选参数
 * @timestamp : 时间戳因为服务端有缓存机制，所以为了及时拿到更新后的数据需要加上时间戳
 */
export function addOrdel (data) {
  return request({
    url: '/playlist/tracks',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 传入歌单名字可新建歌单
 * 必选参数 :
 * @name : 歌单名
 * 可选参数
 * @privacy : 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
 * @type : 歌单类型,默认'NORMAL',传 'VIDEO'则为视频歌单
 */
export function createPlayList (data) {
  return request({
    url: '/playlist/create',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 */
export function songLists () {
  return request({
    url: '/playlist/catlist',
    method: 'get'
  })
}

/**
 * 说明 : 调用此接口,可以获取对应类型的歌单
 * 可选参数
 * @order 可选 'new' 'hot',分别对应最新和最热默认，hot
 * @cat 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
 * @limit 歌单数量，默认50
 * @offset 偏移数量 , 用于分页 , 如 :( 评论页数 1)*50, 其中 50 为 limit 的值
 */
export function catergroyList (data) {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 可获取新歌速递
 * 必选参数 :
 * @type 地区类型 id,对应以下:全部:0华语:7欧美:96日本:8韩国:16
 */
export function getNewMusic (data) {
  return request({
    url: '/top/song',
    method: 'get',
    params: data
  })
}
