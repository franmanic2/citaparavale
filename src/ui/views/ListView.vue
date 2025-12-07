<template>
  <div class="list-container fade-in">
    <h2 class="section-title">Pretendientes Registrados</h2>
    
    <div v-if="suitors.length === 0" class="empty-state">
      <p>No hay pretendientes encontrados.</p>
    </div>

    <div class="grid">
      <div v-for="suitor in suitors" :key="suitor.id" class="card">
        <div class="card-header">
          <div class="avatar">{{ suitor.name.charAt(0) }}</div>
          <div>
            <h3 class="card-name">{{ suitor.name }}</h3>
            <span class="card-role">{{ suitor.occupation }}</span>
          </div>
        </div>
        <div class="card-body">
          <p><strong>Edad:</strong> {{ suitor.age }}</p>
          <p><strong>Hobbies:</strong> {{ suitor.hobbies }}</p>
          <p class="likes">"{{ suitor.likes }}"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { SuitorService } from '../../application/SuitorService';

const route = useRoute();
const service = new SuitorService();
const suitors = ref([]);

const loadSuitors = () => {
  const query = route.query.q;
  if (query) {
    suitors.value = service.searchSuitors(query);
  } else {
    suitors.value = service.getAllSuitors();
  }
};

onMounted(loadSuitors);
watch(() => route.query.q, loadSuitors);
</script>

<style scoped>
.list-container {
  padding: 2rem 0;
}

.section-title {
  font-size: 2rem; 
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  transition: transform 0.3s;
  border: 1px solid transparent;
}

.card:hover {
  transform: translateY(-5px);
  border-color: var(--color-accent);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.avatar {
  background: var(--color-accent);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.card-name {
  margin: 0;
  font-size: 1.2rem;
}

.card-role {
  font-size: 0.9rem;
  color: var(--color-subtext);
}

.card-body p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

.likes {
  margin-top: 1rem;
  font-style: italic;
  color: #666;
}

.empty-state {
  text-align: center;
  color: #888;
  margin-top: 3rem;
}
</style>
