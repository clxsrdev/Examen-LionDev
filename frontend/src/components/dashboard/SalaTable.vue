<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps(['salas']);
</script>


<template>
  <DataTable :value="props.salas" stripedRows>
    <Column field="nombre" header="Nombre" />
    <Column field="ubicacion" header="Ubicación" />
    <Column field="capacidad" header="Capacidad" />
  </DataTable>
</template>
