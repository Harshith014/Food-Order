const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    quantity: {type: Number, default: 1}, 
 
});

const MenuItem = mongoose.model('MenuItem', menuSchema);

module.exports = MenuItem;
