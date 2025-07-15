import api from './api';

export function getAllSalas() {
  return api.get('/salas');
}

export function createSala(data) {
  return api.post('/salas', data);
}

export function deleteSala(id) {
  return api.delete(`/salas/${id}`);
}

export function updateSala(id, data) {
  return api.put(`/salas/${id}`, data);
}
