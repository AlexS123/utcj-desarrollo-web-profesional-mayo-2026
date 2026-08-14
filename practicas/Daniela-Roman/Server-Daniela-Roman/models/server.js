const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./User');
const Contacto = require('./Contacto');
const { verificarToken, verificarAdministrador } = require('../middleware/authMiddleware');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.JWT_SECRET = process.env.JWT_SECRET;

        this.conectarDB();
        this.middlewares();
        this.routes();
        this.listen();
    }

    async conectarDB() {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Conectado a MongoDB');
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
        }
    }

    middlewares() {
        this.app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(express.static('public'));
    }

    generarPayload(usuario) {
        return {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };
    }

    enviarCookie(res, token) {
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000
        });
    }

    routes() {
        // POST - Registrar usuario
        this.app.post('/registrar', async (req, res) => {
            try {
                const { nombre, email, password } = req.body;
                const errores = {};

                if (!nombre || nombre.trim().length < 3) {
                    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
                }
                if (!password || password.length < 6) {
                    errores.password = 'La contraseña debe tener al menos 6 caracteres';
                }

                const usuarioExiste = await User.findOne({ email });
                if (usuarioExiste) {
                    errores.email = 'Ya existe una cuenta con este correo';
                }

                if (Object.keys(errores).length > 0) {
                    return res.status(409).json({ errores });
                }

                const salt = await bcrypt.genSalt(10);
                const passCifrada = await bcrypt.hash(password, salt);

                const nuevoUsuario = new User({ nombre, email, password: passCifrada, rol: 'viajero' });
                await nuevoUsuario.save();

                const usuarioPayload = this.generarPayload(nuevoUsuario);
                const token = jwt.sign(usuarioPayload, this.JWT_SECRET, { expiresIn: '2h' });
                this.enviarCookie(res, token);

                res.status(201).json({
                    mensaje: '¡Cuenta creada correctamente!',
                    usuario: usuarioPayload
                });
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                res.status(500).json({ mensaje: 'Error al registrar el usuario' });
            }
        });

        // POST - Login
        this.app.post('/login', async (req, res) => {
            try {
                const { email, password } = req.body;
                const usuario = await User.findOne({ email });

                if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
                    return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
                }

                const usuarioPayload = this.generarPayload(usuario);
                const token = jwt.sign(usuarioPayload, this.JWT_SECRET, { expiresIn: '2h' });
                this.enviarCookie(res, token);

                res.json({ mensaje: 'Autenticación exitosa', usuario: usuarioPayload });
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                res.status(500).json({ mensaje: 'Error del servidor' });
            }
        });

        // GET - Verificar sesión
        this.app.get('/sesion', verificarToken, (req, res) => {
            res.json({ autenticado: true, usuario: req.usuario });
        });

        // POST - Logout
        this.app.post('/logout', (req, res) => {
            res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'lax' });
            res.json({ mensaje: 'Sesión cerrada correctamente.' });
        });

        // PUT - Cambiar rol (solo admin)
        this.app.put('/cambiarRol/:id', verificarToken, verificarAdministrador, async (req, res) => {
            try {
                const { id } = req.params;
                const { rol } = req.body;

                if (!['viajero', 'admin'].includes(rol)) {
                    return res.status(400).json({ mensaje: 'El rol debe ser viajero o admin.' });
                }

                const usuario = await User.findByIdAndUpdate(
                    id,
                    { rol },
                    { new: true }
                ).select('-password');

                if (!usuario) {
                    return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
                }

                res.json({ mensaje: 'Rol actualizado correctamente.', usuario });
            } catch (error) {
                console.error('Error al cambiar el rol:', error);
                res.status(500).json({ mensaje: 'Error del servidor.' });
            }
        });

        // GET - Consultar usuarios (solo admin)
        this.app.get('/consultarUsuarios', verificarToken, verificarAdministrador, async (req, res) => {
            try {
                const usuarios = await User.find({}, { password: 0 });
                res.json(usuarios);
            } catch (error) {
                console.error('Error al consultar usuarios:', error);
                res.status(500).json({ mensaje: 'Error al consultar los usuarios' });
            }
        });

        // POST - Contacto
        this.app.post('/contacto', async (req, res) => {
            try {
                const { nombre, email, asunto, mensaje } = req.body;

                if (!nombre || !email || !asunto || !mensaje) {
                    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
                }

                const nuevoMensaje = new Contacto({ nombre, email, asunto, mensaje });
                await nuevoMensaje.save();

                res.status(201).json({ mensaje: '¡Mensaje enviado correctamente!' });
            } catch (error) {
                console.error('Error al guardar el mensaje de contacto:', error);
                res.status(500).json({ mensaje: 'Error al enviar el mensaje' });
            }
        });

        // Fallback para servir el build en producción
        this.app.use((req, res) => {
            res.sendFile(require('path').join(__dirname, '../public/index.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`http://127.0.0.1:${this.port}`);
        });
    }
}

module.exports = Server;
