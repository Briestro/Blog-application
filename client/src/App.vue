<template>
  <div id="app-root">
    <NavBar />
    <main>
      <RouterView />
    </main>
    <footer class="footer">
      <p>zBlog | All rights reserved 2026</p>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
#app-root { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }
.footer {
  text-align: center;
  padding: 20px;
  font-size: 0.85rem;
  color: var(--gray-400);
  border-top: 1.5px solid var(--sky-100);
  background: var(--white);
}
</style>
