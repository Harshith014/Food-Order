const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true },
            image: { type: String, ref: 'MenuItem.image' },
            name: { type: String, ref: 'MenuItem.name' },
        },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
});
module.exports = mongoose.model('Cart', cartSchema);
