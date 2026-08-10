const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({

    cliente: {
        type: String,
        required: true
    },

    paquete: {
        type: String,
        required: true
    },

    fechaReserva: {
        type: String,
        required: true
    },

    cantidadPersonas: {
        type: Number,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Confirmada', 'Cancelada']
    }

});

module.exports = mongoose.model('Reservacion', reservacionSchema);