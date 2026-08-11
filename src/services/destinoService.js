const Destino = require('../models/destino');

const obtenerDestinos = async () => await Destino.find();
const obtenerDestinoPorId = async (id) => await Destino.findById(id);

const agregarDestino = async (datos) => {
    const nuevo = new Destino(datos);
    return await nuevo.save();
};

const actualizarDestino = async (id, datos) => {
    return await Destino.findByIdAndUpdate(
        id,
        datos,
        { new: true, runValidators: true }
    );
};

const eliminarDestino = async (id) => {
    return await Destino.findByIdAndDelete(id);
};

module.exports = {
    obtenerDestinos,
    obtenerDestinoPorId,
    agregarDestino,
    actualizarDestino,
    eliminarDestino
};
