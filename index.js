const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Crear el servidor de Express
const app = express();

// Base de datos
dbConnection();

// cors
app.use(cors());

// Directorio Publico
app.use(express.static('public'));

// Lectura y Parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto ', + process.env.PORT);
})