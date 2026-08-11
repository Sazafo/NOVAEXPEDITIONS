const actividadService = require('../services/actividadService');

const obtenerActividades = async (req, res) => {
    try {
        res.json(await actividadService.obtenerActividades());
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los actividades' });
    }
};

const obtenerActividadPorId = async (req, res) => {
    try {
        const dato = await actividadService.obtenerActividadPorId(req.params.id);
        if (!dato) return res.status(404).json({ mensaje: 'Actividad no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el actividad' });
    }
};

const agregarActividad = async (req, res) => {
    try {
        res.status(201).json(await actividadService.agregarActividad(req.body));
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al agregar el actividad', error: error.message });
    }
};

const actualizarActividad = async (req, res) => {
    try {
        const dato = await actividadService.actualizarActividad(req.params.id, req.body);
        if (!dato) return res.status(404).json({ mensaje: 'Actividad no encontrado' });
        res.json(dato);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el actividad', error: error.message });
    }
};

const eliminarActividad = async (req, res) => {
    try {
        const dato = await actividadService.eliminarActividad(req.params.id);
        if (!dato) return res.status(404).json({ mensaje: 'Actividad no encontrado' });
        res.json({ mensaje: 'Actividad eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el actividad' });
    }
};

module.exports = {
    obtenerActividades,
    obtenerActividadPorId,
    agregarActividad,
    actualizarActividad,
    eliminarActividad
};
