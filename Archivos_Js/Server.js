const express = require('express');
const cors = require('cors');
const connection = require('./Conexion.js');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


//actualizar usuario
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

  
  //actualizar numeros
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
  
  //actualizar usuario
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
  
  //agregar numeros
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
  
  //modificar usuario
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
  
  //borrar usuario
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

// Ruta para registrar un usuario
app.post('/api/registro', async (req, res) => {
  const { ID, Nombre, Apellido, Telf, Contrasena } = req.body;

  if (!ID || !Nombre || !Apellido || !Telf || !Contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
      const hashedPassword = await bcrypt.hash(Contrasena, 10); // Hashear la contraseña

      const [results] = await connection.query(
          'INSERT INTO usuario (ID, Nombre, Apellido, Telf, Contrasena) VALUES (?, ?, ?, ?, ?)',
          [ID, Nombre, Apellido, Telf, hashedPassword]
      );

      res.json({ message: 'Usuario registrado correctamente', id: results.insertId });
  } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para el login
app.post('/api/login', async (req, res) => {
  const { ID, Contrasena } = req.body;

  if (!ID || !Contrasena) {
      return res.status(400).json({ error: 'ID y contraseña son obligatorios' });
  }

  try {
      const [users] = await connection.query('SELECT * FROM usuario WHERE ID = ?', [ID]);

      if (users.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const user = users[0];
      const passwordMatch = await bcrypt.compare(Contrasena, user.Contrasena);

      if (!passwordMatch) {
          return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      const { Contrasena: _, ...userData } = user; // Excluir la contraseña de la respuesta
      res.json({ message: 'Login exitoso', user: userData });
  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

//puebas de registros
const [results] = await connection.query('SELECT * FROM usuario');
console.log(results);