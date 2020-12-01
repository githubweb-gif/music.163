import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true
})

const date = new Date()

service.interceptors.request.use(config => {
  if (config.method.toLocaleLowerCase() === 'post') {
    config.data.timestamp = date.getTime()
  }
  return config
},
error => {
  // do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
}
)

service.interceptors.response.use(response => {
  console.log(response)
  return response.data
},
error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
}
)

export default service
