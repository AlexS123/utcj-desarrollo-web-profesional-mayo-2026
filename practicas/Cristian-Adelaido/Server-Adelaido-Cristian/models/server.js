const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.JWT_SECRET = "mi_clave_secreta_super_segura"; // Guardar siempre en variables de entorno (.env)
        
        this.middlewares();
        this.UsersDatabase();
        this.routes();
        this.listen();
    }

    // Verifica que el usuario tenga un token para acceder a una ruta protegida
    verificarToken(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        // Si no existe token, significa que el usuario no ha iniciado sesión
        if(!token) {
            return res.status(403).json({
                mensaje: "Necesitas iniciar sesión para acceder"
            });
        }

        // Verifica que el token sea válido y que no haya expirado
        jwt.verify(token, this.JWT_SECRET, (err, user) =>{
            if (err) {
                return res.status(403).json({
                    mensaje: "Token invalido o expirado"
                });
            }

            // Guarda los datos contenidos en el token
            req.user = user;

            // Permite continuar con la ruta
            next();
        });
    }

    // Verifica que el usuario que inició sesión sea administrador
    verificarAdmin(req, res, next){

        if(req.user.role !== 'admin'){
            return res.status(403).json({
                mensaje: "Necesitas permisos de administrador para acceder"
            });
        }

        next();
    }

    middlewares(){
        // Permite utilizar los archivos del frontend
        this.app.use(express.static('public'));

        // Permite recibir información JSON
        this.app.use(express.json());

        // Permite recibir información enviada desde formularios
        this.app.use(express.urlencoded({extended: true}));
    }

    UsersDatabase(){
        // Conexión con MongoDB
        mongoose.connect('mongodb://localhost:27017/Mayo2026_web_prof');

        let Schema = mongoose.Schema;

        // Las claves y tipos de datos coinciden con la BD
        const userSchema = new Schema({
            user: String,
            pass: String,
            rol: String
        });

        // Colección usuario singular de usuarios.
        this.userModel = mongoose.model('user', userSchema);
    }

    routes(){

        // =====================================================
        // RUTA PARA INICIAR SESIÓN
        // =====================================================
        this.app.post('/login', async(req, res) => {

            const { username, password } = req.body;

            // Se busca el usuario registrado en MongoDB
            let consulta = await this.userModel.find({user: username});

            if(consulta.length > 0){

                // Compara la contraseña ingresada con la contraseña cifrada
                if(bcrypt.compareSync(password, consulta[0].pass)){

                    // Datos que se guardarán dentro del JWT
                    const userPayload = {
                        id: consulta[0]._id,
                        username: consulta[0].user,

                        // Se obtiene el rol real guardado en MongoDB
                        role: consulta[0].rol
                    };

                    // Generar el Token (Expira en 2 horas)
                    const token = jwt.sign(
                        userPayload,
                        this.JWT_SECRET,
                        { expiresIn: '2h' }
                    );

                    // Se manda el token, usuario y rol al frontend
                    return res.json({
                        mensaje: "Autenticación exitosa",
                        token: token,
                        usuario: consulta[0].user,
                        rol: consulta[0].rol
                    });
                }

                return res.status(401).json({
                    mensaje: "Usuario o contraseña incorrectos"
                });
            }

            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos"
            });
        });


        // =====================================================
        // RUTA PARA CONSULTAR USUARIOS
        // =====================================================
        this.app.get(
            '/consultarUsuarios',

            // Primero verifica el token
            this.verificarToken.bind(this),

            // Después verifica que el usuario sea administrador
            this.verificarAdmin.bind(this),

            async(req, res) => {

                try{

                    // Consulta todos los usuarios registrados en MongoDB
                    let consulta = await this.userModel.find();

                    // Regresa los registros en formato JSON
                    res.json(consulta);

                }catch(err){

                    res.status(500).json({
                        mensaje: "Error al consultar usuarios",
                        error: err.message
                    });
                }
            }
        );


        // =====================================================
        // RUTA PARA REGISTRAR USUARIOS
        // =====================================================
        this.app.post('/registrar', async (req, res) => {
            try {

                let { user, pass, rol } = req.body;

                console.log(`Usuario: ${user}, Rol: ${rol}`);

                // Número de rondas utilizadas por bcrypt
                const saltRounds = 10;

                // Se cifra la contraseña
                const hash = await bcrypt.hash(pass, saltRounds);

                console.log('Contraseña cifrada:', hash);

                // Se crea el usuario utilizando el modelo de MongoDB
                const newUser = new this.userModel({
                    user: user,
                    pass: hash,
                    rol: rol
                });

                // Se guarda el usuario en MongoDB
                const savedUser = await newUser.save();

                console.log("Usuario guardado:", savedUser);

                res.status(200).json({
                    ok: true,
                    user: savedUser
                });

            } catch (err) {

                console.error('Error al registrar usuario:', err);

                res.status(500).json({
                    ok: false,
                    error: err.message
                });
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