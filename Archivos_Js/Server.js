const express = require('express');
const cors = require('cors');
const connection = require('./Conexion.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuario', (error, results) => {
      if (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/numeros', (req, res) => {
    connection.query('SELECT * FROM numeros', (error, results) => {
      if (error) {
        console.error('Error al obtener números:', error);
        res.status(500).json({ error: 'Error al obtener números' });
      } else {
        res.json(results);
      }
    });
  });
  app.post('/api/usuarios', (req, res) => {
    const { ID, Nombre, Apellido, Telf } = req.body;
    connection.query(
      'INSERT INTO usuario (ID, Nombre, Apellido, Telf) VALUES (?, ?, ?, ?)',
      [ID, Nombre, Apellido, Telf],
      (error, results) => {
        if (error) {
          console.error('Error al crear el usuario:', error);
          res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
          res.json({ message: 'Usuario creado correctamente', id: results.insertId });
        }
      }
    );
  });
  app.post('/api/numeros', (req, res) => {
    const { ID, Numeros, Descripcion } = req.body;
    connection.query(
      'INSERT INTO numeros (ID, Numeros, Descripcion) VALUES (?, ?, ?)',
      [ID, Numeros, Descripcion],
      (error, results) => {
        if (error) {
          console.error('Error al crear el número:', error);
          res.status(500).json({ error: 'Error al crear el número' });
        } else {
          res.json({ message: 'Número creado correctamente', id: results.insertId });
        }
      }
    );
  });
  app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Telf } = req.body;
    connection.query(
      'UPDATE usuario SET Nombre = ?, Apellido = ?, Telf = ? WHERE ID = ?',
      [Nombre, Apellido, Telf, id],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar el usuario:', error);
          res.status(500).json({ error: 'Error al actualizar el usuario' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
          res.json({ message: 'Usuario actualizado correctamente' });
        }
      }
    );
  });
  app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM usuario WHERE ID = ?', [id], (error, results) => {
      if (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.json({ message: 'Usuario eliminado correctamente' });
      }
    });
  });
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});