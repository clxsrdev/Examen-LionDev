<script setup>
</script>

<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 md:col-span-6 xl:col-span-4">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Salas Totales</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalSalas }}</div>
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
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ salasDisponibles }}</div>
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
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ salasOcupadas }}</div>
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
    <Card title="Estado de ocupación">
      <DonutChart :data="ocupacionData" />
    </Card>
  </div>
  
  <div class="col-span-12 xl:col-span-6">
    <Card title="Detalle de Salas">
      <SalaTable :salas="salas" />
    </Card>
  </div>
</div>

</template>
