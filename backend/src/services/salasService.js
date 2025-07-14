const { Sala } = require('../models');

async function getAllSalas() {
  return await Sala.findAll();
}

async function createSala(data) {
  return await Sala.create(data);
}

async function updateSala(id, data) {
  const sala = await Sala.findByPk(id);
  if (!sala) throw new Error('Sala not found');
  return await sala.update(data);
}

async function deleteSala(id) {
  const sala = await Sala.findByPk(id);
  if (!sala) throw new Error('Sala not found');
  await sala.destroy();
  return true;
}

module.exports = {
  getAllSalas,
  createSala,
  updateSala,
  deleteSala
};
