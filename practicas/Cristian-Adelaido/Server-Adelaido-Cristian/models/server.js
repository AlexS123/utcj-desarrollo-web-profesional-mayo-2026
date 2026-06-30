const express = require('express');
const mongoose = require('mongoose')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.port

        this.middlewares();
        this.routes();
        this.listen();
        this.Userdatabase();

    }
    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }
    Userdatabase(){
            // conexion con la app con el locar de la conexion de la base, nombre de la base //
        mongoose.connect('mongodb://localhost:27017/Mayo2026_web_prof' );
        let Schema = mongoose.Schema;
        //deben coincidir con la base de datos que se creo//
        const userSchema = new Schema({
            user: String,
            pass: String,
            rol: String
        });
        this.userModel = mongoose.model('user', userSchema)
                            //se debe de poner el nombre en singular ejemplo: users debe ser user//
    }
    routes(){
        this.app.get('/consultarUsuarios', (req, res) => {
            res.json({
                user: 'Alex',
                pass:'12345',
                rol:'adm'
            });
        });
        this.app.post('/registrar', async(req, res) =>{
            let{user, pass, rol} = req.body;
            console.log(user, pass, rol);
            //madandamos a registrar la base de datos//
            const newUser = new this.userModel({
                user: user,
                pass: pass,
                rol: rol
            });  //para el await se debe agregar la palabra async
            const savedUser = await newUser.save();
            console.log(savedUser);
            res.send(200);
        });
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("http://127.0.0.1:"+this.port);
        })
    }
}
module.exports = Server;