const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const conectarDB = require('./config/db');
const paqueteRoutes = require('./routes/paqueteRoutes');

const app = express();

// Conexión con MongoDB
conectarDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos del frontend (carpeta public)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas
app.use('/api/paquetes', paqueteRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send(
        'API de Nova Expeditions funcionando correctamente'
    );
});

// Puerto
const PORT = 3000;

app.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});