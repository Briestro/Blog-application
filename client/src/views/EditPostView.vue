<template>
  <div class="page">
    <div v-if="loadingPost" class="spinner"></div>

    <div v-else-if="fetchError" class="alert alert-error">{{ fetchError }}</div>

    <div v-else class="form-page card">
      <h1 class="form-title">Edit Post</h1>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Title</label>
          <input v-model="title" type="text" required />
        </div>
        <div class="form-group">
          <label>Content</label>
          <textarea v-model="content" required style="min-height:240px"></textarea>
        </div>
        <div class="form-footer">
          <RouterLink :to="`/posts/${route.params.id}`" class="btn btn-ghost">Cancel</RouterLink>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving…' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../axios'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const title = ref('')
const content = ref('')
const loading = ref(false)
const loadingPost = ref(true)
const error = ref(null)
const fetchError = ref(null)

onMounted(async () => {
  try {
    const { data } = await api.get(`/api/posts/${route.params.id}`)
    const post = data.post

    // Verify ownership
    if (post.author._id.toString() !== auth.user?.id.toString()) {
      router.push('/')
      return
    }

    title.value = post.title
    content.value = post.content
  } catch (err) {
    fetchError.value = err.response?.data?.message || 'Post not found'
  } finally {
    loadingPost.value = false
  }
})

async function handleSubmit() {
  loading.value = true
  error.value = null
  try {
    await api.put(`/api/posts/${route.params.id}`, { title: title.value, content: content.value })
    router.push(`/posts/${route.params.id}`)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update post'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-page { max-width: 680px; margin: 0 auto; padding: 36px; }
.form-title { font-family: var(--font-display); font-size: 1.9rem; color: var(--sky-700); margin-bottom: 26px; }
.form-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }
</style>
