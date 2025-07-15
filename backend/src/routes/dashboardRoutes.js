const express = require('express');
const router = express.Router();
const { Sala, Reserva } = require('../models');

router.get('/estadisticas', async (req, res) => {
  try {
    // Contar todas las salas
    const totales = await Sala.count();

    // Contar reservas activas (ocupadas)
    const ocupadas = await Reserva.count({ where: { estado: 'activa' } });

    // Disponibles = totales - ocupadas
    const disponibles = totales - ocupadas;

    res.json({
      totales,
      disponibles,
      ocupadas
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ message: 'Error obteniendo estadísticas' });
  }
});

module.exports = router;
