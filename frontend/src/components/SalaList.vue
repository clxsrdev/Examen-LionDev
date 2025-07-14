<template>
  <div>
    <h2>Salas de Juntas</h2>
    <ul>
      <li v-for="sala in salas" :key="sala.id">
        {{ sala.nombre }} - {{ sala.ubicacion }} (Capacidad: {{ sala.capacidad }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const salas = ref([]);

const fetchSalas = async () => {
  try {
    const response = await api.get('/salas');
    salas.value = response.data;
  } catch (error) {
    console.error('Error al obtener salas:', error);
  }
};

onMounted(() => {
  fetchSalas();
});
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
  padding: 8px;
  background-color: #f4f4f4;
  border-radius: 4px;
}
</style>
