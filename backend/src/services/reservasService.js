const { Reserva } = require('../models');
const { Op } = require('sequelize');
const { validateDuration } = require('../utils/validators');
const { convertirAhorarioMexico } = require('../utils/dateUtils');

async function getAllReservas() {
  const reservas = await Reserva.findAll();

  return reservas.map(r => {
    const reserva = r.toJSON ? r.toJSON() : r;

    return {
      ...reserva,
      horario_inicio_local: convertirAhorarioMexico(reserva.horario_inicio),
      horario_fin_local: convertirAhorarioMexico(reserva.horario_fin),
    };
  });
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
  if (!reserva) throw new Error('Reserva no encontrada');

  const ahora = new Date();

  return await reserva.update({
    estado: 'liberada',
    horario_fin: ahora
  });
}


async function deleteReserva(id) {
  const reserva = await Reserva.findByPk(id);
  if (!reserva) throw new Error('Reserva no encontrada');
  await reserva.destroy();
}


module.exports = {
  getAllReservas,
  createReserva,
  liberarReserva,
  deleteReserva
};
