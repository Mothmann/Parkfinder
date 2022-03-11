const express = require('express');
const paypalController = require('../controllers/paypal.controller');
const router = express.Router();

router.post('/:price', paypalController.pay);
router.get('/success/:price', paypalController.success);
router.get('/cancel', paypalController.cancel);

module.exports = router;

