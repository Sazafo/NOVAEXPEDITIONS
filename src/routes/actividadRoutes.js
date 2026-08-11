const express = require('express');
const actividadController = require('../controllers/actividadController');
const router = express.Router();

router.get('/', actividadController.obtenerActividades);
router.get('/:id', actividadController.obtenerActividadPorId);
router.post('/', actividadController.agregarActividad);
router.put('/:id', actividadController.actualizarActividad);
router.delete('/:id', actividadController.eliminarActividad);

module.exports = router;
