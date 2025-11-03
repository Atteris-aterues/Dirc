import axios from 'axios'

// 创建统一的axios实例（用于所有请求）
const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器 - 添加认证token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一处理错误
api.interceptors.response.use(
  (response) => {
    // 检查响应头中是否有token
    const token = response.headers['authorization'] || response.headers['x-auth-token'] || response.headers['access-token'];
    if (token) {
      // 如果有token，保存到localStorage中
      localStorage.setItem('token', token.replace('Bearer ', ''));
    }
    
    // 返回完整的响应对象，而不仅仅是response.data
    // 这样Vuex action可以访问响应头
    return response;
  },
  (error) => {
    const ctx = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      responseData: error.response?.data,
      message: error.message
    }
    console.error('API错误详细:', ctx)
    
    // 处理认证错误
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // 不要直接跳转，让应用自己处理
      // window.location.href = '/login'
    }
    
    // 处理网络错误
    if (!error.response) {
      error.message = '网络连接失败，请检查网络设置'
    }
    
    return Promise.reject(error)
  }
)

export default api

// 导出所有API模块，都使用同一个api实例
export { authAPI } from './auth'
export { courseAPI } from './course'
export { resourceAPI } from './resource'
export { adminAPI } from './admin'
export { profileAPI } from './profile'
export { uploadAPI } from './upload'
export { notificationAPI } from './notification'
export { searchAPI } from './search'
export { statsAPI } from './stats'
