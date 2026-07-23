const express = require('express');
const paqueteController = require('../controllers/paqueteController');

const router = express.Router();

router.get('/', paqueteController.obtenerPaquetes);

router.get('/:id', paqueteController.obtenerPaquetePorId);

router.post('/', paqueteController.agregarPaquete);

router.put('/:id', paqueteController.actualizarPaquete);

router.delete('/:id', paqueteController.eliminarPaquete);

module.exports = router;