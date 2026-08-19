const jwt = require('jsonwebtoken');

const JWT_SECRET =
    process.env.JWT_SECRET || 'clave_temporal';

// =====================================================
// VERIFICAR TOKEN
// =====================================================

const verificarToken = (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {

            return res.status(401).json({
                mensaje: 'Debe iniciar sesión'
            });
        }

        const usuario = jwt.verify(
            token,
            JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: 'Sesión inválida o expirada'
        });
    }
};


// =====================================================
// VERIFICAR ADMINISTRADOR
// =====================================================

const verificarAdministrador = (
    req,
    res,
    next
) => {

    if (
        !req.usuario ||
        req.usuario.role !== 'administrator'
    ) {

        return res.status(403).json({
            mensaje: 'No tienes permiso para esta ruta'
        });
    }

    next();
};


module.exports = {
    verificarToken,
    verificarAdministrador
};