const authController = require('../../controllers/v2/auth.controller');

const router = require('express').Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;