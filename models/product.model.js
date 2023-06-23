const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannot be empty'],
  },
  description: {
    type: String,
    required: [true, 'description cannot be empty'],
  },
  price: {
      type: Number,
      required: [true, 'price cannot be empty'],
  },
  stock: {
      type: Number,
      required: [true, 'stock cannot be empty'],
  },
  imageUrl: {
    type: String,
    require: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tags',
    }
  ]
});

const products = mongoose.model('products', productSchema);

module.exports = products;