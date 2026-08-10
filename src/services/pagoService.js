const Pago = require('../models/pago');

const obtenerPagos = async () => {
    return await Pago.find();
};

const obtenerPagoPorId = async (id) => {
    return await Pago.findById(id);
};

const agregarPago = async (datos) => {
    const nuevoPago = new Pago(datos);
    return await nuevoPago.save();
};

const actualizarPago = async (id, datos) => {
    return await Pago.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    );
};

const eliminarPago = async (id) => {
    return await Pago.findByIdAndDelete(id);
};

module.exports = {
    obtenerPagos,
    obtenerPagoPorId,
    agregarPago,
    actualizarPago,
    eliminarPago
};