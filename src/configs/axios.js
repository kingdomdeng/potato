import axios from 'axios'
import {
  // Loading,
  ElMessage,
} from 'element-plus'
// let loadingInstance

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'

// 请求时的拦截
axios.interceptors.request.use(function (config) {
  // loadingInstance = Loading.service({})
  // 发送请求之前做一些处理
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.authorization = token
  }

  return config
}, function (error) {
  // loadingInstance.close()
  ElMessage.error({ message: '请求异常!' })
  // 当请求异常时做一些处理
  return Promise.reject(error)
})

// 响应时拦截
axios.interceptors.response.use(function (response) {
  // loadingInstance.close()
  // 返回响应时做一些处理
  if (response.data.message === 'token已失效') {
    ElMessage.error({ message: 'token已失效!' })
    sessionStorage.removeItem('token')
    window.location = '/login'
  }

  return response.data
}, function (error) {
  // loadingInstance.close()
  ElMessage.error({ message: '服务器异常!' })
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

export default axios
