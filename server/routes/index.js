const express = require('express');
const router = express.Router();

router.use('/business', require('./shopkeeper_routes'));
router.use('/user', require('./user_routes'));

module.exports = router;


