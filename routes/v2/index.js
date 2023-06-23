const router = require('express').Router();

// middlewares
const authenticationMiddleware = require('../../middlewares/authentication.middleware');

router.use('/products', require('./product.route'));
router.use('/categories',authenticationMiddleware, require('./category.route'));
router.use('/tags', authenticationMiddleware, require('./tag.route'));
router.use('/auth', require('./auth.route'));
router.use('/users', authenticationMiddleware, require('./user.route'));
router.use('/carts', authenticationMiddleware, require('./cart.route'));
router.use('/invoice', authenticationMiddleware, require('./invoice.route'));

module.exports = router;