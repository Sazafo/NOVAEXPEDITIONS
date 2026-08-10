const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({

    cliente: {
        type: String,
        required: true
    },

    reservacion: {
        type: String,
        required: true
    },

    monto: {
        type: Number,
        required: true
    },

    metodoPago: {
        type: String,
        required: true,
        enum: ['Tarjeta', 'Transferencia', 'Efectivo']
    },

    fechaPago: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Pagado', 'Rechazado']
    }

});

module.exports = mongoose.model('Pago', pagoSchema);