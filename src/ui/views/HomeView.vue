<template>
  <div class="home-container fade-in">
    <h1 class="title">BUSCANDO PAREJA<br>PARA VALENTINA</h1>
    <div class="search-wrapper">
      <input 
        v-model="searchQuery" 
        type="text" 
        class="search-input" 
        placeholder="Buscar pretendiente por nombre..."
        @keyup.enter="handleSearch"
      >
      <button @click="handleSearch" class="btn-primary search-btn">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/lista', query: { q: searchQuery.value } });
  } else {
    router.push('/lista');
  }
};
</script>

<style scoped>
.home-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 3rem;
  margin-bottom: 3rem;
  font-weight: 800;
  line-height: 1.1;
  background: linear-gradient(45deg, #1a1a1a, #555);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 1.5rem;
  font-size: 1.2rem;
  border-radius: 50px;
  border: 1px solid #ddd;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  border-color: var(--color-accent);
}

.search-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
</style>
