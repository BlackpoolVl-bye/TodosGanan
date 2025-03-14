const express = require('express');
const cors = require('cors');
const connection = require('./Conexion.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuario;', (error, results) => {
    if (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});