const express = require('express');
const cors = require('cors');
const connection = require('./Conexion.js');
const bcrypt = require('bcrypt');
const logger = require('./Logger.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM usuario');
        res.json(results);
    } catch (error) {
        logger.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Obtener todos los números
app.get('/api/numeros', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM numeros');
        res.json(results);
    } catch (error) {
        logger.error('Error al obtener números:', error);
        res.status(500).json({ error: 'Error al obtener números' });
    }
});

// Crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    const { ID, Nombre, Apellido, Telf } = req.body;

    try {
        const [results] = await connection.query(
            'INSERT INTO usuario (ID, Nombre, Apellido, Telf) VALUES (?, ?, ?, ?)',
            [ID, Nombre, Apellido, Telf]
        );

        logger.info('Nuevo usuario creado:', { ID, Nombre, Apellido, Telf });
        res.json({ message: 'Usuario creado correctamente', id: results.insertId });
    } catch (error) {
        logger.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// Agregar un nuevo número
app.post('/api/numeros', async (req, res) => {
    const { ID, Numeros, Descripcion } = req.body;

    try {
        const [results] = await connection.query(
            'INSERT INTO numeros (ID, Numeros, Descripcion) VALUES (?, ?, ?)',
            [ID, Numeros, Descripcion]
        );

        logger.info('Nuevo número creado:', { ID, Numeros, Descripcion });
        res.json({ message: 'Número creado correctamente', id: results.insertId });
    } catch (error) {
        logger.error('Error al crear el número:', error);
        res.status(500).json({ error: 'Error al crear el número' });
    }
});

// Modificar un usuario existente
app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Telf } = req.body;

    try {
        const [results] = await connection.query(
            'UPDATE usuario SET Nombre = ?, Apellido = ?, Telf = ? WHERE ID = ?',
            [Nombre, Apellido, Telf, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        logger.info('Usuario actualizado:', { id, Nombre, Apellido, Telf });
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        logger.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Eliminar un usuario existente
app.delete('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await connection.query('DELETE FROM usuario WHERE ID = ?', [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        logger.info('Usuario eliminado:', { id });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        logger.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
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

        logger.info('Nuevo usuario registrado:', {
            ID,
            Nombre,
            Apellido,
            Telf,
            Contrasena: '********', // No mostrar la contraseña real
            fecha: new Date().toISOString(),
        });

        res.json({ message: 'Usuario registrado correctamente', id: results.insertId });
    } catch (error) {
        logger.error('Error al registrar el usuario:', error);
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
        logger.info('Login exitoso:', { ID });
        res.json({ message: 'Login exitoso', user: userData });
    } catch (error) {
        logger.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Pruebas de registros (esto no debe estar en producción)
app.get('/api/pruebas', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM usuario');
        logger.info('Pruebas de registros:', results);
        res.json(results);
    } catch (error) {
        logger.error('Error en la prueba:', error);
        res.status(500).json({ error: 'Error en la prueba' });
    }
});

app.listen(port, () => {
    logger.info(`Servidor escuchando en el puerto ${port}`);
});