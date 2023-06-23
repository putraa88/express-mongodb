const router = require('express').Router();

router.use('/v1', require('./v1')); // routing pake mongodb native
router.use('/v2', require('./v2')); // routing pake moongose

module.exports = router;