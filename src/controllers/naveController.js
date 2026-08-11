const naveService = require('../services/naveService');

const obtenerNaves = async (req, res) => {
    try {
        res.json(await naveService.obtenerNaves());
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los naves' });
    }
};

const obtenerNavePorId = async (req, res) => {
    try {
        const dato = await naveService.obtenerNavePorId(req.params.id);
        if (!dato) return res.status(404).json({ mensaje: 'Nave no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el nave' });
    }
};

const agregarNave = async (req, res) => {
    try {
        res.status(201).json(await naveService.agregarNave(req.body));
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al agregar el nave', error: error.message });
    }
};

const actualizarNave = async (req, res) => {
    try {
        const dato = await naveService.actualizarNave(req.params.id, req.body);
        if (!dato) return res.status(404).json({ mensaje: 'Nave no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el nave', error: error.message });
    }
};

const eliminarNave = async (req, res) => {
    try {
        const dato = await naveService.eliminarNave(req.params.id);
        if (!dato) return res.status(404).json({ mensaje: 'Nave no encontrado' });
        res.json({ mensaje: 'Nave eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el nave' });
    }
};

module.exports = {
    obtenerNaves,
    obtenerNavePorId,
    agregarNave,
    actualizarNave,
    eliminarNave
};
