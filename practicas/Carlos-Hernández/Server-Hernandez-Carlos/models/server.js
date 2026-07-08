const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
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
        this.app.get('/consultarUsuarios', (req, res) => {
            res.json({
                user: 'Juan',
                pass: '12345',
                rol: 'admin'
            });
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
                        console.log('Usuario guardado:', savedUser);
                        res.status(201).json({
                            mensaje: "Usuario registrado correctamente"
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