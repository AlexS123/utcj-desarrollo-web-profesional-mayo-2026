const express = require('express');
const mongoose = require('mongoose');
const User = require('./user');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.middlewares();
        this.routes();
        this.connectDB();
        this.listen();
    }

    connectDB() {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Mayo2026';

        mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Conectado a MongoDB:', mongoUri);
        })
        .catch((error) => {
            console.error('Error de conexión a MongoDB:', error);
        });
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }
    routes() {
        this.app.get('/consultarUsuarios', (req, res) => {
            res.json({
                user: 'Alex',
                pass: '12345',
                rol: 'admin'
            });
        });

        this.app.post('/users', async (req, res) => {
            try {
                const { name } = req.body;
                if (!name) {
                    return res.status(400).json({ error: 'El campo name es obligatorio.' });
                }

                const user = new User({ name });
                await user.save();

                return res.status(201).json(user);
            } catch (error) {
                console.error('Error al crear usuario:', error);
                return res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor escuchando en puerto" + this.port);
        });
    }
}

module.exports = Server;