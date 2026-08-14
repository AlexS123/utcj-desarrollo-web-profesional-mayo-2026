const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    pass: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', UserSchema);
