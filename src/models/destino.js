const mongoose = require('mongoose');

const destinoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    }
});

module.exports = mongoose.model('Destino', destinoSchema);
