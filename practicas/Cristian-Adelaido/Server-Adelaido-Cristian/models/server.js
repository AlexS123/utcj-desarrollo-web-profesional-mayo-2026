const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT   
        this.JWT_SECRET = "mi_clave_secreta_super_segura"; // Guardar siempre en variables de entorno (.env)
        
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
        mongoose.connect('mongodb://localhost:27017/Mayo2026_web_prof');
        let Schema = mongoose.Schema;
        //Las claves y tipos de datos coinciden con la BD
        const userSchema = new Schema({
            user: String,
            pass: String,
            rol: String
        });
        //Colección usuario singular de usuarios.
        this.userModel = mongoose.model('user', userSchema);
    }
    routes(){
        this.app.post('/login', async(req, res) => {
            const { username, password } = req.body;
            // Validación simulada de usuario (En producción usar Base de Datos + Bcrypt)
            let consulta = await this.userModel.find({user: username});
            if(consulta.length > 0){
                if(bcrypt.compareSync(password, consulta[0].pass)){
                //console.log(consulta);
        
                    // Datos que se guardarán dentro del JWT
                    const userPayload = {
                        id: 1,
                        username: username,
                        role: "administrator"
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
                user: 'Cristian',
                pass: '12345',
                rol: 'admin'
            });
        });

        this.app.post('/registrar', async (req, res) => {
            try {
                let { user, pass, rol } = req.body;
                console.log(`Usuario: ${user}, Rol: ${rol}`);

                const saltRounds = 10;
                const hash = await bcrypt.hash(pass, saltRounds);
                console.log('Contraseña cifrada:', hash);

                const newUser = new this.userModel({
                    user: user,
                    pass: hash,
                    rol: rol
                });

                const savedUser = await newUser.save();
                console.log("Usuario guardado:", savedUser);

                res.status(200).json({ ok: true, user: savedUser });
            } catch (err) {
                console.error('Error al registrar usuario:', err);
                res.status(500).json({ ok: false, error: err.message });
            }
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;