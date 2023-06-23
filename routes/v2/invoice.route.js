const router = require('express').Router();

const invoiceController = require('../../controllers/v2/invoice.controller');

router.get('/', invoiceController.getInvoices);
router.post('/generate', invoiceController.generate);

module.exports = router;