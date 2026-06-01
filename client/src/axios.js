import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zblog_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('zblog_token')
      localStorage.removeItem('zblog_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
