const express = require('express');

const clienteController =
    require('../controllers/clienteController');

const router = express.Router();

router.get(
    '/',
    clienteController.obtenerClientes
);

router.get(
    '/:id',
    clienteController.obtenerClientePorId
);

router.post(
    '/',
    clienteController.agregarCliente
);

router.put(
    '/:id',
    clienteController.actualizarCliente
);

router.delete(
    '/:id',
    clienteController.eliminarCliente
);

module.exports = router;