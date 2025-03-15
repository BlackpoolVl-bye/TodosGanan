const express = require('express');
const cors = require('cors');
const connection = require('./Conexion.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Obtener todos los boletos
app.get('/api/boletos', (req, res) => {
  connection.query('SELECT * FROM boletos', (error, results) => {
    if (error) {
      console.error('Error al obtener boletos:', error);
      res.status(500).json({ error: 'Error al obtener boletos' });
    } else {
      res.json(results);
    }
  });
});

// Obtener un boleto por ID
app.get('/api/boletos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM boletos WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error al obtener el boleto:', error);
      res.status(500).json({ error: 'Error al obtener el boleto' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Boleto no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});

// Crear un nuevo boleto
app.post('/api/boletos', (req, res) => {
  const { telefono, boleto } = req.body;
  connection.query(
    'INSERT INTO boletos (telefono, boleto) VALUES (?, ?)',
    [telefono, boleto],
    (error, results) => {
      if (error) {
        console.error('Error al crear el boleto:', error);
        res.status(500).json({ error: 'Error al crear el boleto' });
      } else {
        res.json({ message: 'Boleto creado correctamente', id: results.insertId });
      }
    }
  );
});

// Actualizar un boleto existente
app.put('/api/boletos/:id', (req, res) => {
  const { id } = req.params;
  const { telefono, boleto } = req.body;
  connection.query(
    'UPDATE boletos SET telefono = ?, boleto = ? WHERE id = ?',
    [telefono, boleto, id],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar el boleto:', error);
        res.status(500).json({ error: 'Error al actualizar el boleto' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Boleto no encontrado' });
      } else {
        res.json({ message: 'Boleto actualizado correctamente' });
      }
    }
  );
});

// Eliminar un boleto existente
app.delete('/api/boletos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM boletos WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar el boleto:', error);
      res.status(500).json({ error: 'Error al eliminar el boleto' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Boleto no encontrado' });
    } else {
      res.json({ message: 'Boleto eliminado correctamente' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});