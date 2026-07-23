const paqueteService = require('../services/paqueteService');

const obtenerPaquetes = async (req, res) => {
    try {
        const paquetes = await paqueteService.obtenerPaquetes();
        res.json(paquetes);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los paquetes'
        });
    }
};

const obtenerPaquetePorId = async (req, res) => {
    try {
        const paquete = await paqueteService.obtenerPaquetePorId(
            req.params.id
        );

        if (!paquete) {
            return res.status(404).json({
                mensaje: 'Paquete no encontrado'
            });
        }

        res.json(paquete);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el paquete'
        });
    }
};

const agregarPaquete = async (req, res) => {
    try {
        const nuevoPaquete = await paqueteService.agregarPaquete(
            req.body
        );

        res.status(201).json(nuevoPaquete);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al agregar el paquete',
            error: error.message
        });
    }
};

const actualizarPaquete = async (req, res) => {
    try {
        const paqueteActualizado =
            await paqueteService.actualizarPaquete(
                req.params.id,
                req.body
            );

        if (!paqueteActualizado) {
            return res.status(404).json({
                mensaje: 'Paquete no encontrado'
            });
        }

        res.json(paqueteActualizado);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar el paquete',
            error: error.message
        });
    }
};

const eliminarPaquete = async (req, res) => {
    try {
        const paqueteEliminado =
            await paqueteService.eliminarPaquete(
                req.params.id
            );

        if (!paqueteEliminado) {
            return res.status(404).json({
                mensaje: 'Paquete no encontrado'
            });
        }

        res.json({
            mensaje: 'Paquete eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el paquete'
        });
    }
};

module.exports = {
    obtenerPaquetes,
    obtenerPaquetePorId,
    agregarPaquete,
    actualizarPaquete,
    eliminarPaquete
};