const express = require('express');
const destinoController = require('../controllers/destinoController');
const router = express.Router();

router.get('/', destinoController.obtenerDestinos);
router.get('/:id', destinoController.obtenerDestinoPorId);
router.post('/', destinoController.agregarDestino);
router.put('/:id', destinoController.actualizarDestino);
router.delete('/:id', destinoController.eliminarDestino);

module.exports = router;
