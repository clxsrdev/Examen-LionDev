const salasService = require('../services/salasService');

async function getAllSalas(req, res) {
  try {
    const salas = await salasService.getAllSalas();
    res.json(salas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createSala(req, res) {
  try {
    const nuevaSala = await salasService.createSala(req.body);
    res.status(201).json(nuevaSala);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateSala(req, res) {
  try {
    const sala = await salasService.updateSala(req.params.id, req.body);
    res.json(sala);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function deleteSala(req, res) {
  try {
    await salasService.deleteSala(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  getAllSalas,
  createSala,
  updateSala,
  deleteSala
};
