const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

class Server {

    constructor() {

        this.app = express();

        this.port = process.env.PORT || 5000;

        this.JWT_SECRET =
            process.env.JWT_SECRET ||
            "mi_clave_secreta_super_segura";

        this.MONGO_URI =
            process.env.MONGO_URI ||
            'mongodb://localhost:27017/mayo2026_web_prof';

        this.ORIGENES_PERMITIDOS = [
            "http://localhost:5173",
            "http://127.0.0.1:5173"
        ];

        this.middlewares();

        this.UsersDatabase();

        this.routes();

        this.listen();

    }


    // ==========================================
    // VALIDAR JWT
    // ==========================================

    verificarToken = (req, res, next) => {

        let token = null;


        // ======================================
        // BUSCAR TOKEN EN COOKIE
        // ======================================

        if (
            req.cookies &&
            req.cookies.token
        ) {

            token = req.cookies.token;

        }


        // ======================================
        // BUSCAR TOKEN EN AUTHORIZATION
        // ======================================

        if (!token) {

            const authHeader =
                req.headers.authorization;

            if (
                authHeader &&
                authHeader.startsWith('Bearer ')
            ) {

                token =
                    authHeader.split(' ')[1];

            }

        }


        // ======================================
        // SI NO EXISTE TOKEN
        // ======================================

        if (!token) {

            return res.status(401).json({

                mensaje:
                    "No hay token. Debes iniciar sesión."

            });

        }


        // ======================================
        // VALIDAR TOKEN
        // ======================================

        jwt.verify(
            token,
            this.JWT_SECRET,
            (err, user) => {

                if (err) {

                    return res.status(403).json({

                        mensaje:
                            "Token inválido o expirado."

                    });

                }


                req.user = user;

                next();

            }
        );

    };


    // ==========================================
    // VALIDAR ADMIN
    // ==========================================

    verificarAdmin = (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({

                mensaje:
                    "Usuario no autenticado."

            });

        }


        const rol =
            String(
                req.user.rol || ""
            ).toLowerCase();


        if (rol !== "admin") {

            return res.status(403).json({

                mensaje:
                    "Acceso denegado. Solo administradores."

            });

        }


        next();

    };


    // ==========================================
    // MIDDLEWARES
    // ==========================================

    middlewares() {

        this.app.use(
            express.static('public')
        );


        this.app.use(
            express.json()
        );


        this.app.use(
            express.urlencoded({
                extended: true
            })
        );


        this.app.use(
            cookieParser()
        );


        // ======================================
        // CORS
        // ======================================

        this.app.use(
            (req, res, next) => {

                const origin =
                    req.headers.origin;


                if (
                    this.ORIGENES_PERMITIDOS
                        .includes(origin)
                ) {

                    res.header(
                        "Access-Control-Allow-Origin",
                        origin
                    );

                }
                else {

                    res.header(
                        "Access-Control-Allow-Origin",
                        this.ORIGENES_PERMITIDOS[0]
                    );

                }


                res.header(
                    "Access-Control-Allow-Credentials",
                    "true"
                );


                res.header(
                    "Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                );


                res.header(
                    "Access-Control-Allow-Methods",
                    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
                );


                res.header(
                    "Vary",
                    "Origin"
                );


                if (
                    req.method === "OPTIONS"
                ) {

                    return res.sendStatus(200);

                }


                next();

            }
        );

    }


    // ==========================================
    // MONGODB
    // ==========================================

    UsersDatabase() {

        mongoose.connect(
            this.MONGO_URI
        )

        .then(() => {

            console.log(
                "MongoDB conectado correctamente:",
                this.MONGO_URI
            );

        })

        .catch((error) => {

            console.log(
                "Error conectando a MongoDB:",
                error.message
            );

            console.log(
                "Revisa que MongoDB esté iniciado."
            );

        });


        const Schema =
            mongoose.Schema;


        const userSchema =
            new Schema({

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


                    // ==============================
                    // BUSCAR USUARIO
                    // ==============================

                    const consulta =
                        await this.userModel.find({
                            user: user
                        });


                    if (
                        consulta.length === 0
                    ) {

                        return res.status(401).json({

                            mensaje:
                                "Usuario o contraseña incorrectos."

                        });

                    }


                    const usuario =
                        consulta[0];


                    // ==============================
                    // COMPARAR PASSWORD
                    // ==============================

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


                    // ==============================
                    // PAYLOAD JWT
                    // ==============================

                    const userPayload = {

                        id:
                            usuario._id,

                        user:
                            usuario.user,

                        rol:
                            usuario.rol

                    };


                    // ==============================
                    // CREAR JWT
                    // ==============================

                    const token =
                        jwt.sign(
                            userPayload,
                            this.JWT_SECRET,
                            {
                                expiresIn: '2h'
                            }
                        );


                    console.log(
                        "JWT generado para:",
                        usuario.user
                    );


                    // ==============================
                    // COOKIE
                    // ==============================

                    res.cookie(
                        'token',
                        token,
                        {

                            httpOnly: true,

                            secure: false,

                            sameSite: 'lax',

                            maxAge:
                                2 *
                                60 *
                                60 *
                                1000

                        }
                    );


                    // ==============================
                    // RESPUESTA
                    // ==============================

                    return res.json({

                        mensaje:
                            "Autenticación exitosa.",


                        // IMPORTANTE:
                        // Enviamos el JWT
                        // al frontend.

                        token:
                            token,


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

                    return res.status(500).json({

                        mensaje:
                            "Error en el servidor."

                    });

                }

            }
        );


        // ======================================
        // VERIFICAR SESIÓN
        // ======================================

        this.app.get(
            '/verificar-sesion',
            this.verificarToken,
            (req, res) => {

                res.json({

                    autenticado:
                        true,

                    usuario:
                        req.user

                });

            }
        );


        // ======================================
        // RUTA SOLO ADMIN
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
        // SOLO ADMIN
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


                    res.json(
                        usuarios
                    );

                }

                catch (error) {

                    console.error(error);

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


                    // ==============================
                    // VERIFICAR EXISTENCIA
                    // ==============================

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


                    // ==============================
                    // ENCRIPTAR PASSWORD
                    // ==============================

                    const hash =
                        await bcrypt.hash(
                            pass,
                            10
                        );


                    // ==============================
                    // CREAR USUARIO
                    // ==============================

                    const nuevoUsuario =
                        new this.userModel({

                            user:
                                user,

                            pass:
                                hash,

                            rol:
                                rol

                        });


                    await nuevoUsuario.save();


                    res.json({

                        mensaje:
                            "Usuario creado correctamente.",

                        user:
                            user,

                        rol:
                            rol

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
                    "Servidor ejecutándose en:"
                );

                console.log(
                    "http://127.0.0.1:" +
                    this.port
                );

            }
        );

    }

}


module.exports = Server;