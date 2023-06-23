const router = require('express').Router();

// controller
const categoryController = require('../../controllers/v2/category.controller');

// middlewares
const adminAuthorizationMiddleware = require('../../middlewares/admin-authorization.middleware');

router.get('/', categoryController.GetCategories);
router.post('/', adminAuthorizationMiddleware, categoryController.CreateCategory);

module.exports = router;