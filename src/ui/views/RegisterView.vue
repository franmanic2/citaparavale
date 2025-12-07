<template>
  <div class="register-container fade-in">
    <h2 class="section-title">Registro de Pretendiente</h2>
    <form @submit.prevent="handleSubmit" class="register-form">
      
      <div class="form-group">
        <label class="form-label">Nombre Completo</label>
        <input v-model="form.name" required class="form-input" placeholder="Ej. Juan Pérez">
      </div>

      <div class="form-row">
        <div class="form-group half">
          <label class="form-label">Edad</label>
          <input v-model="form.age" type="number" required class="form-input">
        </div>
        <div class="form-group half">
          <label class="form-label">Ocupación</label>
          <input v-model="form.occupation" required class="form-input" placeholder="Ej. Arquitecto">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Hobbies (separados por coma)</label>
        <input v-model="form.hobbies" class="form-input" placeholder="Ej. Cocinar, Leer, Viajar">
      </div>

      <div class="form-group">
        <label class="form-label">Gustos / Intereses</label>
        <textarea v-model="form.likes" class="form-input" rows="3" placeholder="Qué te apasiona..."></textarea>
      </div>

      <button type="submit" class="btn-primary full-width">Registrarme</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { SuitorService } from '../../application/SuitorService';

const router = useRouter();
const service = new SuitorService();

const form = reactive({
  name: '',
  age: '',
  occupation: '',
  hobbies: '',
  likes: ''
});

const handleSubmit = async () => {
  // Convert hobbies string to array if needed, keeping simple for now
  await service.registerSuitor({ ...form });
  alert('¡Registro exitoso! Buena suerte.');
  router.push('/lista');
};
</script>

<style scoped>
.register-container {
  max-width: 600px;
  margin: 2rem auto;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.half {
  flex: 1;
}

.full-width {
  width: 100%;
  margin-top: 1rem;
}
</style>
