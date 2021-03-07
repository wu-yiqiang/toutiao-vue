import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    /* 处理后端返回的数据 */
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
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
