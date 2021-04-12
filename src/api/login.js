import request from '@/untils/request'

/**
 * 手机登录
 * @phone
 * @password 密码
 * @countrycode 可选参数 国家码，用于国外手机号登录，例如美国传入：1
 * @md5_password 可选参数 md5加密后的密码,传入后 password 将失效
 */
export function phoneLogin(data) {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data
  })
}

/**
 * 邮箱登录
 * @email 163网易邮箱
 * @password 密码
 * @md5_password 可选参数 md5加密后的密码,传入后 password 将失效
 */
export function emailLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 刷新登录,说明 : 调用此接口 , 可刷新登录状态
export function refreshLogin() {
  return request({
    url: '/login/refresh',
    method: 'get'
  })
}

/**
 * 发送验证码
 * @phone
 * @ctcode 可选参数,国家区号,默认86即中国
 */
export function sentCode(data) {
  return request({
    url: '/captcha/sent',
    method: 'get',
    params: data
  })
}

/**
   * 验证验证码
   * @phone
   * @captcha
   */
export function verifyCode(data) {
  return request({
    url: '/captcha/verify',
    method: 'get',
    params: data
  })
}

/**
   * 注册(修改密码)
   * @captcha : 验证码
   * @phone : 手机号码
   * @password : 密码
   * @nickname : 昵称
   */
export function register(data) {
  return request({
    url: '/register/cellphone',
    method: 'post',
    data
  })
}

/**
   * 检测手机号码是否已注册
   * @phone : 手机号码
   * @countrycode 可选参数 国家码，用于国外手机号登录，例如美国传入：1
   */
export function existencePhone(data) {
  return request({
    url: '/cellphone/existence/check',
    method: 'get'
  })
}

/**
   * 初始化昵称
   * 说明 : 刚注册的账号(需登录),调用此接口 ,可初始化昵称
   * @nickname : 昵称
   */
export function profile(data) {
  return request({
    url: '/activate/init/profile',
    method: 'get'
  })
}

/**
   * 更换绑定手机
   * 说明 : 调用此接口 ,可更换绑定手机(流程:先发送验证码到原手机号码,再发送验证码到新手机号码然后再调用此接口)
   * @ldcaptcha : 原手机验证码
   * @aptcha : 新手机验证码
   * @hone : 手机号码
   * @tcode : 国家区号,默认86即中国
   */
export function rebind(data) {
  return request({
    url: '/rebind',
    method: 'get'
  })
}

/**
   * 退出登录
   * 说明 : 调用此接口 , 可退出登录
   */
export function logout(data) {
  return request({
    url: '/logout',
    method: 'get'
  })
}

/**
   *登录状态
   * 说明 : 调用此接口,可获取登录状态
   */
export function logoutStatus(data) {
  return request({
    url: '/login/status',
    method: 'get'
  })
}

/**
   *获取账号信息
   * 说明 : 登录后调用此接口 ,可获取用户账号信息
   */
export function accountNumberInfo(data) {
  return request({
    url: '/user/account',
    method: 'get'
  })
}

/**
   * 歌单
   * 说明 : 登录后调用传入用户 id, 可以获取用户歌单
   * 必选参数: @uid
   * @limit : 返回数量 , 默认为 30
   * @offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
   */
export function songList(data) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: data
  })
}
