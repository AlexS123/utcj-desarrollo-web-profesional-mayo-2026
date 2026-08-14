const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

class Server {

    constructor() {

        this.app = express();

        this.port = process.env.PORT || 5000;

        this.JWT_SECRET = "mi_clave_secreta_super_segura";

        this.middlewares();
        this.routes();
        this.listen();
        this.UsersDatabase();

    }


    // ==========================================
    // MIDDLEWARE PARA VALIDAR JWT
    // ==========================================

    verificarToken = (req, res, next) => {

        const token = req.cookies.token;

        if (!token) {

            return res.status(401).json({
                mensaje: "No hay token. Debes iniciar sesión."
            });

        }

        jwt.verify(
            token,
            this.JWT_SECRET,
            (err, user) => {

                if (err) {

                    return res.status(403).json({
                        mensaje: "Token inválido o expirado."
                    });

                }

                req.user = user;

                next();

            }
        );

    };


    // ==========================================
    // VALIDAR QUE SEA ADMIN
    // ==========================================

    verificarAdmin = (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                mensaje: "Usuario no autenticado."
            });

        }

        if (req.user.rol !== "Admin") {

            return res.status(403).json({
                mensaje: "Acceso denegado. Solo administradores."
            });

        }

        next();

    };


    // ==========================================
    // MIDDLEWARES
    // ==========================================

    middlewares() {

        this.app.use(express.static('public'));

        this.app.use(express.json());

        this.app.use(
            express.urlencoded({
                extended: true
            })
        );

        // Cookie Parser
        this.app.use(cookieParser());

        // CORS
        this.app.use((req, res, next) => {

            res.header(
                "Access-Control-Allow-Origin",
                "http://localhost:5173"
            );

            res.header(
                "Access-Control-Allow-Credentials",
                "true"
            );

            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );

            res.header(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS"
            );

            next();

        });

    }


    // ==========================================
    // CONEXIÓN A MONGODB
    // ==========================================

    UsersDatabase() {

        mongoose.connect(
            'mongodb://localhost:27017/mayo2026_web_prof'
        )
        .then(() => {

            console.log("MongoDB conectado correctamente");

        })
        .catch((error) => {

            console.log(
                "Error conectando a MongoDB:",
                error
            );

        });


        const Schema = mongoose.Schema;


        const userSchema = new Schema({

            user: String,

            pass: String,

            rol: String

        });


        this.userModel =
            mongoose.model(
                'user',
                userSchema
            );

    }


    // ==========================================
    // RUTAS
    // ==========================================

    routes() {


        // ======================================
        // LOGIN
        // ======================================

        this.app.post(
            '/login',
            async (req, res) => {

                try {

                    const {
                        user,
                        pass
                    } = req.body;


                    // Buscar usuario

                    const consulta =
                        await this.userModel.find({
                            user: user
                        });


                    if (consulta.length === 0) {

                        return res.status(401).json({

                            mensaje:
                                "Usuario o contraseña incorrectos."

                        });

                    }


                    const usuario = consulta[0];


                    // Comparar contraseña

                    const passwordCorrecta =
                        bcrypt.compareSync(
                            pass,
                            usuario.pass
                        );


                    if (!passwordCorrecta) {

                        return res.status(401).json({

                            mensaje:
                                "Usuario o contraseña incorrectos."

                        });

                    }


                    // ==================================
                    // CREAR JWT
                    // ==================================

                    const userPayload = {

                        id: usuario._id,

                        user: usuario.user,

                        rol: usuario.rol

                    };


                    const token =
                        jwt.sign(
                            userPayload,
                            this.JWT_SECRET,
                            {
                                expiresIn: '2h'
                            }
                        );


                    // ==================================
                    // GUARDAR JWT EN COOKIE
                    // ==================================

                    res.cookie(
                        'token',
                        token,
                        {
                            httpOnly: true,

                            secure: false,

                            sameSite: 'lax',

                            maxAge:
                                2 * 60 * 60 * 1000
                        }
                    );


                    // ==================================
                    // RESPUESTA
                    // ==================================

                    return res.json({

                        mensaje:
                            "Autenticación exitosa.",

                        usuario: {

                            user:
                                usuario.user,

                            rol:
                                usuario.rol

                        }

                    });

                }
                catch (error) {

                    console.error(error);

                    res.status(500).json({

                        mensaje:
                            "Error en el servidor."

                    });

                }

            }
        );


        // ======================================
        // RUTA PARA VERIFICAR SESIÓN
        // ======================================

        this.app.get(
            '/verificar-sesion',
            this.verificarToken,
            (req, res) => {

                res.json({

                    autenticado: true,

                    usuario: req.user

                });

            }
        );


        // ======================================
        // RUTA SEGURA SOLO PARA ADMIN
        // ======================================

        this.app.get(
            '/admin',
            this.verificarToken,
            this.verificarAdmin,
            (req, res) => {

                res.json({

                    mensaje:
                        "Bienvenido al área exclusiva de administradores.",

                    usuario:
                        req.user.user,

                    rol:
                        req.user.rol

                });

            }
        );


        // ======================================
        // LOGOUT
        // ======================================

        this.app.post(
            '/logout',
            (req, res) => {

                res.clearCookie(
                    'token',
                    {
                        httpOnly: true,

                        secure: false,

                        sameSite: 'lax'
                    }
                );


                res.json({

                    mensaje:
                        "Sesión cerrada correctamente."

                });

            }
        );


        // ======================================
        // CONSULTAR USUARIOS
        // PROTEGIDA
        // ======================================

        this.app.get(
            '/consultarUsuarios',
            this.verificarToken,
            this.verificarAdmin,
            async (req, res) => {

                try {

                    const usuarios =
                        await this.userModel.find(
                            {},
                            {
                                pass: 0
                            }
                        );

                    res.json(usuarios);

                }
                catch (error) {

                    res.status(500).json({

                        mensaje:
                            "Error consultando usuarios."

                    });

                }

            }
        );


        // ======================================
        // REGISTRAR USUARIO
        // ======================================

        this.app.post(
            '/registrar',
            async (req, res) => {

                try {

                    const {
                        user,
                        pass,
                        rol
                    } = req.body;


                    if (
                        !user ||
                        !pass ||
                        !rol
                    ) {

                        return res.status(400).json({

                            mensaje:
                                "Todos los campos son obligatorios."

                        });

                    }


                    // Verificar si existe

                    const existe =
                        await this.userModel.findOne({
                            user: user
                        });


                    if (existe) {

                        return res.status(400).json({

                            mensaje:
                                "El usuario ya existe."

                        });

                    }


                    // Encriptar contraseña

                    const hash =
                        await bcrypt.hash(
                            pass,
                            10
                        );


                    // Crear usuario

                    const nuevoUsuario =
                        new this.userModel({

                            user: user,

                            pass: hash,

                            rol: rol

                        });


                    await nuevoUsuario.save();


                    res.json({

                        mensaje:
                            "Usuario creado correctamente.",

                        user: user,

                        rol: rol

                    });

                }
                catch (error) {

                    console.error(error);

                    res.status(500).json({

                        mensaje:
                            "Error al registrar usuario."

                    });

                }

            }
        );

    }


    // ==========================================
    // INICIAR SERVIDOR
    // ==========================================

    listen() {

        this.app.listen(
            this.port,
            () => {

                console.log(
                    "http://127.0.0.1:" +
                    this.port
                );

            }
        );

    }

}


module.exports = Server;