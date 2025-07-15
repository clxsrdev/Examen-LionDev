<script setup>
import { ref, onMounted } from 'vue';

// PrimeVue Components
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Tag from 'primevue/tag';

import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

// Services
import { getAllSalas, deleteSala, updateSala } from '@/service/salaService';
import { createReserva, getAllReservas, deleteReserva, liberarReserva } from '@/service/reservaService';

// Estado
const salas = ref([]);
const showDialog = ref(false);
const selectedSala = ref(null);
const loading = ref(false);
const reservas = ref([]);
const expandedRows = ref([]);

// Toast y confirmación
const toast = useToast();
const confirm = useConfirm();

// Formulario edición
const editNombre = ref('');
const editUbicacion = ref('');
const editCapacidad = ref(null);

// Formulario reserva
const reservaInicio = ref('');
const reservaFin = ref('');

// Cargar salas al iniciar
onMounted(() => {
  cargarSalas();
});

// Funciones
async function eliminarReservaPorId(id) {
  try {
    loading.value = true;
    await deleteReserva(id);
    toast.add({
      severity: 'success',
      summary: 'Eliminada',
      detail: 'La reserva fue eliminada correctamente.',
      life: 3000
    });
    await cargarSalas();
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar la reserva.',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
}

function reservasPorSala(salaId) {
  return reservas.value.filter(r => r.sala_id === salaId);
}

function capitalizarEstado(estado) {
  if (!estado) return '';
  return estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();
}

async function cargarSalas() {
  loading.value = true;
  try {
    const resSalas = await getAllSalas();
    const resReservas = await getAllReservas();

    salas.value = resSalas.data;
    reservas.value = resReservas.data;

    marcarEstadoDeSalas();
  } catch (error) {
    console.error(error);
    salas.value = [];
  } finally {
    loading.value = false;
  }
}

function abrirDialogoEdicion(sala) {
  selectedSala.value = sala;
  editNombre.value = sala.nombre;
  editUbicacion.value = sala.ubicacion;
  editCapacidad.value = sala.capacidad;
  reservaInicio.value = null;
  reservaFin.value = null;
  showDialog.value = true;
}

async function guardarEdicion() {
  if (!editNombre.value || !editUbicacion.value || !editCapacidad.value || editCapacidad.value <= 0) {
    toast.add({
      severity: 'warn',
      summary: 'Datos incompletos',
      detail: 'Completa todos los campos correctamente.',
      life: 3000
    });
    return;
  }

  try {
    await updateSala(selectedSala.value.id, {
      nombre: editNombre.value,
      ubicacion: editUbicacion.value,
      capacidad: editCapacidad.value
    });
    toast.add({
      severity: 'success',
      summary: 'Sala actualizada',
      detail: 'Los datos fueron actualizados correctamente.',
      life: 3000
    });
    showDialog.value = false;
    await cargarSalas();
  } catch (error) {
    console.error('Error al actualizar sala:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo actualizar la sala.',
      life: 3000
    });
  }
}

async function liberarReservaPorSalaId(salaId) {
  try {
    loading.value = true;

    // Busca la reserva activa de esta sala
    const reservaActiva = reservas.value.find(
      r => r.sala_id === salaId && r.estado === 'activa'
    );

    if (!reservaActiva) {
      toast.add({
        severity: 'info',
        summary: 'Sin reserva activa',
        detail: 'No hay reserva activa para esta sala.',
        life: 3000
      });
      return;
    }

    // Llama a tu servicio para liberar
    await liberarReserva(reservaActiva.id);

    toast.add({
      severity: 'success',
      summary: 'Sala liberada',
      detail: 'La reserva fue liberada correctamente.',
      life: 3000
    });

    await cargarSalas();
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo liberar la sala.',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
}

async function guardarReserva() {
  if (!reservaInicio.value || !reservaFin.value) {
    toast.add({
      severity: 'warn',
      summary: 'Datos incompletos',
      detail: 'Completa ambos horarios.',
      life: 3000
    });
    return;
  }

  if (reservaInicio.value >= reservaFin.value) {
    toast.add({
      severity: 'warn',
      summary: 'Horarios inválidos',
      detail: 'El horario de inicio debe ser anterior al horario de fin.',
      life: 3000
    });
    return;
  }

  try {
    await createReserva({
      sala_id: selectedSala.value.id,
      horario_inicio: reservaInicio.value.toISOString(),
      horario_fin: reservaFin.value.toISOString()
    });

    toast.add({
      severity: 'success',
      summary: 'Reserva creada',
      detail: 'La reserva se generó correctamente.',
      life: 3000
    });

    showDialog.value = false;
    reservaInicio.value = null;
    reservaFin.value = null;

    await cargarSalas();
  } catch (error) {
    console.error('Error al crear reserva:', error);
    const detalle = error?.response?.data?.message || 'No se pudo crear la reserva.';
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: detalle,
      life: 3000
    });
  }
}

function eliminarSalaConfirmacion(id, nombre) {
  confirm.require({
    message: `¿Estás seguro de que deseas eliminar la sala "${nombre}"?`,
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, eliminar',
    rejectLabel: 'Cancelar',
    accept: async () => {
      try {
        await deleteSala(id);
        toast.add({
          severity: 'success',
          summary: 'Eliminada',
          detail: `La sala "${nombre}" fue eliminada correctamente.`,
          life: 3000
        });
        await cargarSalas();
      } catch (error) {
        console.error('Error al eliminar sala:', error);
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la sala.',
          life: 3000
        });
      }
    },
    reject: () => {
      toast.add({
        severity: 'info',
        summary: 'Cancelado',
        detail: 'Eliminación cancelada.',
        life: 3000
      });
    }
  });
}

function marcarEstadoDeSalas() {
  const now = new Date();

  salas.value = salas.value.map(sala => {
    const ocupada = reservas.value.some(reserva => {
      if (reserva.sala_id !== sala.id) return false;
      if (reserva.estado !== 'activa') return false;

      const inicio = new Date(reserva.horario_inicio);
      const fin = new Date(reserva.horario_fin);

      return inicio <= now && fin >= now;
    });

    return {
      ...sala,
      ocupada
    };
  });
}


function formatearFecha(fecha) {
  const date = new Date(fecha);
  return date.toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Función para obtener severidad del estado
function getSeverityEstado(estado) {
  switch (estado?.toLowerCase()) {
    case 'activa':
    case 'confirmada':
      return 'success';
    case 'pendiente':
      return 'warning';
    case 'cancelada':
      return 'danger';
    default:
      return 'info';
  }
}
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Lista de Salas</h2>
      <Button
        icon="pi pi-refresh"
        label="Refrescar"
        severity="secondary"
        @click="cargarSalas"
        rounded
      />
    </div>

    <!-- Mensaje de debug -->
    <div v-if="loading" class="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
      Cargando salas...
    </div>

    <div v-else-if="salas.length === 0" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
      No hay salas disponibles. Total de salas: {{ salas.length }}
    </div>

    <Card>
      <template #content>
        <DataTable
          :value="salas"
          :loading="loading"
          stripedRows
          responsiveLayout="scroll"
          :paginator="true"
          :rows="10"
          v-model:expandedRows="expandedRows"
          dataKey="id"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} salas"
          :rowsPerPageOptions="[5, 10, 20]"
          emptyMessage="No se encontraron salas"
        >
          <!-- Columna de expansión -->
          <Column expander style="width: 50px" />

          <!-- Columnas existentes -->
          <Column field="nombre" header="Nombre" :sortable="true" />
          <Column field="ubicacion" header="Ubicación" :sortable="true" />
          <Column field="capacidad" header="Capacidad" :sortable="true" style="width: 120px;">
            <template #body="slotProps">
              {{ slotProps.data.capacidad }} personas
            </template>
          </Column>
          
          <Column header="Estado" style="width: 100px;">
            <template #body="slotProps">
              <Tag 
                :value="slotProps.data.ocupada ? 'Ocupada' : 'Libre'" 
                :severity="slotProps.data.ocupada ? 'danger' : 'success'" 
              />
            </template>
          </Column>

          <Column header="Acciones" style="width: 200px;">
            <template #body="slotProps">
              <div class="flex gap-2 justify-center">
                <Button
                  icon="pi pi-pencil"
                  severity="info"
                  size="small"
                  rounded
                  @click="abrirDialogoEdicion(slotProps.data)"
                />
                
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  size="small"
                  rounded
                  @click="eliminarSalaConfirmacion(slotProps.data.id, slotProps.data.nombre)"
                />

                <Button
                  v-if="slotProps.data.ocupada"
                  icon="pi pi-unlock"
                  severity="warning"
                  size="small"
                  rounded
                  @click="liberarReservaPorSalaId(slotProps.data.id)"
                />
              </div>
            </template>
          </Column>


          <!-- Template de expansión usando slot -->
          <template #expansion="slotProps">
            <div class="p-4 bg-gray-50 border-l-4 border-blue-500">
              <h4 class="font-semibold text-lg mb-3 text-gray-800">
                Reservas para {{ slotProps.data.nombre }}
              </h4>
              
              <div v-if="reservasPorSala(slotProps.data.id).length === 0" class="text-gray-500 italic">
                No hay reservas registradas para esta sala.
              </div>
              
              <div v-else class="space-y-3">
                <div 
                  v-for="reserva in reservasPorSala(slotProps.data.id)" 
                  :key="reserva.id"
                  class="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                >
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                    <div class="flex items-center gap-2">
                      <i class="pi pi-calendar text-blue-500"></i>
                      <div>
                        <div class="text-sm font-medium">Inicio</div>
                        <div class="text-sm text-gray-600">{{ formatearFecha(reserva.horario_inicio) }}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-2">
                      <i class="pi pi-calendar-times text-red-500"></i>
                      <div>
                        <div class="text-sm font-medium">Fin</div>
                        <div class="text-sm text-gray-600">{{ formatearFecha(reserva.horario_fin) }}</div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-2">
                      <i class="pi pi-info-circle text-gray-500"></i>
                      <div>
                        <div class="text-sm font-medium">Estado</div>
                        <Tag 
                          :value="capitalizarEstado(reserva.estado) || 'Activa'" 
                          :severity="getSeverityEstado(reserva.estado)"
                          class="text-xs"
                        />
                      </div>
                    </div>
                    
                    <div class="flex justify-end">
                      <Button
                        icon="pi pi-trash"
                        severity="danger"
                        size="small"
                        rounded
                        @click="eliminarReservaPorId(reserva.id)"
                        v-tooltip="'Eliminar reserva'"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataTable>
      </template>
    </Card>

    <!-- Dialog para editar/reservar -->
    <Dialog
      v-model:visible="showDialog"
      :header="selectedSala ? `Gestionar Sala: ${selectedSala.nombre}` : 'Gestionar Sala'"
      modal
      :style="{ width: '90vw', maxWidth: '600px' }"
      :draggable="false"
      :closable="true"
    >
      <TabView>
        <TabPanel header="Reservar Sala">
          <div class="flex flex-col gap-4">
            <div class="field">
              <label class="block text-sm font-medium mb-2">Horario de inicio</label>
              <Calendar
                v-model="reservaInicio"
                showTime
                hourFormat="24"
                placeholder="Selecciona fecha y hora de inicio"
                class="w-full"
                :showIcon="true"
              />
            </div>
            
            <div class="field">
              <label class="block text-sm font-medium mb-2">Horario de fin</label>
              <Calendar
                v-model="reservaFin"
                showTime
                hourFormat="24"
                placeholder="Selecciona fecha y hora de fin"
                class="w-full"
                :showIcon="true"
              />
            </div>
            
            <div class="flex justify-end gap-2 mt-4">
              <Button
                label="Cancelar"
                severity="secondary"
                outlined
                @click="showDialog = false"
              />
              <Button
                label="Crear Reserva"
                icon="pi pi-check"
                @click="guardarReserva"
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Editar Datos">
          <div class="flex flex-col gap-4">
            <div class="field">
              <label class="block text-sm font-medium mb-2">Nombre de la sala</label>
              <InputText
                v-model="editNombre"
                placeholder="Ingresa el nombre de la sala"
                class="w-full"
              />
            </div>
            
            <div class="field">
              <label class="block text-sm font-medium mb-2">Ubicación</label>
              <InputText
                v-model="editUbicacion"
                placeholder="Ingresa la ubicación"
                class="w-full"
              />
            </div>
            
            <div class="field">
              <label class="block text-sm font-medium mb-2">Capacidad</label>
              <InputNumber
                v-model="editCapacidad"
                placeholder="Número de personas"
                class="w-full"
                :min="1"
                :max="1000"
              />
            </div>
            
            <Divider />
            
            <div class="flex justify-end gap-2">
              <Button
                label="Cancelar"
                severity="secondary"
                outlined
                @click="showDialog = false"
              />
              <Button
                label="Guardar Cambios"
                icon="pi pi-save"
                @click="guardarEdicion"
              />
            </div>
          </div>
        </TabPanel>
      </TabView>
    </Dialog>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}

.p-datatable {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.p-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Estilos para el contenido expandido */
.p-datatable .p-datatable-row-expansion {
  background-color: #f8f9fa;
}

/* Animación suave para expansión */
.p-datatable .p-row-toggler {
  transition: transform 0.2s ease;
}

.p-datatable .p-row-toggler:hover {
  transform: scale(1.1);
}
</style>