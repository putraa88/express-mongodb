const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannot be empty'],
  },
  email: {
    type: String,
    required: [true, 'email cannot be empty'],
    validate: {
      validator: (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
      },
      message: props => `${props.value} is not an email address`,
    }
  },
  password: {
    type: String,
    required: [true, 'password cannot be empty'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

const users = mongoose.model('users', userSchema);

module.exports = users;