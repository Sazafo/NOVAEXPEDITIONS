const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const conectarDB = require('./config/db');
const paqueteRoutes = require('./routes/paqueteRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const reservacionRoutes = require('./routes/reservacionRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const destinoRoutes = require('./routes/destinoRoutes');
const naveRoutes = require('./routes/naveRoutes');
const actividadRoutes = require('./routes/actividadRoutes');
const pilotoRoutes = require('./routes/pilotoRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const seguroRoutes = require('./routes/seguroRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const opinionRoutes = require('./routes/opinionRoutes');

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
app.use('/api/clientes', clienteRoutes);
app.use('/api/reservaciones', reservacionRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/destinos', destinoRoutes);
app.use('/api/naves', naveRoutes);
app.use('/api/actividades', actividadRoutes);
app.use('/api/pilotos', pilotoRoutes);
app.use('/api/hoteles', hotelRoutes);
app.use('/api/seguros', seguroRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/opiniones', opinionRoutes);

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