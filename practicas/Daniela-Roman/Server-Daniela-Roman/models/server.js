const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./User');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.conectarDB();
        this.middlewares();
        this.routes();
        this.listen();
    }

    async conectarDB() {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Conectado a MongoDB');
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        // GET - Consultar usuarios
        this.app.get('/consultarUsuarios', async (req, res) => {
            console.log('--- Peticion GET recibida ---');
            console.log('Ruta: /consultarUsuarios');
            try {
                const usuarios = await User.find({}, { pass: 0 });
                res.json({ ok: true, usuarios });
            } catch (error) {
                res.status(500).json({ ok: false, msg: 'Error al consultar usuarios' });
            }
        });

        // POST - Registrar usuario
        this.app.post('/registrarUsuario', async (req, res) => {
            console.log('--- Peticion POST recibida ---');
            console.log('Ruta: /registrarUsuario');
            console.log('Datos recibidos:', req.body);
            try {
                const { user, pass, rol } = req.body;

                if (!user || !pass || !rol) {
                    return res.status(400).json({ ok: false, msg: 'Todos los campos son requeridos' });
                }

                const usuarioExiste = await User.findOne({ user });
                if (usuarioExiste) {
                    return res.status(400).json({ ok: false, msg: 'El usuario ya existe' });
                }

                const salt = await bcrypt.genSalt(10);
                const passCifrada = await bcrypt.hash(pass, salt);

                const nuevoUsuario = new User({ user, pass: passCifrada, rol });
                await nuevoUsuario.save();

                res.json({ ok: true, msg: '¡Usuario registrado correctamente!' });

            } catch (error) {
                res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
            }
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`http://127.0.0.1:${this.port}`);
        });
    }
}

module.exports = Server;