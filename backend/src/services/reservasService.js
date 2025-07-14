const { Reserva } = require('../models');
const { Op } = require('sequelize');
const { validateDuration } = require('../utils/validators');

async function getAllReservas() {
  return await Reserva.findAll();
}

async function createReserva(data) {
  // Validar duración
  validateDuration(data.horario_inicio, data.horario_fin);

  // Verificar solapamiento
  const overlap = await Reserva.findOne({
    where: {
      sala_id: data.sala_id,
      estado: 'activa',
      [Op.or]: [
        {
          horario_inicio: { [Op.between]: [data.horario_inicio, data.horario_fin] }
        },
        {
          horario_fin: { [Op.between]: [data.horario_inicio, data.horario_fin] }
        },
        {
          horario_inicio: { [Op.lte]: data.horario_inicio },
          horario_fin: { [Op.gte]: data.horario_fin }
        }
      ]
    }
  });

  if (overlap) {
    throw new Error('La sala ya está reservada en ese horario');
  }

  return await Reserva.create(data);
}

async function liberarReserva(id) {
  const reserva = await Reserva.findByPk(id);
  if (!reserva) throw new Error('Reserva not found');
  return await reserva.update({ estado: 'liberada' });
}

module.exports = {
  getAllReservas,
  createReserva,
  liberarReserva
};
