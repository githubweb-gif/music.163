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
 * 必选参数 : @id : 歌单 @id
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
 * 必选参数 : @ids : 音乐 id, 如 ids=347230
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

/**
 * 说明 : 调用此接口 , 可获取新碟上架列表 , 如需具体音乐信息需要调用获取专辑列表接 口 /album , 然后传入 id, 如 /album?id=32311&limit=30
 * 返回最近几月和本周的数据
 */
export function getNewList () {
  return request({
    url: '/top/album',
    method: 'get'
  })
}

/**
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * 必选参数 : @id : 专辑 id
 */
export function albumDetail (data) {
  return request({
    url: '/album',
    method: 'get',
    params: data
  })
}

/**
 * 说明 :  调用此接口,可获取歌手分类列表
 * 可选参数 :
 * @limit : 返回数量 , 默认为 30
 * @offset : 偏移数量，用于分页
 * @initial : 按首字母索引查找参数,,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列 热门传-1,#传0
 * @type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
 * @area 取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 */
export function getSinger (data) {
  return request({
    url: '/artist/list',
    method: 'get',
    params: data
  })
}

/**
 * 说明 :  获取歌手描述,传入歌手 id。个人经历，成就，获奖
 * 必选参数 :
 * @id : 歌手 id
 */
export function singerDesc (data) {
  return request({
    url: '/artist/desc',
    method: 'get',
    params: data
  })
}

/**
 * 说明 :  获取歌手详情,传入歌手 id。获取歌手单曲数，专辑，mv等。还有个人简介
 * 必选参数 :
 * @id : 歌手 id
 */
export function singerDetail (data) {
  return request({
    url: '/artist/detail',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口,可获取歌手热门50首歌曲
 * 必选参数 :
 * @id : 歌手 id
 */
export function singerHotMusic (data) {
  return request({
    url: '/artist/top/song',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 * 必选参数 :
 * @id : 歌手 id
 * @limit :数量默认30
 * @offset :偏移数量
 */
export function singerAblum (data) {
  return request({
    url: '/artist/album',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
 * 必选参数 :
 * @id : 歌手 id
 */
export function similarSinger (data) {
  return request({
    url: '/simi/artist',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 获取歌手 mv, 传入歌手 id, 可获得歌手 mv 信息
 * 必选参数 :
 * @id : 歌手 id
 */
export function singerMv (data) {
  return request({
    url: '/artist/mv',
    method: 'get',
    params: data
  })
}

/**
 * 说明 :  调用此接口 , 传入 mv id,可获取 mv 播放地址
 * 必选参数 :
 * @id : mv id
 * 可选参数 : @r : 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表
 */
export function mvUrl (data) {
  return request({
    url: '/mv/url',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据
 * 必选参数 :
 * @mvid : mvid
 */
export function mvDetail (data) {
  return request({
    url: '/mv/detail',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 说明 : 调用此接口 , 传入 mvid 可获取相似 mv
 * 必选参数 :
 * @mvid : mvid
 */
export function simi (data) {
  return request({
    url: '/simi/mv',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
 * 必选参数 :
 * @id : mvid
 * 可选参数 : limit: 取出评论数量 , 默认为 20
 * @offset : 偏移数量 , 用于分页
 * @before : 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export function getComment (data) {
  return request({
    url: '/comment/mv',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口,可发送评论或者删除评论
 * 必选参数 :
 * @t :1 发送, 2 回复
 * @tpye : 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
 * 0: 歌曲 1: mv2: 歌单3: 专辑4: 电台5: 视频6: 动态
 * @id :对应资源 id
 * @content :要发送的内容
 * @commentId :回复的评论id (回复评论时必填)
 * 注意：如给动态发送评论，则不需要传 id，需要传动态的 @threadId
 */
export function sendOrdelComment (data) {
  return request({
    url: '/comment',
    method: 'get',
    params: data
  })
}

/**
 * 说明 : 调用此接口 , 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对 应评论点赞 ( 需要登录 )
 * 必选参数 :
 * @id : 资源 id, 如歌曲 id,mv id
 * @cid : 评论 id
 * @t : 是否点赞 ,1 为点赞 ,0 为取消点赞
 * @tpye : 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型： 0: 歌曲 1: mv 2: 歌单3: 专辑4: 电台5: 视频6: 动态
 */
export function addOrDelLike (data) {
  return request({
    url: '/comment/like',
    method: 'get',
    params: data
  })
}
