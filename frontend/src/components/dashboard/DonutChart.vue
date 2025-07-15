<script setup>
import { computed } from 'vue';
import Chart from 'primevue/chart';

const props = defineProps(['data']);

const chartData = computed(() => ({
  labels: props.data.map(d => d.name),
  datasets: [
    {
      data: props.data.map(d => d.value),
      backgroundColor: ['#42A5F5', '#FF6384']
    }
  ]
}));
</script>

<template>
  <Chart type="doughnut" :data="chartData" />
</template>
