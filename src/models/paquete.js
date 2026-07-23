const mongoose = require('mongoose');

const paqueteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    destino: {
        type: String,
        required: true
    },

    duracionDias: {
        type: Number,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    incluye: {
        type: [String],
        required: true
    },

    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    }
});

module.exports = mongoose.model('Paquete', paqueteSchema);