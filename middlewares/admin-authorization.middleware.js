const jwt = require("../utils/jwt");

module.exports = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      throw ({ code: 404, message: 'unauthorized access' });
    }
  } catch (error) {
    next(error);
  }
}