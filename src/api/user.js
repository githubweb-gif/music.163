import request from '@/untils/request'

/**
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 *必选参数 :
 *@uid : 用户 id
 */
export function uerDetail (data) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: data
  })
}
