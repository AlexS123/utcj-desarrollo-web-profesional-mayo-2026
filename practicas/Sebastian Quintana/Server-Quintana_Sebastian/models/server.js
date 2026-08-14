const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta_super_segura';
        this.middlewares();
        this.routes();
        this.errorHandler();
        this.connectDB();
        this.listen();
    }

    connectDB() {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/Mayo2026';

        mongoose.connect(mongoUri)
            .then(() => {
                console.log('Conectado a MongoDB:', mongoUri);
            })
            .catch((error) => {
                console.error('Error de conexión a MongoDB:', error);
            });
    }

    middlewares() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            // Authorization es indispensable para enviar el token JWT desde el navegador.
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            res.header('Access-Control-Max-Age', '600');

            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }

            next();
        });

        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use((req, res, next) => {
            if (req.method === 'POST' && !req.body) {
                let data = '';
                req.setEncoding('utf8');
                req.on('data', (chunk) => {
                    data += chunk;
                });
                req.on('end', () => {
                    if (data) {
                        try {
                            req.body = JSON.parse(data);
                        } catch (error) {
                            try {
                                const parsed = new URLSearchParams(data);
                                req.body = Object.fromEntries(parsed.entries());
                            } catch {
                                req.body = {};
                            }
                        }
                    } else {
                        req.body = {};
                    }
                    next();
                });
            } else {
                next();
            }
        });
    }

    // Extrae y verifica el JWT enviado en el header Authorization.
    getUserFromRequest(req) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return null;

        try {
            return jwt.verify(token, this.JWT_SECRET);
        } catch (err) {
            return null;
        }
    }

    // Middleware: exige token válido con rol admin o root (sin distinguir mayúsculas).
    requireAdmin() {
        return (req, res, next) => {
            const usuario = this.getUserFromRequest(req);

            if (!usuario) {
                return res.status(401).json({ mensaje: 'No autorizado. Token faltante o inválido.' });
            }

            const rol = String(usuario.role || usuario.rol || '').toLowerCase();
            if (rol !== 'root' && rol !== 'admin') {
                return res.status(403).json({ mensaje: 'Permisos insuficientes. Se requiere rol admin o root.' });
            }

            req.usuario = usuario;
            next();
        };
    }

    routes() {
        this.app.post('/login', async (req, res) => {
            try {
                const body = req.body || {};
                const { username, password } = body;

                if (!username || !password) {
                    console.log('Login fallido: faltan datos');
                    return res.status(400).json({ mensaje: 'Login incorrecto. Faltan usuario o contraseña.' });
                }

                const userRecord = await User.findOne({ user: username });
                if (!userRecord) {
                    console.log(`Login fallido: usuario no encontrado -> ${username}`);
                    return res.status(401).json({ mensaje: 'Login incorrecto. Usuario no encontrado.' });
                }

                const passwordMatches = await bcrypt.compare(password, userRecord.pass);
                if (!passwordMatches) {
                    console.log(`Login fallido: contraseña incorrecta para -> ${username}`);
                    return res.status(401).json({ mensaje: 'Login incorrecto. Contraseña incorrecta.' });
                }

                const userPayload = {
                    id: userRecord._id,
                    username: userRecord.user,
                    role: userRecord.rol,
                };

                const token = jwt.sign(userPayload, this.JWT_SECRET, { expiresIn: '2h' });
                console.log(`JWT generado correctamente para: ${userRecord.user}`);

                return res.json({
                    mensaje: 'Correcto',
                    token,
                });
            } catch (error) {
                console.error('Error en login:', error);
                return res.status(500).json({ mensaje: 'Login incorrecto. Error del servidor.' });
            }
        });

        this.app.get('/verify-token', (req, res) => {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ mensaje: 'Token no proporcionado' });
            }

            jwt.verify(token, this.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
                }

                return res.json({
                    mensaje: 'Token válido',
                    usuario: decoded
                });
            });
        });

        // Padrón de usuarios: lo consume /admin y /admin/config (solo admin o root).
        this.app.get('/consultarUsuarios', this.requireAdmin(), async (req, res) => {
            try {
                const users = await User.find({}, 'user rol createdAt updatedAt').sort({ createdAt: -1 });
                return res.json(users);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                return res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });

        // Cambiar rol de un usuario (solo root/admin)
        this.app.put('/users/:id/role', this.requireAdmin(), async (req, res) => {
            try {
                const { id } = req.params;
                const { rol } = req.body || {};
                if (!rol) return res.status(400).json({ mensaje: 'Falta rol' });

                const updated = await User.findByIdAndUpdate(id, { rol }, { new: true, fields: 'user rol createdAt updatedAt' });
                if (!updated) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

                return res.json({ mensaje: 'Rol actualizado', usuario: updated });
            } catch (error) {
                console.error('Error al actualizar rol:', error);
                return res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });

        // Eliminar usuario (solo root/admin)
        this.app.delete('/users/:id', this.requireAdmin(), async (req, res) => {
            try {
                const { id } = req.params;
                const deleted = await User.findByIdAndDelete(id);
                if (!deleted) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

                return res.json({ mensaje: 'Usuario eliminado' });
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
                return res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });

        this.app.post('/registrar', async (req, res) => {
            try {
                const body = req.body || {};
                const { user, pass, rol } = body;

                if (!user || !pass || !rol) {
                    return res.status(400).json({ error: 'Los campos user, pass y rol son obligatorios.' });
                }

                const existingUser = await User.findOne({ user });
                if (existingUser) {
                    return res.status(400).json({ error: 'El usuario ya existe.' });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pass, salt);

                const newUser = new User({ user, pass: hashedPassword, rol });
                await newUser.save();

                return res.status(201).json({
                    id: newUser._id,
                    user: newUser.user,
                    rol: newUser.rol,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt,
                });
            } catch (error) {
                console.error('Error al crear usuario:', error);
                return res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }

    errorHandler() {
        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                return res.status(400).json({
                    error: 'JSON inválido. En Postman usa Body > raw > JSON.'
                });
            }

            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en puerto ' + this.port);
        });
    }
}

module.exports = Server;