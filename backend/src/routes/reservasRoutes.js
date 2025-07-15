const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

router.get('/', reservasController.getAllReservas);
router.post('/', reservasController.createReserva);
router.post('/:id/liberar', reservasController.liberarReserva);
router.delete('/:id', reservasController.deleteReserva);

module.exports = router;
