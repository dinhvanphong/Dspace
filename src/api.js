import axios from 'axios'

const api = axios.create({
  baseURL: 'https://lib.hpu.edu.vn/',
  withCredentials: true
})

// Interceptor gắn CSRF token
api.interceptors.request.use(config => {
  const token = document.cookie
    .split('; ')
    .find(c => c.startsWith('XSRF-TOKEN='))
    ?.split('=')[1]

  if (token) {
    config.headers['X-XSRF-TOKEN'] = token
  }

  return config
})

export default api