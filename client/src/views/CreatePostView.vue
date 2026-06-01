<template>
  <div class="page">
    <div class="form-page card">
      <h1 class="form-title">New Post</h1>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Title</label>
          <input v-model="title" type="text" placeholder="Give your post a title…" required />
        </div>
        <div class="form-group">
          <label>Content</label>
          <textarea v-model="content" placeholder="Write your post…" required style="min-height:240px"></textarea>
        </div>
        <div class="form-footer">
          <RouterLink to="/" class="btn btn-ghost">Cancel</RouterLink>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Publishing…' : 'Publish Post' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../axios'

const router = useRouter()
const title = ref('')
const content = ref('')
const loading = ref(false)
const error = ref(null)

async function handleSubmit() {
  loading.value = true
  error.value = null
  try {
    const { data } = await api.post('/api/posts', { title: title.value, content: content.value })
    router.push(`/posts/${data.post._id}`)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to create post'
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
