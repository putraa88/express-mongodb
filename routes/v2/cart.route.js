const router = require('express').Router();

const cartController = require('../../controllers/v2/cart.controller');

router.get('/', cartController.getAllCarts);
router.get('/:id', cartController.getCart);
router.post('/', cartController.createCart);
router.put('/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;