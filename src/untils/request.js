import axios from 'axios'
// import { Loading } from 'element-ui';

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true
})

const date = new Date()

// let reqCount = 0

service.interceptors.request.use(config => {
  console.log(config)
  if (config.method.toLocaleLowerCase() === 'post') {
    // POST请求url必须添加时间戳,使每次请求url不一样,不然请求会被缓存timestamp
    config.data.timestamp = date.getTime()
  }
  // const target = config.
  // Loading.service({

  // })
  return config
},
error => {
  // do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
}
)

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data
  } else {
    return new Error()
  }
},
error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
}
)

export default service
