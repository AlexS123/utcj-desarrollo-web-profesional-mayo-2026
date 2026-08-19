const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const {
    verificarToken,
    verificarAdministrador
} = require('../middleware/authMiddleware');


class Server {

    constructor() {

        this.app = express();

        this.port =
            process.env.PORT || 5000;

        this.mongoUri =
            process.env.MONGO_URI ||
            'mongodb://127.0.0.1:27017/dentista';

        this.jwtSecret =
            process.env.JWT_SECRET ||
            'clave_temporal';

        this.middlewares();

        this.UsersDatabase();

        this.routes();

        this.manejarErrores();

        this.listen();
    }


    // =====================================================
    // MIDDLEWARES
    // =====================================================

    middlewares() {

        this.app.use(
            cors({
                origin:
                    process.env.FRONTEND_URL ||
                    'http://localhost:5173',

                credentials: true
            })
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


        this.app.use(
            express.static('public')
        );
    }


    // =====================================================
    // MONGODB
    // =====================================================

    UsersDatabase() {

        const Schema =
            mongoose.Schema;


        const userSchema =
            new Schema(
                {

                    nombre: {
                        type: String,
                        required: true,
                        unique: true,
                        trim: true
                    },

                    edad: {
                        type: Number,
                        required: true,
                        min: 1,
                        max: 120
                    },

                    pass: {
                        type: String,
                        required: true
                    },

                    rol: {
                        type: String,
                        enum: [
                            'general',
                            'administrator'
                        ],
                        default: 'general'
                    }

                },
                {
                    timestamps: true
                }
            );


        this.userModel =
            mongoose.model(
                'users',
                userSchema
            );


        mongoose
            .connect(this.mongoUri)
            .then(() => {

                console.log(
                    '================================'
                );

                console.log(
                    'MongoDB conectado correctamente'
                );

                console.log(
                    'Base de datos: dentista'
                );

                console.log(
                    '================================'
                );

            })
            .catch((error) => {

                console.error(
                    'Error al conectar MongoDB:',
                    error.message
                );
            });
    }


    // =====================================================
    // RUTAS
    // =====================================================

    routes() {



        this.app.post(
            '/login',
            async (req, res) => {

                try {

                    const username =
                        (
                            req.body.username ||
                            ''
                        ).trim();


                    const password =
                        req.body.password ||
                        '';


                    if (
                        !username ||
                        !password
                    ) {

                        return res.status(400).json({

                            mensaje:
                                'Usuario y contraseña son obligatorios'
                        });
                    }


                    const usuario =
                        await this.userModel.findOne({
                            nombre: username
                        });


                    if (!usuario) {

                        return res.status(401).json({

                            mensaje:
                                'Usuario o contraseña incorrectos'
                        });
                    }


                    const passwordValida =
                        await bcrypt.compare(
                            password,
                            usuario.pass
                        );


                    if (!passwordValida) {

                        return res.status(401).json({

                            mensaje:
                                'Usuario o contraseña incorrectos'
                        });
                    }


                    const payload = {

                        id:
                            usuario._id.toString(),

                        username:
                            usuario.nombre,

                        role:
                            usuario.rol
                    };


                    // =====================================
                    // CREAR JWT
                    // =====================================

                    const token =
                        jwt.sign(
                            payload,
                            this.jwtSecret,
                            {
                                expiresIn: '2h'
                            }
                        );


                    // =====================================
                    // COOKIE
                    // =====================================

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


                    return res.json({

                        mensaje:
                            'Autenticación exitosa',

                        username:
                            usuario.nombre,

                        role:
                            usuario.rol
                    });

                } catch (error) {

                    console.error(
                        'Error en /login:',
                        error
                    );

                    return res.status(500).json({

                        mensaje:
                            'Error interno del servidor'
                    });
                }
            }
        );


        this.app.post(
            '/registrar',
            async (req, res) => {

                try {

                    const nombre =
                        (
                            req.body.nombre ||
                            ''
                        ).trim();


                    const edad =
                        Number(req.body.edad);


                    const pass =
                        req.body.pass ||
                        '';


                    if (
                        !nombre ||
                        !edad ||
                        !pass
                    ) {

                        return res.status(400).json({

                            mensaje:
                                'Nombre, edad y contraseña son obligatorios'
                        });
                    }


                    if (
                        edad < 1 ||
                        edad > 120
                    ) {

                        return res.status(400).json({

                            mensaje:
                                'La edad no es válida'
                        });
                    }


                    if (pass.length < 6) {

                        return res.status(400).json({

                            mensaje:
                                'La contraseña debe tener al menos 6 caracteres'
                        });
                    }



                    const existente =
                        await this.userModel.findOne({
                            nombre
                        });


                    if (existente) {

                        return res.status(409).json({

                            mensaje:
                                'Ese usuario ya está registrado'
                        });
                    }

                    // ENCRIPTAR PASSWORD

                    const passwordHash =
                        await bcrypt.hash(
                            pass,
                            10
                        );



                    const nuevoUsuario =
                        new this.userModel({

                            nombre,

                            edad,

                            pass:
                                passwordHash,

                            rol:
                                'general'
                        });


                    await nuevoUsuario.save();


                    return res.status(201).json({

                        mensaje:
                            'Usuario registrado correctamente',

                        data: {

                            nombre,

                            edad,

                            rol:
                                'general'
                        }
                    });

                } catch (error) {

                    console.error(
                        'Error en /registrar:',
                        error
                    );


                    if (
                        error.code === 11000
                    ) {

                        return res.status(409).json({

                            mensaje:
                                'Ese usuario ya está registrado'
                        });
                    }


                    return res.status(500).json({

                        mensaje:
                            'Error del servidor'
                    });
                }
            }
        );


  
        // SESIÓN


        this.app.get(
            '/sesion',
            verificarToken,
            (req, res) => {

                return res.json({

                    autenticado:
                        true,

                    usuario:
                        req.usuario
                });
            }
        );

        // PERFIL

        this.app.get(
            '/perfil',
            verificarToken,
            (req, res) => {

                return res.json({

                    mensaje:
                        'Acceso concedido',

                    usuario:
                        req.usuario
                });
            }
        );

        // CONSULTAR USUARIOS
        // SOLO ADMIN

        this.app.get(
            '/consultarUsuarios',

            verificarToken,

            verificarAdministrador,

            async (req, res) => {

                try {

                    const usuarios =
                        await this.userModel
                            .find(
                                {},
                                '-pass'
                            )
                            .sort({
                                createdAt: -1
                            });


                    return res.json({
                        usuarios
                    });

                } catch (error) {

                    console.error(
                        'Error al consultar usuarios:',
                        error
                    );

                    return res.status(500).json({

                        mensaje:
                            'Error al obtener usuarios'
                    });
                }
            }
        );

        // CAMBIAR ROL
        // SOLO ADMIN

        this.app.put(
            '/usuarios/:id/rol',

            verificarToken,

            verificarAdministrador,

            async (req, res) => {

                try {

                    const {
                        rol
                    } = req.body;


                    if (
                        ![
                            'general',
                            'administrator'
                        ].includes(rol)
                    ) {

                        return res.status(400).json({

                            mensaje:
                                'Rol no válido'
                        });
                    }


                    const usuario =
                        await this.userModel.findByIdAndUpdate(

                            req.params.id,

                            {
                                rol
                            },

                            {
                                new: true
                            }
                        );


                    if (!usuario) {

                        return res.status(404).json({

                            mensaje:
                                'Usuario no encontrado'
                        });
                    }


                    return res.json({

                        mensaje:
                            'Rol actualizado correctamente',

                        usuario: {

                            id:
                                usuario._id,

                            nombre:
                                usuario.nombre,

                            rol:
                                usuario.rol
                        }
                    });

                } catch (error) {

                    console.error(error);

                    return res.status(500).json({

                        mensaje:
                            'Error al actualizar el rol'
                    });
                }
            }
        );


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


                return res.json({

                    mensaje:
                        'Sesión cerrada correctamente'
                });
            }
        );

    
        // RUTA DE PRUEBA

        this.app.get(
            '/api',
            (req, res) => {

                res.json({

                    mensaje:
                        'API de SmileCare funcionando correctamente'
                });
            }
        );
    }

    // ERRORES

    manejarErrores() {

        this.app.use(
            (err, req, res, next) => {

                console.error(
                    'Error no controlado:',
                    err
                );


                return res.status(500).json({

                    mensaje:
                        'Error interno del servidor'
                });
            }
        );
    }

    // SERVIDOR

    listen() {

        this.app.listen(
            this.port,
            () => {

                console.log(
                    `Servidor corriendo en http://localhost:${this.port}`
                );
            }
        );
    }
}


module.exports = Server;