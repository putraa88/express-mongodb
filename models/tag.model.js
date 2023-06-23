const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannot be empty'],
  },
});

const tags = mongoose.model('tags', tagSchema);

module.exports = tags;