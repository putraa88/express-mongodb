const router = require('express').Router();

// controllers
const addressController = require('../../controllers/v2/delivery-address.controller');

router.post('/create-address', addressController.createAddress);
router.get('/delivery-address', addressController.getAddresses);
module.exports = router;