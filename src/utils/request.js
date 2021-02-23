import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

request.interceptors.request.use(function (config) {
  /* 请求拦截器 */
  // 请求成功
  const { user } = store.state
  if (user && user.token) {
    // 添加token到请求头中
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 请求失败
  return Promise.reject(error)
})

export default request
