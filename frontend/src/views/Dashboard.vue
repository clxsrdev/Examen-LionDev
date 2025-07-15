<script setup>
import { ref, onMounted, computed } from 'vue';
import { getDashboardStats } from '@/service/dashboardService';
import { getAllSalas } from '@/service/salaService';
import { getAllReservas } from '@/service/reservaService';
import SalaTable from '@/components/dashboard/SalaTable.vue';
import DonutChart from '@/components/dashboard/DonutChart.vue';

// Data reactiva
const totales = ref(0);
const disponibles = ref(0);
const ocupadas = ref(0);
const loading = ref(true);

const salas = ref([]);
const ocupacionData = ref([]);
const reservas = ref([]);

const salasConEstado = computed(() => {
  const now = new Date();

  return salas.value.map(sala => {
    const ocupada = reservas.value.some(reserva => {
      if (reserva.sala_id !== sala.id) return false;
      if (reserva.estado !== 'activa') return false;

      const inicio = new Date(reserva.horario_inicio);
      const fin = new Date(reserva.horario_fin);

      return inicio <= now && fin >= now;
    });

    return { ...sala, ocupada };
  });
});

// Load dashboard data
onMounted(async () => {
  try {
    // Estadísticas para el donut
    const statsRes = await getDashboardStats();
    totales.value = statsRes.data.totales;
    disponibles.value = statsRes.data.disponibles;
    ocupadas.value = statsRes.data.ocupadas;

    ocupacionData.value = [
      { name: 'Disponibles', value: disponibles.value },
      { name: 'Ocupadas', value: ocupadas.value }
    ];

    // Salas para la tabla
    const salasRes = await getAllSalas();
    salas.value = salasRes.data;

    // **✅ Agrega esto para cargar reservas**
    const reservasRes = await getAllReservas();
    reservas.value = reservasRes.data;

  } catch (error) {
    console.error('Error al cargar dashboard:', error);
  } finally {
    loading.value = false;
  }
});

</script>


<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 md:col-span-6 xl:col-span-4">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Salas Totales</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totales }}</div>
          </div>
          <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-building text-green-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-muted-color">Cantidad total de salas registradas</span>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 xl:col-span-4">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Salas Disponibles</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ disponibles }}</div>
          </div>
          <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-check-circle text-cyan-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-muted-color">Actualmente libres para reservar</span>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 xl:col-span-4">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Salas Ocupadas</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ ocupadas }}</div>
          </div>
          <div class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-times-circle text-red-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-muted-color">Actualmente reservadas</span>
      </div>
    </div>
  </div>

    <div class="grid grid-cols-12 gap-8 mt-8">
      <div class="col-span-12 xl:col-span-6">
        <Card>
          <template #title>Estado de Ocupación</template>
          <template #content>
            <DonutChart :data="ocupacionData" v-if="!loading" />
            <p v-else>Cargando gráfico...</p>
          </template>
        </Card>
      </div>
      
      <div class="col-span-12 xl:col-span-6">
        <Card>
          <template #title>Detalle de Salas</template>
          <template #content>
            <div v-if="!loading" class="space-y-2">
              <div v-for="sala in salasConEstado" :key="sala.id" class="flex justify-between items-center">
                <span>{{ sala.nombre }}</span>
                <Tag 
                  :value="sala.ocupada ? 'Ocupada' : 'Libre'"
                  :severity="sala.ocupada ? 'danger' : 'success'"
                />
              </div>
            </div>
            <p v-else>Cargando tabla...</p>
          </template>
        </Card>
      </div>
    </div>
</template>
