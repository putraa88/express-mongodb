const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  address: {
    type: String,
    required: [true, 'address cannot be empty'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }
});

const deliveryAddress = mongoose.model('delivery_address', addressSchema);

module.exports = deliveryAddress;