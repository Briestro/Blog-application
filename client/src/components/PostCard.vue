<template>
  <article class="post-card" @click="$router.push(`/posts/${post._id}`)">
    <div class="post-meta">
      <span class="author-avatar">{{ post.author?.username?.[0]?.toUpperCase() }}</span>
      <span class="author-name">{{ post.author?.username }}</span>
      <span class="dot">·</span>
      <span class="post-date">{{ formatDate(post.createdAt) }}</span>
    </div>
    <h2 class="post-title">{{ post.title }}</h2>
    <p class="post-excerpt">{{ excerpt }}</p>
    <span class="read-more">Read more →</span>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ post: Object })

const excerpt = computed(() => {
  const text = props.post.content || ''
  return text.length > 160 ? text.slice(0, 160) + '…' : text
})

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.post-card {
  background: var(--white);
  border: 1.5px solid var(--sky-100);
  border-radius: var(--radius);
  padding: 26px 28px;
  cursor: pointer;
  transition: all 0.2s;
}
.post-card:hover {
  border-color: var(--sky-300);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.author-avatar {
  width: 28px; height: 28px;
  background: var(--sky-500);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}
.author-name { font-size: 0.85rem; font-weight: 600; color: var(--gray-700); }
.dot { color: var(--gray-400); }
.post-date { font-size: 0.82rem; color: var(--gray-400); }
.post-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--gray-900);
  margin-bottom: 10px;
  line-height: 1.3;
}
.post-excerpt { font-size: 0.92rem; color: var(--gray-500); line-height: 1.65; margin-bottom: 14px; }
.read-more { font-size: 0.82rem; font-weight: 600; color: var(--sky-500); }
</style>
