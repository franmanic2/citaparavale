
<template>
  <div class="list-container fade-in">
    <h2 class="section-title">Pretendientes Registrados</h2>
    
    <div v-if="suitors.length === 0" class="empty-state">
      <p>No hay pretendientes encontrados.</p>
    </div>

    <div class="grid">
      <div v-for="suitor in suitors" :key="suitor.id" class="card">
        
        <div class="card-image-container">
          <img v-if="suitor.photo" :src="suitor.photo" alt="Profile" class="card-image" />
          <div v-else class="card-image-placeholder">{{ suitor.name.charAt(0) }}</div>
          
          <div class="card-gradient-overlay">
            <h3 class="card-name">{{ suitor.name }}</h3>
            <span class="card-role">{{ suitor.occupation }}</span>
          </div>
        </div>

        <div class="card-body">
          <div class="info-row">
            <span class="label">Edad:</span>
            <span class="value">{{ suitor.age }} años</span>
          </div>
          
          <div class="info-row">
             <span class="label">Hobbies:</span>
             <span class="value">{{ suitor.hobbies }}</span>
          </div>

          <div v-if="suitor.instagram" class="instagram-section">
            <a :href="`https://instagram.com/${suitor.instagram && suitor.instagram.replace('@', '')}`" target="_blank" class="instagram-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.047-1.096-.047-3.232 0-2.136.009-2.388.047-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
              </svg>
              {{ suitor.instagram }}
            </a>
          </div>

          <div v-if="suitor.likes" class="likes-section">
             <span class="heart-icon">❤️</span> {{ suitor.likes }}
          </div>
          
          <div v-if="suitor.expectations" class="expectations">
            <strong>Espera:</strong>
            <p>"{{ suitor.expectations }}"</p>
          </div>
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

const loadSuitors = async () => {
  const query = route.query.q;
  if (query) {
    suitors.value = await service.searchSuitors(query);
  } else {
    suitors.value = await service.getAllSuitors();
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
  gap: 2rem;
  /* Mobile First: Vertical stack (1 column) */
  grid-template-columns: 1fr;
}

/* Tablet: 2 columns */
@media (min-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns (Horizontal line) */
@media (min-width: 992px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* New Card Design */
.card {
  background: var(--color-surface);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 71, 87, 0.2);
}

.card-image-container {
  width: 100%;
  height: 350px; /* Large vertical photo area */
  position: relative;
  background-color: #333;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: rgba(255,255,255,0.2);
  background: #2a2a2a;
}

/* Gradient Overlay - Pink from the web */
.card-gradient-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%; /* Fade starts halfway up */
  background: linear-gradient(to top, var(--color-accent) 0%, rgba(255, 71, 87, 0.6) 40%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
}

.card-name {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  line-height: 1.2;
}

.card-role {
  font-size: 1rem;
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  margin-top: 5px;
}

.card-body {
  padding: 1.5rem;
  background: var(--color-surface);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 0.5rem;
}

.label {
  color: var(--color-subtext);
  font-weight: 500;
}

.value {
  font-weight: 400;
  text-align: right;
  max-width: 60%;
}

.instagram-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.instagram-link {
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: color 0.2s;
}

.instagram-link:hover {
  color: var(--color-accent);
}

.likes-section {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-subtext);
  display: flex;
  gap: 0.5rem;
}

.expectations {
  margin-top: 0.5rem;
  padding: 1rem;
  background: rgba(255,255,255,0.03);
  border-radius: 12px;
  font-size: 0.9rem;
}

.expectations strong {
  display: block;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.expectations p {
  margin: 0;
  color: var(--color-text);
  line-height: 1.5;
}

.empty-state {
  text-align: center;
  color: #888;
  margin-top: 3rem;
}
</style>
