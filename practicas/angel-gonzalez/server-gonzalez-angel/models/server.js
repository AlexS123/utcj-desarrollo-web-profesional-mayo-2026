const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;

        this.middlewares();
        this.usersDatabase();
        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(cors({
            origin: [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:5000",
                "http://127.0.0.1:5000"
            ],
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            credentials: true
        }));

        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
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

    routes() {
      this.app.post('/login', (req, res) => {
                  const { username, password } = req.body;
                  // Validación simulada de usuario (En producción usar Base de Datos + Bcrypt)
                  let consulta = await this.userModel.find({user: username});
                  if (username === "admin" && password === "123456") {
                        //console.log
                      // Datos que se guardarán dentro del JWT
                      const userPayload = {
                          id: 1,
                          username: username,
                          role: "administrator"
                      };
      
                      // 2. Generar el Token (Expira en 2 horas)
                      const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '2h' });
      
                      return res.json({
                          mensaje: "Autenticación exitosa",
                          token: token
                      });
                  }
      
                  return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
              });

        this.app.get('/consultarUsuarios', (req, res) => {
            res.json({
                user: 'angel',
                pass: '12345',
                rol: 'admin'
            });
        });

        this.app.post('/registrar', async (req, res) => {

            try {

                const { user, pass, rol } = req.body;

                console.log("Datos recibidos:");
                console.log(req.body);

                const hash = await bcrypt.hash(pass, 10);

                const newUser = new this.userModel({
                    user,
                    pass: hash,
                    rol
                });

                const savedUser = await newUser.save();

                console.log("Usuario guardado correctamente");

                res.status(200).json({
                    ok: true,
                    message: "Usuario registrado",
                    user: savedUser
                });

            } catch (err) {

                console.log(err);

                res.status(500).json({
                    ok: false,
                    error: err.message
                });

            }

        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;