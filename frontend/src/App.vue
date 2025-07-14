<template>
  <div id="app">
    <h1>Gestión de Salas de Juntas</h1>
    <SalaList />
  </div>
</template>

<script setup>
import SalaList from './components/SalaList.vue';
</script>

<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
