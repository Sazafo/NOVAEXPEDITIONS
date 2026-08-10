const Cliente = require('../models/cliente');

const obtenerClientes = async () => {
    return await Cliente.find();
};

const obtenerClientePorId = async (id) => {
    return await Cliente.findById(id);
};

const agregarCliente = async (datos) => {
    const nuevoCliente = new Cliente(datos);
    return await nuevoCliente.save();
};

const actualizarCliente = async (id, datos) => {
    return await Cliente.findByIdAndUpdate(
        id,
        datos,
        {
            new: true,
            runValidators: true
        }
    );
};

const eliminarCliente = async (id) => {
    return await Cliente.findByIdAndDelete(id);
};

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
};