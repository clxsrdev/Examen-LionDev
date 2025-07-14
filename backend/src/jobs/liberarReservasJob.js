const cron = require('node-cron');
const { Reserva } = require('../models');
const { Op } = require('sequelize');

function startLiberarReservasJob() {
  cron.schedule('* * * * *', async () => {
    console.log('Ejecutando cron job para liberar reservas vencidas...');

    try {
      const vencidas = await Reserva.findAll({
        where: {
          estado: 'activa',
          horario_fin: {
            [Op.lt]: new Date()
          }
        }
      });

      for (const reserva of vencidas) {
        await reserva.update({ estado: 'liberada' });
        console.log(`Reserva ID ${reserva.id} liberada`);
      }

    } catch (error) {
      console.error('Error en cron job:', error);
    }
  });
}

module.exports = { startLiberarReservasJob };
