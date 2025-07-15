const reservasService = require('../services/reservasService');

async function getAllReservas(req, res) {
  try {
    const reservas = await reservasService.getAllReservas();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createReserva(req, res) {
  try {
    const nuevaReserva = await reservasService.createReserva(req.body);
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function liberarReserva(req, res) {
  try {
    const reserva = await reservasService.liberarReserva(req.params.id);
    res.json(reserva);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function deleteReserva(req, res) {
  try {
    await reservasService.deleteReserva(req.params.id);
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getAllReservas,
  createReserva,
  liberarReserva,
  deleteReserva
};