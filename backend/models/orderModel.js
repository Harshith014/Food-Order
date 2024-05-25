const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'delivered'], default: 'pending' },
  orderDate: { type: Date, default: Date.now },
  // deliveryAddress: {
  //   street: { type: String, required: true },
  //   city: { type: String, required: true },
  //   state: { type: String, required: true },
  //   zip: { type: String, required: true },
  // },
  // paymentMethod: { type: String, required: true },
  // paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;