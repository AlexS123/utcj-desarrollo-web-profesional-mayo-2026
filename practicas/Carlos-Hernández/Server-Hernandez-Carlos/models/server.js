const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {verificarToken, verificarAdministrador} = require('../middleware/authMiddleware');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.JWT_SECRET = process.env.JWT_SECRET;
        
        this.middlewares();
        this.routes();
        this.listen();
        this.UsersDatabase();
    }
    middlewares() {
        this.app.use(cors({
            origin: "http://localhost:5173"
        }));
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    UsersDatabase() {
        mongoose.connect('mongodb://localhost:27017/Agencia_Viajes');
        //mongoose.connect('mongodb://localhost:27017/DesarrolloWeb');
        let Schema = mongoose.Schema;
        // Definición del esquema de usuario
        const userSchema = new Schema({
            nombre: String,
            fechaNacimiento: Date,
            correo: String,
            password: String,
            telefono: String,
            genero: String,
            rol: {
                type: String,
                default: "pasajero"
            }
        });
        /*const userSchema = new Schema({
            user: String,
            pass: String,
            rol: String
        });*/
        // Colección de usuarios
        this.userModel = mongoose.model('Usuario', userSchema);
        //this.userModel = mongoose.model('user', userSchema);
    }
    routes() {
        this.app.post('/login', async (req, res) => {

            const { email, password } = req.body;

            try {
                //Validación simulada de usuario (En producción usar Base de Datos + Bcrypt)
                let consulta = await this.userModel.find({ correo: email });
                if (consulta.length > 0) {
                    if (bcrypt.compareSync(password, consulta[0].password)) {
                        //console.log(consulta);
                        
                        // Datos que se guardarán dentro del JWT
                        const userPayload = {
                            id: consulta[0]._id,
                            nombre: consulta[0].nombre,
                            correo: consulta[0].correo,
                            rol: consulta[0].rol
                        };
                        // 2. Generar el Token (Expira en 2 horas)
                        const token = jwt.sign(userPayload, this.JWT_SECRET, {
                            expiresIn: '2h'
                        });
                
                        return res.json({
                            mensaje: "Autenticación exitosa",
                            token: token
                        });
                    }
                    return res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
                }
                return res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
            } catch (error) {
                console.error(error);

                res.status(500).json({
                    mensaje: "Error del servidor"
                });
            }
        });
        this.app.put('/cambiarRol/:id',verificarToken,verificarAdministrador,async (req, res) => {

            try {

                const { id } = req.params;
                const { rol } = req.body;

                if (!["pasajero", "admin"].includes(rol)) {

                    return res.status(400).json({
                        mensaje: "El rol debe ser pasajero o admin."
                    });

                }

                const usuario = await this.userModel.findByIdAndUpdate(
                    id,
                    { rol: rol },
                    { returnDocument: 'after' }
                ).select("-password");

                if (!usuario) {

                    return res.status(404).json({
                        mensaje: "Usuario no encontrado."
                    });

                }

                res.json({
                    mensaje: "Rol actualizado correctamente.",
                    usuario: usuario
                });

            } catch (error) {

                console.error("Error al cambiar el rol:", error);

                res.status(500).json({
                    mensaje: "Error del servidor."
                });
            }
        });
        this.app.get('/consultarUsuarios', verificarToken, verificarAdministrador, async (req, res) => {
            try {
                const usuarios = await this.userModel.find(
                    {},
                    {
                        password: 0
                    }
                );

                res.json(usuarios);

            } catch (error) {

                console.error('Error al consultar usuarios:', error);

                res.status(500).json({
                    mensaje: 'Error al consultar los usuarios'
                });
            }
        });
        this.app.post('/registrar', async (req, res) => {
            try {
                let { nombre, fechaNacimiento, email, password, telefono, genero } = req.body;
                //let { user, pass, rol} = req.body;
                //console.log (nombre, fechaNacimiento, email, password, telefono, genero);
                console.log(`Solicitud de registro recibida para: ${email}`);
                //console.log(user, pass, rol);
                //Cifrar la contraseña
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        return;
                    }
                    // Proceder a hashear la contraseña con el salt generado
                    bcrypt.hash(password, salt, async (err, hash) => {
                        if (err) {
                            // Manejar el error de hash
                            return;
                        }
                        // Mostrar el hash generado en la consola
                        //console.log('Contraseña cifrada:', hash);
                        const errores = {};
                        const usuarioExiste = await this.userModel.findOne({
                            correo: email
                        });
                        if (usuarioExiste) {
                            errores.email = "El correo electrónico ya está registrado.";
                        }
                        const telefonoExiste = await this.userModel.findOne({
                            telefono: telefono
                        });
                        if (telefonoExiste) {
                            errores.telefono = "Ya existe una cuenta asociada a este número de teléfono.";
                        }
                        if (Object.keys(errores).length > 0) {
                            return res.status(409).json({ errores });
                        }
                        // Guardar el hash en la base de datos
                        const newUser = new this.userModel({
                            nombre,
                            fechaNacimiento,
                            correo: email,
                            password: hash,
                            telefono,
                            genero,
                            rol: "pasajero"
                        });
                        /*const newUser = new this.userModel({
                            user: user,
                            pass: hash,
                            rol: rol
                        });*/
                        const savedUser = await newUser.save();

                        const userPayload = {
                            id: savedUser._id,
                            nombre: savedUser.nombre,
                            correo: savedUser.correo,
                            rol: savedUser.rol
                        };

                        const token = jwt.sign(userPayload, this.JWT_SECRET, {
                            expiresIn: '2h'
                        });

                        res.status(201).json({
                            mensaje: "Usuario registrado correctamente",
                            token: token
                        });
                    });
                });
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                res.status(500).send("Error al registrar el usuario");
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("http://127.0.0.1:" + this.port);
        });
    }
}
module.exports = Server;