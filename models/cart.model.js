const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    }
  ]
});

const carts = mongoose.model('carts', cartSchema);

module.exports = carts;