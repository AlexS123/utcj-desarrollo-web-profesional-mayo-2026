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

        this.app.use(
            express.urlencoded({
                extended: true
            })
        );

        this.app.use(express.static('public'));

    }

    usersDatabase() {

        mongoose.connect(process.env.MONGODB_URI)

            .then(() => {

                console.log("✅ Conectado a MongoDB");

            })

            .catch(err => {

                console.error(
                    "❌ Error al conectar a MongoDB:",
                    err
                );

            });


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
                required: true,
                enum: ["admin", "usuario"]
            }

        });


        this.userModel = mongoose.model(
            "User",
            userSchema
        );

    }


    // ==========================================
    // VERIFICAR TOKEN
    // ==========================================

    verificarToken(req, res, next) {

        const authHeader =
            req.headers.authorization;

        const token =
            authHeader &&
            authHeader.split(" ")[1];


        if (!token) {

            return res.status(403).json({

                ok: false,

                mensaje: "Token requerido"

            });

        }


        jwt.verify(

            token,

            process.env.JWT_SECRET,

            (err, usuario) => {

                if (err) {

                    return res.status(403).json({

                        ok: false,

                        mensaje:
                            "Token inválido o expirado"

                    });

                }


                req.user = usuario;

                next();

            }

        );

    }


    // ==========================================
    // VERIFICAR QUE SEA ADMIN
    // ==========================================

    verificarAdmin(req, res, next) {

        if (!req.user) {

            return res.status(403).json({

                ok: false,

                mensaje: "No autorizado"

            });

        }


        if (req.user.rol !== "admin") {

            return res.status(403).json({

                ok: false,

                mensaje:
                    "No tienes permisos de administrador"

            });

        }


        next();

    }


    routes() {


        // ==========================================
        // CONSULTAR USUARIOS
        // SOLO ADMIN
        // ==========================================

        this.app.get(

            "/consultarUsuarios",

            this.verificarToken.bind(this),

            this.verificarAdmin.bind(this),

            async (req, res) => {

                try {

                    const usuarios =
                        await this.userModel.find();


                    res.status(200).json({

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

            }

        );


        // ==========================================
        // REGISTRAR USUARIO
        // ==========================================

        this.app.post(

            "/registrar",

            async (req, res) => {

                try {

                    const {
                        user,
                        pass,
                        rol
                    } = req.body;


                    // VALIDAR CAMPOS

                    if (!user || !pass || !rol) {

                        return res.status(400).json({

                            ok: false,

                            mensaje:
                                "Todos los campos son obligatorios"

                        });

                    }


                    // VALIDAR ROL

                    if (
                        rol !== "admin" &&
                        rol !== "usuario"
                    ) {

                        return res.status(400).json({

                            ok: false,

                            mensaje:
                                "El rol debe ser admin o usuario"

                        });

                    }


                    // COMPROBAR SI EXISTE

                    const existe =
                        await this.userModel.findOne({
                            user
                        });


                    if (existe) {

                        return res.status(400).json({

                            ok: false,

                            mensaje:
                                "El usuario ya existe"

                        });

                    }


                    // ENCRIPTAR CONTRASEÑA

                    const hash =
                        await bcrypt.hash(
                            pass,
                            10
                        );


                    // CREAR USUARIO

                    const nuevoUsuario =
                        new this.userModel({

                            user,

                            pass: hash,

                            rol

                        });


                    await nuevoUsuario.save();


                    res.status(201).json({

                        ok: true,

                        mensaje:
                            "Usuario registrado correctamente"

                    });

                }

                catch (err) {

                    console.error(err);

                    res.status(500).json({

                        ok: false,

                        error: err.message

                    });

                }

            }

        );


        // ==========================================
        // LOGIN
        // ADMIN Y USUARIO
        // ==========================================

        this.app.post(

            "/login",

            async (req, res) => {

                try {

                    const {
                        user,
                        pass
                    } = req.body;


                    // BUSCAR USUARIO

                    const usuario =
                        await this.userModel.findOne({
                            user
                        });


                    if (!usuario) {

                        return res.status(401).json({

                            ok: false,

                            mensaje:
                                "Usuario incorrecto"

                        });

                    }


                    // COMPARAR CONTRASEÑA

                    const coincide =
                        await bcrypt.compare(
                            pass,
                            usuario.pass
                        );


                    if (!coincide) {

                        return res.status(401).json({

                            ok: false,

                            mensaje:
                                "Contraseña incorrecta"

                        });

                    }


                    // GENERAR JWT

                    const token = jwt.sign(

                        {

                            id: usuario._id,

                            user: usuario.user,

                            rol: usuario.rol

                        },

                        process.env.JWT_SECRET,

                        {

                            expiresIn: "2h"

                        }

                    );


                    res.status(200).json({

                        ok: true,

                        mensaje:
                            "Inicio de sesión correcto",

                        token,

                        usuario: {

                            user: usuario.user,

                            rol: usuario.rol

                        }

                    });

                }

                catch (err) {

                    console.error(err);

                    res.status(500).json({

                        ok: false,

                        error: err.message

                    });

                }

            }

        );


        // ==========================================
        // DASHBOARD
        // ADMIN Y USUARIO
        // ==========================================

        this.app.get(

            "/dashboard",

            this.verificarToken.bind(this),

            (req, res) => {

                res.status(200).json({

                    ok: true,

                    mensaje:
                        `Bienvenido ${req.user.user}`,

                    usuario: req.user

                });

            }

        );

    }


    listen() {

        this.app.listen(

            this.port,

            () => {

                console.log(
                    `🚀 Servidor corriendo en http://localhost:${this.port}`
                );

            }

        );

    }

}

module.exports = Server;