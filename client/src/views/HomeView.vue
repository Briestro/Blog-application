<template>
  <div class="page">
    <div class="home-header">
      <h1 class="home-title"><span class="z">z</span>Blog</h1>
      <p class="home-sub">Thoughts, stories, and ideas — shared openly.</p>
    </div>

    <div v-if="loading" class="spinner"></div>

    <div v-else-if="error" class="alert alert-error">{{ error }}</div>

    <div v-else-if="posts.length === 0" class="empty-state">
      <div class="empty-icon">✍️</div>
      <p>No posts yet. Be the first to share something!</p>
      <RouterLink v-if="auth.isLoggedIn" to="/create" class="btn btn-primary" style="margin-top:14px">
        Create a Post
      </RouterLink>
    </div>

    <div v-else class="posts-grid">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../axios'
import PostCard from '../components/PostCard.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data } = await api.get('/api/posts')
    posts.value = data.posts
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load posts'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home-header {
  text-align: center;
  padding: 48px 0 40px;
}
.home-title {
  font-family: var(--font-display);
  font-size: 3.2rem;
  color: var(--sky-700);
  margin-bottom: 8px;
}
.z { color: var(--sky-400); font-style: italic; }
.home-sub { color: var(--gray-400); font-size: 1.05rem; }
.posts-grid { display: flex; flex-direction: column; gap: 18px; }
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--gray-400);
}
.empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
</style>
