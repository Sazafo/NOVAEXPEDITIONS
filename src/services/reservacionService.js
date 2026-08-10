const Reservacion = require('../models/reservacion');

const obtenerReservaciones = async () => {
    return await Reservacion.find();
};

const obtenerReservacionPorId = async (id) => {
    return await Reservacion.findById(id);
};

const agregarReservacion = async (datos) => {
    const nuevaReservacion = new Reservacion(datos);
    return await nuevaReservacion.save();
};

const actualizarReservacion = async (id, datos) => {
    return await Reservacion.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    );
};

const eliminarReservacion = async (id) => {
    return await Reservacion.findByIdAndDelete(id);
};

module.exports = {
    obtenerReservaciones,
    obtenerReservacionPorId,
    agregarReservacion,
    actualizarReservacion,
    eliminarReservacion
};