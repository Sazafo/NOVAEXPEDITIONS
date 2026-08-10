const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true
    },

    telefono: {
        type: String,
        required: true
    },

    pais: {
        type: String,
        required: true
    },

    edad: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    }

});

module.exports = mongoose.model('Cliente', clienteSchema);