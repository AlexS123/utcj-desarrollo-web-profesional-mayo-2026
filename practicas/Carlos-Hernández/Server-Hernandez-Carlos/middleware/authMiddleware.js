const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            mensaje: "No autorizado. Se requiere iniciar sesión."
        });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            mensaje: "Token no proporcionado."
        });
    }

    try {

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch (error) {

        console.error("Error al verificar token:", error);

        return res.status(401).json({
            mensaje: "Token inválido o expirado."
        });
    }
}


function verificarAdministrador(req, res, next) {

    if (req.usuario.rol !== "admin") {

        return res.status(403).json({
            mensaje: "Acceso denegado. Se requiere ser administrador."
        });

    }

    next();
}


module.exports = {
    verificarToken,
    verificarAdministrador
};