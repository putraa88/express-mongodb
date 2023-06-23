const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannot be empty'],
  },
});

const category = mongoose.model('category', categorySchema);

module.exports = category;