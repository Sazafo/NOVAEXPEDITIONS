const clienteService = require('../services/clienteService');

const obtenerClientes = async (req, res) => {
    try {

        const clientes =
            await clienteService.obtenerClientes();

        res.json(clientes);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los clientes'
        });

    }
};

const obtenerClientePorId = async (req, res) => {
    try {

        const cliente =
            await clienteService.obtenerClientePorId(
                req.params.id
            );

        if (!cliente) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json(cliente);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener el cliente'
        });

    }
};

const agregarCliente = async (req, res) => {
    try {

        const nuevoCliente =
            await clienteService.agregarCliente(
                req.body
            );

        res.status(201).json(nuevoCliente);

    } catch (error) {

        res.status(400).json({
            mensaje: 'Error al agregar el cliente',
            error: error.message
        });

    }
};

const actualizarCliente = async (req, res) => {
    try {

        const clienteActualizado =
            await clienteService.actualizarCliente(
                req.params.id,
                req.body
            );

        if (!clienteActualizado) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json(clienteActualizado);

    } catch (error) {

        res.status(400).json({
            mensaje: 'Error al actualizar el cliente',
            error: error.message
        });

    }
};

const eliminarCliente = async (req, res) => {
    try {

        const clienteEliminado =
            await clienteService.eliminarCliente(
                req.params.id
            );

        if (!clienteEliminado) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json({
            mensaje: 'Cliente eliminado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar el cliente'
        });

    }
};

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
};