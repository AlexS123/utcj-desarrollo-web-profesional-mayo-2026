const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = "mi_clave_secreta_super_segura"; // Guardar siempre en variables de entorno (.env)

// 1. Ruta de Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validación simulada de usuario (En producción usar Base de Datos + Bcrypt)
    if (username === "admin" && password === "123456") {
        
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

// 3. Middleware para proteger rutas posteriores
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del formato "Bearer TOKEN"

    if (!token) return res.status(403).json({ mensaje: "Token requerido" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ mensaje: "Token inválido o expirado" });
        req.user = user; // Guarda los datos del usuario en la petición
        next();
    });
}

// Ruta protegida
app.get('/api/dashboard', verificarToken, (req, res) => {
    res.json({ mensaje: `Bienvenido al panel, ${req.user.username}` });
});

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));