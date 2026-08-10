const express = require('express');

const reservacionController =
    require('../controllers/reservacionController');

const router = express.Router();

router.get(
    '/',
    reservacionController.obtenerReservaciones
);

router.get(
    '/:id',
    reservacionController.obtenerReservacionPorId
);

router.post(
    '/',
    reservacionController.agregarReservacion
);

router.put(
    '/:id',
    reservacionController.actualizarReservacion
);

router.delete(
    '/:id',
    reservacionController.eliminarReservacion
);

module.exports = router;