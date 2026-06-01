<template>
  <div class="page auth-page">
    <div class="auth-card card">
      <div class="auth-header">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-sub">Join <strong>zBlog</strong> and start writing</p>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>
      <div v-if="success" class="alert alert-success">{{ success }}</div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Username</label>
          <input v-model="username" type="text" placeholder="yourname" required minlength="3" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="you@email.com" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="At least 6 characters" required minlength="6" />
        </div>
        <button type="submit" class="btn btn-primary full-width" :disabled="auth.loading">
          {{ auth.loading ? 'Creating account…' : 'Create Account' }}
        </button>
      </form>

      <p class="auth-footer">
        Already have an account? <RouterLink to="/login">Log in</RouterLink>
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
const username = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)
const success = ref(null)

async function handleRegister() {
  error.value = null
  success.value = null
  const result = await auth.register(username.value, email.value, password.value)
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
