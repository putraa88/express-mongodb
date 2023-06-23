const router = require('express').Router();

// controllers
const productController = require('../../controllers/v2/product.controller');

// middlewares
const adminAuthorizationMiddleware = require('../../middlewares/admin-authorization.middleware');
const authenticationMiddleware = require('../../middlewares/authentication.middleware');

router.get('/', productController.GetProducts);
router.get('/:id', productController.GetProduct);
router.post('/', authenticationMiddleware, adminAuthorizationMiddleware, productController.CreateProduct);
router.put('/:id', authenticationMiddleware, adminAuthorizationMiddleware, productController.UpdateProduct);
router.delete('/:id', authenticationMiddleware, adminAuthorizationMiddleware, productController.DeleteProduct);

module.exports = router;