const express = require ('express');
const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.JWT_SECRET = "mi_clave_secreta_super_segura";
        
        this.middlewares();
        this.routes();
        this.listen();
        this.UsersDatabase();
    }
    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }
    UsersDatabase(){
        mongoose.connect('mongodb://localhost:27017/celux');
        let Schema = mongoose.Schema;
        //Las claves y tipos de datos coinciden con la BD
        const userSchema = new Schema({
            correo: String,
            edad: Number,
            telefono: String,
            sexo: String,
            contrasena: String,
        });
        //Colección users
        this.userModel = mongoose.model('clientes', userSchema);
    }
    routes(){
        this.app.post('/login', async(req, res) => {
            const { correo, contrasena } = req.body;
            // Validación simulada de usuario (En producción usar Base de Datos + Bcrypt)
            let consulta = await this.userModel.find({correo: correo});
            if (consulta.length > 0) {
                if(bcrypt.compareSync(contrasena, consulta[0].contrasena)){
                    // Datos que se guardarán dentro del JWT
                    const userPayload = {
                        id: consulta[0]._id,
                        correo: consulta[0].correo
                    };

                    // 2. Generar el Token (Expira en 2 horas)
                    const token = jwt.sign(userPayload, this.JWT_SECRET, { expiresIn: '2h' });

                    return res.json({
                        mensaje: "Autenticación exitosa",
                        token: token
                    });
                }
                return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
            }
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        });
        this.app.get('/consultarUsuarios', (req, res) => {
            res.json({
                user: "Cabrales",
                pass: "23",
                rol: "Admin",
            });
        });
        this.app.post('/registrar', async(req, res) => {
            let {correo, edad, telefono, sexo, contrasena} = req.body;

            console.log(correo, edad, telefono, sexo, contrasena);
            //Cifrar contraseña
            const saltRounds = 10; //Variable para algrotimo de cifrado (entre más grande, más segura, pero ocupa más recursos)
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    return;
                }
             
                bcrypt.hash(contrasena, salt, async (err, hash) => {
                    if (err) {
                        //Handle error
                        return;
                    }
                    //Guardar en la BD
                    console.log("Hashed password: " , hash);
                    const newUser = new this.userModel({
                        correo: correo,
                        edad: edad,
                        telefono: telefono,
                        sexo: sexo,
                        contrasena: hash
                    });  
                    const savedUser = await newUser.save();
                    console.log("Usuario guradado", savedUser); 
                });
            });
            res.send("OK");
        });        
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("http://127.0.0.1:" + this.port)
        })
    }
}

module.exports = Server;