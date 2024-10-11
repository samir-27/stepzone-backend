const express = require('express');
const { createProduct, updateProduct, getAllProducts, deleteProduct } = require('../controller/productController');
const authenticateAdmin = require('../middleware/auth');
const router = express.Router();

router.post("/addproduct", authenticateAdmin, createProduct);
router.get("/products", authenticateAdmin, getAllProducts);
router.put("/products/:id", authenticateAdmin, updateProduct);
router.delete("/products/:id", authenticateAdmin, deleteProduct);

module.exports = router;
