<template>
  <div class="page auth-page">
    <div class="auth-card card">
      <div class="auth-header">
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-sub">Sign in to your <strong>zBlog</strong> account</p>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="you@email.com" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-primary full-width" :disabled="auth.loading">
          {{ auth.loading ? 'Signing in…' : 'Sign In' }}
        </button>
      </form>

      <p class="auth-footer">
        Don't have an account? <RouterLink to="/register">Register</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref(null)

async function handleLogin() {
  error.value = null
  const result = await auth.login(email.value, password.value)
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.message
  }
}
</script>

<style scoped>
.auth-page { display: flex; justify-content: center; padding-top: 60px; }
.auth-card { width: 100%; max-width: 420px; padding: 36px 36px 28px; }
.auth-header { margin-bottom: 26px; }
.auth-title { font-family: var(--font-display); font-size: 1.9rem; color: var(--sky-700); }
.auth-sub { color: var(--gray-500); font-size: 0.9rem; margin-top: 4px; }
.full-width { width: 100%; justify-content: center; padding: 13px; font-size: 1rem; }
.auth-footer { text-align: center; margin-top: 20px; font-size: 0.875rem; color: var(--gray-500); }
.auth-footer a { color: var(--sky-500); font-weight: 600; }
</style>
