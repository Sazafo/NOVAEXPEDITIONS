const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    destino: { type: String, required: true },
    duracionHoras: { type: Number, required: true },
    precio: { type: Number, required: true },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    }
});

module.exports = mongoose.model('Actividad', actividadSchema);
