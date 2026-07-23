const Paquete = require('../models/paquete');

const obtenerPaquetes = async () => {
    return await Paquete.find();
};

const obtenerPaquetePorId = async (id) => {
    return await Paquete.findById(id);
};

const agregarPaquete = async (datos) => {
    const nuevoPaquete = new Paquete(datos);
    return await nuevoPaquete.save();
};

const actualizarPaquete = async (id, datos) => {
    return await Paquete.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    );
};

const eliminarPaquete = async (id) => {
    return await Paquete.findByIdAndDelete(id);
};

module.exports = {
    obtenerPaquetes,
    obtenerPaquetePorId,
    agregarPaquete,
    actualizarPaquete,
    eliminarPaquete
};