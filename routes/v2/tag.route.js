const router = require('express').Router();

// controller
const tagController = require('../../controllers/v2/tag.controller');

// middlewares
const adminAuthorizationMiddleware = require('../../middlewares/admin-authorization.middleware');

router.get('/', tagController.GetTags);
router.post('/', adminAuthorizationMiddleware, tagController.CreateTag);

module.exports = router;