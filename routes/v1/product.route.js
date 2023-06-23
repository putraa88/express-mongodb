const router = require('express').Router();
const productController = require('../../controllers/v1/product.controller');

router.get('/', productController.GetProducts);
router.get('/:id', productController.GetProduct);
router.post('/', productController.CreateProduct);
router.put('/:id', productController.UpdateProduct);

module.exports = router;