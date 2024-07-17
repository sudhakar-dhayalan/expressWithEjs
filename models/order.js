const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    email: { type: String, required: true, ref: 'User' },
  },
});

module.exports = mongoose.model('Order', orderSchema);
