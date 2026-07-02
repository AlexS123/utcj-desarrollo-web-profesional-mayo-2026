const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.middlewares(); // ✅ Must go before routes()
        this.routes();
        this.listen();
        this.usersDatabase();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
    }

    usersDatabase() {
    mongoose.connect('mongodb://localhost:27017/Mayo2026_web_prof');
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
                user: 'Aaron', // 
                pass: '12345',
                rol: 'admin'
            });
        });
        this.app.post('/registrar', async (req, res) => {
            let {user, pass, rol} = req.body;
            console.log(`Usuario: ${user}, Contraseña: ${pass}, Rol: ${rol}`);
            //cifrar contrasena
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err){
                    return;
                }

            });
            //Guardar en la db
            const newUser = new this.userModel({
                 user: user,
                    pass: pass,
                    rol: rol
                
                });
                const savedUser = await newUser.save();
                console.log(savedUser);
                res.send(200);

            res.status(200).json({
                msg: 'Usuario registrado correctamente',
                user,
                pass,
                rol
            });
        });
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;