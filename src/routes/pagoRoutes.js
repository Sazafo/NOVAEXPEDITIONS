const express = require('express');

const pagoController =
    require('../controllers/pagoController');

const router = express.Router();

router.get(
    '/',
    pagoController.obtenerPagos
);

router.get(
    '/:id',
    pagoController.obtenerPagoPorId
);

router.post(
    '/',
    pagoController.agregarPago
);

router.put(
    '/:id',
    pagoController.actualizarPago
);

router.delete(
    '/:id',
    pagoController.eliminarPago
);

module.exports = router;