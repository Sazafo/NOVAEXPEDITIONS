const express = require('express');
const naveController = require('../controllers/naveController');
const router = express.Router();

router.get('/', naveController.obtenerNaves);
router.get('/:id', naveController.obtenerNavePorId);
router.post('/', naveController.agregarNave);
router.put('/:id', naveController.actualizarNave);
router.delete('/:id', naveController.eliminarNave);

module.exports = router;
