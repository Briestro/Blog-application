<template>
  <div class="page">
    <div v-if="loading" class="spinner"></div>
    <div v-else-if="error" class="alert alert-error">{{ error }}</div>

    <template v-else-if="post">
      <RouterLink to="/" class="back-link">← All Posts</RouterLink>

      <article class="post-full card">
        <div class="post-header">
          <h1 class="post-title">{{ post.title }}</h1>
          <div class="post-meta">
            <span class="author-avatar">{{ post.author?.username?.[0]?.toUpperCase() }}</span>
            <div>
              <span class="author-name">{{ post.author?.username }}</span>
              <span class="post-date">{{ formatDate(post.createdAt) }}</span>
            </div>
          </div>
        </div>

        <div class="post-body">{{ post.content }}</div>

        <div v-if="canModify || auth.isAdmin" class="post-actions">
          <RouterLink
            v-if="canModify"
            :to="`/posts/${post._id}/edit`"
            class="btn btn-outline"
          >Edit</RouterLink>
          <button
            v-if="canModify || auth.isAdmin"
            class="btn btn-danger"
            @click="deletePost"
            :disabled="deleting"
          >
            {{ deleting ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
      </article>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../axios'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const post = ref(null)
const loading = ref(true)
const error = ref(null)
const deleting = ref(false)

const canModify = computed(() => {
  if (!auth.isLoggedIn || !post.value?.author) return false
  return post.value.author._id.toString() === auth.user.id.toString()
})

onMounted(async () => {
  try {
    const { data } = await api.get(`/api/posts/${route.params.id}`)
    post.value = data.post
  } catch (err) {
    error.value = err.response?.data?.message || 'Post not found'
  } finally {
    loading.value = false
  }
})

async function deletePost() {
  if (!confirm('Are you sure you want to delete this post?')) return
  deleting.value = true
  try {
    await api.delete(`/api/posts/${route.params.id}`)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete post'
    deleting.value = false
  }
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--sky-500);
  transition: color 0.2s;
}
.back-link:hover { color: var(--sky-700); }
.post-full { padding: 40px; }
.post-header { margin-bottom: 28px; border-bottom: 1.5px solid var(--sky-100); padding-bottom: 24px; }
.post-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--gray-900);
  line-height: 1.25;
  margin-bottom: 18px;
}
.post-meta { display: flex; align-items: center; gap: 12px; }
.author-avatar {
  width: 36px; height: 36px;
  background: var(--sky-500);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  flex-shrink: 0;
}
.author-name { display: block; font-size: 0.9rem; font-weight: 600; color: var(--gray-700); }
.post-date { display: block; font-size: 0.8rem; color: var(--gray-400); }
.post-body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--gray-700);
  white-space: pre-wrap;
}
.post-actions {
  display: flex;
  gap: 10px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1.5px solid var(--sky-100);
}
</style>
