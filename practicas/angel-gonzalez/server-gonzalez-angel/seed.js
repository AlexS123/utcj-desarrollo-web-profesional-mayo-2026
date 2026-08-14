/* ==================================================
   SEED: crea el usuario administrador inicial
   Uso:  npm run seed
   ================================================== */

require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI =
    process.env.MONGO_URI ||
    'mongodb://localhost:27017/mayo2026_web_prof';

// Datos del administrador que se va a crear
const ADMIN = {
    user: 'admin',
    pass: 'admin123',
    rol: 'Admin'
};

const userSchema = new mongoose.Schema({
    user: String,
    pass: String,
    rol: String
});

const User = mongoose.model('user', userSchema);

(async () => {

    try {

        await mongoose.connect(MONGO_URI);

        console.log('MongoDB conectado:', MONGO_URI);

        const existe = await User.findOne({ user: ADMIN.user });

        if (existe) {

            console.log(
                `El usuario "${ADMIN.user}" ya existe (rol: ${existe.rol}). No se creó nada.`
            );

        }
        else {

            const hash = await bcrypt.hash(ADMIN.pass, 10);

            await new User({
                user: ADMIN.user,
                pass: hash,
                rol: ADMIN.rol
            }).save();

            console.log('Usuario administrador creado:');
            console.log('   usuario:    ' + ADMIN.user);
            console.log('   contraseña: ' + ADMIN.pass);
            console.log('   rol:        ' + ADMIN.rol);

        }

        const total = await User.countDocuments();
        console.log('Usuarios registrados en la base de datos:', total);

    }
    catch (error) {

        console.error('Error ejecutando el seed:', error.message);
        console.error('Revisa que el servicio de MongoDB esté iniciado.');

        process.exitCode = 1;

    }
    finally {

        await mongoose.disconnect();

    }

})();
