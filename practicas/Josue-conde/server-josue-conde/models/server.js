require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));

    }

    usersDatabase() {

        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("✅ Conectado a MongoDB"))
            .catch(err => console.error(err));

        const Schema = mongoose.Schema;

        const userSchema = new Schema({

            user: {
                type: String,
                required: true,
                unique: true
            },

            pass: {
                type: String,
                required: true
            },

            rol: {
                type: String,
                required: true
            }

        });

        this.userModel = mongoose.model("User", userSchema);

    }

    verificarToken(req, res, next) {

        const authHeader = req.headers.authorization;

        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {

            return res.status(403).json({

                ok: false,
                mensaje: "Token requerido"

            });

        }

        jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {

            if (err) {

                return res.status(403).json({

                    ok: false,
                    mensaje: "Token inválido"

                });

            }

            req.user = usuario;

            next();

        });

    }

    routes() {

        this.app.get("/consultarUsuarios", async (req, res) => {

            try {

                const usuarios = await this.userModel.find();

                res.json({

                    ok: true,
                    usuarios

                });

            }

            catch (err) {

                res.status(500).json({

                    ok: false,
                    error: err.message

                });

            }

        });

        this.app.post("/registrar", async (req, res) => {

            try {

                const { user, pass, rol } = req.body;

                const existe = await this.userModel.findOne({ user });

                if (existe) {

                    return res.status(400).json({

                        ok: false,
                        mensaje: "El usuario ya existe"

                    });

                }

                const hash = await bcrypt.hash(pass, 10);

                const nuevoUsuario = new this.userModel({

                    user,
                    pass: hash,
                    rol

                });

                await nuevoUsuario.save();

                res.status(201).json({

                    ok: true,
                    mensaje: "Usuario registrado correctamente"

                });

            }

            catch (err) {

                res.status(500).json({

                    ok: false,
                    error: err.message

                });

            }

        });

        this.app.post("/login", async (req, res) => {

            try {

                const { user, pass } = req.body;

                const usuario = await this.userModel.findOne({ user });

                if (!usuario) {

                    return res.status(401).json({

                        ok: false,
                        mensaje: "Usuario incorrecto"

                    });

                }

                const coincide = await bcrypt.compare(pass, usuario.pass);

                if (!coincide) {

                    return res.status(401).json({

                        ok: false,
                        mensaje: "Contraseña incorrecta"

                    });

                }

                const token = jwt.sign({

                    id: usuario._id,
                    user: usuario.user,
                    rol: usuario.rol

                },

                process.env.JWT_SECRET,

                {

                    expiresIn: "2h"

                });

                res.json({

                    ok: true,
                    mensaje: "Inicio de sesión correcto",
                    token

                });

            }

            catch (err) {

                res.status(500).json({

                    ok: false,
                    error: err.message

                });

            }

        });

        this.app.get("/dashboard", this.verificarToken.bind(this), (req, res) => {

            res.json({

                ok: true,
                mensaje: `Bienvenido ${req.user.user}`,
                usuario: req.user

            });

        });

    }

    listen() {

        this.app.listen(this.port, () => {

            console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);

        });

    }

}

module.exports = Server;