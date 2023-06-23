const jwt = require("../utils/jwt");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw ({ code: 403, message: 'authentication failed' });
    const validateToken = jwt.validateToken(token);
    if (!validateToken) ({ code: 403, message: 'authentication failed' });
    req.user = validateToken;
    next();
  } catch (error) {
    next(error);
  }
}

/*
  req = {
    headers: {
      authorization: 'skaldkjasdhaksjdhajksdh',
    },
    body: {
      email: 'admin@mail.com',
      password: '1234'
    },
    user: {
      id: '647432c74589bd28b7d473e9',
      user: 'admin',
      email: 'admin@mail.com',
      isAdmin: false,
      iat: 1685797734
    }
  }



*/