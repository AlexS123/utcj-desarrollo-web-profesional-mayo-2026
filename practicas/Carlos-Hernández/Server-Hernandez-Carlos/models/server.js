const express = require('express');
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
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    UsersDatabase() {
        mongoose.connect('mongodb://localhost:27017/DesarrolloWeb');
        let Schema = mongoose.Schema;
        // Definición del esquema de usuario
        const userSchema = new Schema({
            user: String,
            pass: String,
            rol: String
        });
        // Colección de usuarios
        this.userModel = mongoose.model('user', userSchema);
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
            let {user, pass, rol} = req.body;
            console.log(user, pass, rol);
            //Cifrar la contraseña
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    return;
                }
                // Proceder a hashear la contraseña con el salt generado
                bcrypt.hash(pass, salt, async (err, hash) => {
                    if (err) {
                        // Manejar el error de hash
                        return;
                    }
                    // Mostrar el hash generado en la consola
                    console.log('Contraseña cifrada:', hash);
                    // Guardar el hash en la base de datos
                    const newUser = new this.userModel({
                        user: user,
                        pass: hash,
                        rol: rol
                    });
                    const savedUser = await newUser.save();
                    console.log('Usuario guardado:', savedUser);
                });
            });
            res.send("OK");
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("http://127.0.0.1:" + this.port);
        });
    }
}
module.exports = Server;