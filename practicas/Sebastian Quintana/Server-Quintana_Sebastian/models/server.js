const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./user');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.middlewares();
        this.routes();
        this.errorHandler();
        this.connectDB();
        this.listen();
    }

    connectDB() {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Mayo2026';

        mongoose.connect(mongoUri)
            .then(() => {
                console.log('Conectado a MongoDB:', mongoUri);
            })
            .catch((error) => {
                console.error('Error de conexión a MongoDB:', error);
            });
    }

    middlewares() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }

            next();
        });

        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use((req, res, next) => {
            if (req.method === 'POST' && !req.body) {
                let data = '';
                req.setEncoding('utf8');
                req.on('data', (chunk) => {
                    data += chunk;
                });
                req.on('end', () => {
                    if (data) {
                        try {
                            req.body = JSON.parse(data);
                        } catch (error) {
                            try {
                                const parsed = new URLSearchParams(data);
                                req.body = Object.fromEntries(parsed.entries());
                            } catch {
                                req.body = {};
                            }
                        }
                    } else {
                        req.body = {};
                    }
                    next();
                });
            } else {
                next();
            }
        });
    }

    routes() {
        this.app.get('/consultarUsuarios', async (req, res) => {
            try {
                const users = await User.find({}, 'user rol createdAt updatedAt');
                return res.json(users);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                return res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });

        this.app.post('/registrar', async (req, res) => {
            try {
                const body = req.body || {};
                const { user, pass, rol } = body;

                if (!user || !pass || !rol) {
                    return res.status(400).json({ error: 'Los campos user, pass y rol son obligatorios.' });
                }

                const existingUser = await User.findOne({ user });
                if (existingUser) {
                    return res.status(400).json({ error: 'El usuario ya existe.' });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pass, salt);

                const newUser = new User({ user, pass: hashedPassword, rol });
                await newUser.save();

                return res.status(201).json({
                    id: newUser._id,
                    user: newUser.user,
                    rol: newUser.rol,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt,
                });
            } catch (error) {
                console.error('Error al crear usuario:', error);
                return res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }

    errorHandler() {
        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                return res.status(400).json({
                    error: 'JSON inválido. En Postman usa Body > raw > JSON.'
                });
            }

            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en puerto ' + this.port);
        });
    }
}

module.exports = Server;