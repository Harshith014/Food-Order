const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    name: { type: String },
    dateOfBirth: { type: Date },
    avatar: { type: String }, // Assuming the avatar is stored as a URL or file path
    bio: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;