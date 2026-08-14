const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    asunto: { type: String, required: true, trim: true },
    mensaje: { type: String, required: true, trim: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contacto', ContactoSchema);
