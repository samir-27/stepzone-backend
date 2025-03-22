const express = require('express');
const placeOrder = require('../controller/orderController');

const router = express.Router();

// Route to place a new order
router.post('/order/place', placeOrder);

module.exports = router;
