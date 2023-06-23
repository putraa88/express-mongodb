const dbUsers = require('../../models/user.model');
const bcrypt = require('../../utils/bcrypt');
const jwt = require('../../utils/jwt');

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;
      const exist = await dbUsers.findOne({ email });
      if (exist) throw ({ code: 400, message: 'email already registerd' });
      await dbUsers.create({
        email,
        name,
        password: await bcrypt.hashPassword(password),
      });
      return res.status(201).json({
        error: false,
        message: 'Register successfull, please login to continue',
      })
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await dbUsers.findOne({ email });
      if (!user) throw ({ code: 400, message: 'invalid email / password' });

      // validate password
      const validatePassword = await bcrypt.validatePassword(password, user.password);
      if (!validatePassword) throw ({ code: 400, message: 'invalid email / password' });

      // create token
      const tokenPayload = {
        id: user._id,
        user: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      const jwtToken = jwt.createToken(tokenPayload);
      res.status(200).json({
        error: false,
        message: 'login successfull',
        data: {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: jwtToken,
        }
      })
    } catch (error) {
      next(error);
    }
  }
}