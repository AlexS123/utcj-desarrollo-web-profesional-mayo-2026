const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Requerido para conectar React con Node.js

class Server {
    constructor() {
        this.app = express();
        // Definimos un puerto por defecto (ej. 5000) si process.env.PORT no está definido
        this.port = process.env.PORT || 5000; 
        
        this.middlewares();
        this.UsersDatabase();
        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(cors()); // Habilita peticiones cruzadas desde el frontend (React)
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    UsersDatabase() {
        // Corregido a la base de datos 'dentista' como se muestra en tu Compass
        mongoose.connect('mongodb://localhost:27017/dentista')
            .then(() => console.log('Conectado exitosamente a MongoDB (Base de datos: dentista)'))
            .catch(err => console.error('Error al conectar a MongoDB:', err));

        let Schema = mongoose.Schema;
        
        // Las claves y tipos de datos coinciden exactamente con tu formulario de React
        const userSchema = new Schema({
            nombre: { type: String, required: true },
            edad: { type: Number, required: true },
            servicio: { type: String, required: true },
            horario: { type: String, required: true },
            terminos: { type: Boolean, required: true }
        }, { timestamps: true }); // Guarda la fecha de creación automáticamente

        // Colección 'users' dentro de la base de datos 'dentista'
        this.userModel = mongoose.model('users', userSchema);
    }

    routes() {
        // Ruta para registrar los datos del formulario de React
        this.app.post('/registrar', async (req, res) => {
            try {
                const { nombre, edad, servicio, horario, terminos } = req.body;
                console.log("Datos recibidos:", nombre, edad, servicio, horario, terminos);

                // Crear el nuevo documento con los datos recibidos del formulario
                const newUser = new this.userModel({
                    nombre,
                    edad,
                    servicio,
                    horario,
                    terminos
                });  

                const savedUser = await newUser.save();
                console.log("Cita/Usuario guardado en la BD:", savedUser); 
                
                // Responder al frontend que la operación fue exitosa
                res.status(201).json({ status: "OK", message: "Registro guardado con éxito", data: savedUser });
            } catch (error) {
                console.error("Error al registrar:", error);
                res.status(500).json({ status: "ERROR", message: "No se pudo guardar en la base de datos" });
            }
        });        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en: http://localhost:" + this.port);
        });
    }
}

module.exports = Server;