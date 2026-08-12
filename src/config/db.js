const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/NOVAEXPEDITIONS'
        );

        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error(
            'Error al conectar con MongoDB:',
            error.message
        );
    }
};

module.exports = conectarDB;