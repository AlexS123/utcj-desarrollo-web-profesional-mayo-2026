const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    let token = req.cookies?.token;

    if (!token) {
        const authorization = req.headers.authorization;
        if (authorization) {
            token = authorization.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({ mensaje: "Debes iniciar sesión." });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "La sesión ha expirado. Debes iniciar sesión nuevamente." });
    }
}

function verificarAdministrador(req, res, next) {
    if (req.usuario.rol !== "admin") {
        return res.status(403).json({ mensaje: "No tienes permisos para acceder a esta sección." });
    }
    next();
}

module.exports = { verificarToken, verificarAdministrador };
