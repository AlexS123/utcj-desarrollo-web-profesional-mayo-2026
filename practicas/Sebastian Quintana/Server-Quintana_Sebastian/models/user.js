const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
      trim: true,
    },
    rol: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'Users',
  }
);

module.exports = model('User', userSchema);
