const Nave = require('../models/nave');

const obtenerNaves = async () => await Nave.find();
const obtenerNavePorId = async (id) => await Nave.findById(id);

const agregarNave = async (datos) => {
    const nuevo = new Nave(datos);
    return await nuevo.save();
};

const actualizarNave = async (id, datos) => {
    return await Nave.findByIdAndUpdate(
        id,
        datos,
        { new: true, runValidators: true }
    );
};

const eliminarNave = async (id) => {
    return await Nave.findByIdAndDelete(id);
};

module.exports = {
    obtenerNaves,
    obtenerNavePorId,
    agregarNave,
    actualizarNave,
    eliminarNave
};
