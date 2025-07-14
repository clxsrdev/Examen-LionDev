const express = require('express');
const router = express.Router();
const salasController = require('../controllers/salasController');

router.get('/', salasController.getAllSalas);
router.post('/', salasController.createSala);
router.put('/:id', salasController.updateSala);
router.delete('/:id', salasController.deleteSala);

module.exports = router;
