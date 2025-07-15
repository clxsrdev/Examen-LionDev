import api from './api';

// Obtener todas las reservas
export function getAllReservas() {
  return api.get('/reservas');
}

// Crear una nueva reserva
export function createReserva(data) {
  return api.post('/reservas', data);
}

// Liberar una reserva por ID
export function liberarReserva(id) {
  return api.post(`/reservas/${id}/liberar`);
}

// Eliminar una reserva por ID
export function deleteReserva(id) {
  return api.delete(`/reservas/${id}`);
}
