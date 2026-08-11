const mongoose = require('mongoose');

const naveSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    modelo: { type: String, required: true },
    capacidad: { type: Number, required: true },
    estado: {
        type: String,
        required: true,
        enum: ['Disponible', 'Mantenimiento', 'Inactiva']
    }
});

module.exports = mongoose.model('Nave', naveSchema);
