const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || '123';

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, jwtSecret);
  },
  validateToken: (token) => {
    return jwt.verify(token, jwtSecret);
  }
}