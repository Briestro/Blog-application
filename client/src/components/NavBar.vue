<template>
  <nav class="navbar">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-brand">
        <span class="brand-z">z</span>Blog
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Posts</RouterLink>

        <template v-if="auth.isLoggedIn">
          <RouterLink to="/create" class="btn btn-primary btn-sm">+ New Post</RouterLink>
          <div class="nav-user">
            <span class="user-name">{{ auth.user.username }}</span>
            <span :class="['badge', auth.isAdmin ? 'badge-admin' : 'badge-user']">
              {{ auth.isAdmin ? 'Admin' : 'User' }}
            </span>
            <button class="btn btn-ghost btn-sm" @click="logout">Logout</button>
          </div>
        </template>

        <template v-else>
          <RouterLink to="/login" class="btn btn-outline btn-sm">Log In</RouterLink>
          <RouterLink to="/register" class="btn btn-primary btn-sm">Register</RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background: white;
  border-bottom: 1.5px solid var(--sky-100);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(14, 165, 233, 0.08);
}
.nav-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-brand {
  font-family: var(--font-display);
  font-size: 1.7rem;
  color: var(--sky-700);
  letter-spacing: -0.5px;
}
.brand-z {
  color: var(--sky-500);
  font-style: italic;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 14px;
}
.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--gray-500);
  transition: color 0.2s;
}
.nav-link:hover, .router-link-active.nav-link { color: var(--sky-600); }
.nav-user {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-700);
}
.btn-sm { padding: 7px 14px; font-size: 0.82rem; }
</style>
