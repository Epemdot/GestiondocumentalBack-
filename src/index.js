const express = require('express');
const cors = require('cors');
require('dotenv').config();
const empresaRoutes = require('./routes/empresa.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Hola Maritza');
});

app.use('/empresas', empresaRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});