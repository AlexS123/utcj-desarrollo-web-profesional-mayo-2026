const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.middlewares();
        this.usersDatabase();
        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    usersDatabase() {
        mongoose.connect('mongodb://localhost:27017/mayo2026_web_prof');
        let Schema = mongoose.Schema;
        const userSchema = new Schema({
            user: String,
            pass: String,
            rol: String
        });

        this.userModel = mongoose.model('user', userSchema);
    }

    routes() {
        this.app.get('/consultarUsuarios', (req, res) => {
            res.json({
                user: 'joshua',
                pass: '123456',
                rol: 'admin'
            });
        });

        this.app.post('/registrar', async (req, res) => {
            try {
                let { user, pass, rol } = req.body;
                console.log(`Usuario: ${user}, Rol: ${rol}`);

                const saltRounds = 10;
                const hash = await bcrypt.hash(pass, saltRounds);
                console.log('Contraseña cifrada:', hash);

                const newUser = new this.userModel({
                    user: user,
                    pass: hash,
                    rol: rol
                });

                const savedUser = await newUser.save();
                console.log("Usuario guardado:", savedUser);

                res.status(200).json({ ok: true, user: savedUser });
            } catch (err) {
                console.error('Error al registrar usuario:', err);
                res.status(500).json({ ok: false, error: err.message });
            }
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;