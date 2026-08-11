const Actividad = require('../models/actividad');

const obtenerActividades = async () => await Actividad.find();
const obtenerActividadPorId = async (id) => await Actividad.findById(id);

const agregarActividad = async (datos) => {
    const nuevo = new Actividad(datos);
    return await nuevo.save();
};

const actualizarActividad = async (id, datos) => {
    return await Actividad.findByIdAndUpdate(
        id,
        datos,
        { new: true, runValidators: true }
    );
};

const eliminarActividad = async (id) => {
    return await Actividad.findByIdAndDelete(id);
};

module.exports = {
    obtenerActividades,
    obtenerActividadPorId,
    agregarActividad,
    actualizarActividad,
    eliminarActividad
};
