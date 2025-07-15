<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { createSala } from '@/service/salaService';

const nombre = ref('');
const ubicacion = ref('');
const capacidad = ref(null);

const toast = useToast();

async function submitForm() {

    const payload = {
        nombre: nombre.value,
        ubicacion: ubicacion.value,
        capacidad: capacidad.value
    };
  // Validación
  if (!nombre.value || !ubicacion.value || !capacidad.value || capacidad.value <= 0) {
    toast.add({
      severity: 'warn',
      summary: 'Datos incompletos',
      detail: 'Por favor completa todos los campos correctamente.',
      life: 3000
    });
    return;
  }

  try {
    await createSala(payload);

    toast.add({ 
      severity: 'success', 
      summary: 'Registro exitoso', 
      detail: 'La sala fue registrada correctamente.', 
      life: 3000 
    });

    // Limpiar formulario
    nombre.value = '';
    ubicacion.value = '';
    capacidad.value = null;

  } catch (error) {

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ocurrió un problema al registrar la sala.',
      life: 3000
    });
  }
}

</script>

<template>
  <div class="p-4 flex flex-col items-center">
    <h2 class="text-3xl font-semibold mb-6">Registrar Nueva Sala</h2>
    
    <Card class="w-full max-w-lg shadow-2">
      <template #content>
        <form @submit.prevent="submitForm" class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-medium text-color">Nombre de la Sala</label>
            <InputText v-model="nombre" placeholder="Ejemplo: Sala A" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-medium text-color">Ubicación</label>
            <InputText v-model="ubicacion" placeholder="Ejemplo: Piso 1" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-medium text-color">Capacidad (personas)</label>
            <InputNumber v-model="capacidad" placeholder="Ejemplo: 10" />
          </div>

          <Divider />

          <div class="flex justify-end">
            <Button type="submit" label="Registrar" icon="pi pi-check" class="p-button-primary" />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>
