const express = require ('express');
const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.JWT_SECRET = "mi_clave_secreta_super_segura";
        
        this.middlewares();
        this.UsersDatabase();
        this.routes();
        this.listen();
    }
    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());
    }
    UsersDatabase(){
        mongoose.connect('mongodb://localhost:27017/celux');
        let Schema = mongoose.Schema;
        //Las claves y tipos de datos coinciden con la BD
        const userSchema = new Schema({
            usuario: {
                type: String,
                unique: true
            },
            correo: {
                type: String,
                unique: true
            },
            edad: Number,
            telefono: String,
            sexo: String,
            contrasena: String,
            rol: String
        });
        //Colección users
        this.userModel = mongoose.model('clientes', userSchema);
    }
    verificarToken(req, res, next) {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                mensaje: "Necesitas iniciar sesión para acceder a esta sección."
            });
        }

        try {

            const usuario = jwt.verify(
                token,
                this.JWT_SECRET
            );

            req.usuario = usuario;

            next();

        } catch (error) {

            return res.status(401).json({
                mensaje: "Tu sesión es inválida o ha expirado."
            });
        }
    }

    verificarAdministrador(req, res, next) {

        if (req.usuario.rol !== "Admin") {
            return res.status(403).json({
                mensaje: "No tienes permisos para acceder a esta sección."
            });
        }

        next();
    }

    routes(){
        this.app.post('/login', async(req, res) => {
        const { correo, contrasena } = req.body

        const consulta = await this.userModel.findOne({
            $or: [
                { correo: correo },
                { usuario: correo }
            ]
        })

        if (consulta) {

            if (bcrypt.compareSync(contrasena, consulta.contrasena)) {

                const userPayload = {
                    id: consulta._id,
                    usuario: consulta.usuario,
                    correo: consulta.correo,
                    rol: consulta.rol
                }

                const token = jwt.sign(
                    userPayload,
                    this.JWT_SECRET,
                    { expiresIn: '2h' }
                )

                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 2 * 60 * 60 * 1000
                })

                return res.json({
                    mensaje: "Autenticación exitosa"
                })
            }

            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos"
            })
        }

        return res.status(401).json({
            mensaje: "Usuario o contraseña incorrectos"
        })
    })
        this.app.get(
            '/consultarUsuarios',
            this.verificarToken.bind(this),
            this.verificarAdministrador.bind(this),
            async (req, res) => {
                try {
                    const usuarios = await this.userModel.find(
                        {},
                        {
                            contrasena: 0
                        }
                    );

                    res.json(usuarios);

                } catch (error) {
                    console.error("Error al consultar usuarios:", error);

                    res.status(500).json({
                        mensaje: "No fue posible consultar los usuarios."
                    });
                }
            }
        );
        this.app.post('/logout', (req, res) => {

            res.clearCookie('token');

            res.json({
                mensaje: "Sesión cerrada correctamente."
            });
        });
        this.app.post('/registrar', async(req, res) => {
            try {
                const {
                    usuario,
                    correo,
                    edad,
                    telefono,
                    sexo,
                    contrasena,
                    rol
                } = req.body;

                const errores = {};

                const usuarioExiste = await this.userModel.findOne({
                    usuario: usuario
                });

                const correoExiste = await this.userModel.findOne({
                    correo: correo
                });

                if (usuarioExiste) {
                    errores.usuario = "Este usuario ya está registrado.";
                }

                if (correoExiste) {
                    errores.correo = "Este correo electrónico ya está registrado.";
                }

                if (Object.keys(errores).length > 0) {
                    return res.status(409).json({
                        errores: errores
                    });
                }

                const hash = await bcrypt.hash(contrasena, 10);

                const newUser = new this.userModel({
                    usuario: usuario,
                    correo: correo,
                    edad: edad,
                    telefono: telefono,
                    sexo: sexo,
                    contrasena: hash,
                    rol: rol
                });

                const savedUser = await newUser.save();

                console.log("Usuario guardado:", savedUser);

                res.json({
                    mensaje: "OK"
                });

            } catch (error) {
                console.error("Error al registrar usuario:", error);

                res.status(500).json({
                    mensaje: "No fue posible registrar el usuario."
                });
            }
        });
        this.app.get(
            '/sesion',
            this.verificarToken.bind(this),
            (req, res) => {

                res.json({
                    autenticado: true,
                    usuario: {
                        id: req.usuario.id,
                        usuario: req.usuario.usuario,
                        correo: req.usuario.correo,
                        rol: req.usuario.rol
                    }
                })

            }
        )
        this.app.use((req, res) => {
            res.sendFile('index.html', { root: 'public' });
        });
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("http://localhost:" + this.port)
        })
    }
}

module.exports = Server;