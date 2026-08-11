const destinoService = require('../services/destinoService');

const obtenerDestinos = async (req, res) => {
    try {
        res.json(await destinoService.obtenerDestinos());
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los destinos' });
    }
};

const obtenerDestinoPorId = async (req, res) => {
    try {
        const dato = await destinoService.obtenerDestinoPorId(req.params.id);
        if (!dato) return res.status(404).json({ mensaje: 'Destino no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el destino' });
    }
};

const agregarDestino = async (req, res) => {
    try {
        res.status(201).json(await destinoService.agregarDestino(req.body));
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al agregar el destino', error: error.message });
    }
};

const actualizarDestino = async (req, res) => {
    try {
        const dato = await destinoService.actualizarDestino(req.params.id, req.body);
        if (!dato) return res.status(404).json({ mensaje: 'Destino no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el destino', error: error.message });
    }
};

const eliminarDestino = async (req, res) => {
    try {
        const dato = await destinoService.eliminarDestino(req.params.id);
        if (!dato) return res.status(404).json({ mensaje: 'Destino no encontrado' });
        res.json({ mensaje: 'Destino eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el destino' });
    }
};

module.exports = {
    obtenerDestinos,
    obtenerDestinoPorId,
    agregarDestino,
    actualizarDestino,
    eliminarDestino
};
