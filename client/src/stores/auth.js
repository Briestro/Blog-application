import { defineStore } from 'pinia'
import api from '../axios'

const API = '/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('zblog_user')) || null,
    token: localStorage.getItem('zblog_token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    setAuth(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('zblog_token', token)
      localStorage.setItem('zblog_user', JSON.stringify(user))
    },

    clearAuth() {
      this.token = null
      this.user = null
      localStorage.removeItem('zblog_token')
      localStorage.removeItem('zblog_user')
    },

    async register(username, email, password) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post(`${API}/register`, { username, email, password })
        this.setAuth(data.token, data.user)
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post(`${API}/login`, { email, password })
        this.setAuth(data.token, data.user)
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.clearAuth()
    },
  },
})
