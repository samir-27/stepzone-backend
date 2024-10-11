const express = require('express');
const { adminLogin } = require('../controller/adminController');
const router = express.Router();

router.post('/admin/login', adminLogin);

module.exports = router;
