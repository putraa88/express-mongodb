const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: [true, 'invoice number cannot be empty'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'delivery_address',
  },
  isPaid: {
    type: Boolean,
    default: false,
  }
});

const invoices = mongoose.model('invoices', invoiceSchema);

module.exports = invoices;