const express = require('express');
const { createProduct, updateProduct, getAllProducts, deleteProduct } = require('../controller/productController');
const authenticateAdmin = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// Admin routes
router.post("/addproduct", authenticateAdmin, upload.fields([
  { name: "image", maxCount: 1 }, 
  { name: "subimage1", maxCount: 1 }, 
  { name: "subimage2", maxCount: 1 }, 
  { name: "subimage3", maxCount: 1 }
]), createProduct);

router.put("/products/:id", authenticateAdmin, upload.fields([
  { name: "image", maxCount: 1 }, 
  { name: "subimage1", maxCount: 1 }, 
  { name: "subimage2", maxCount: 1 }, 
  { name: "subimage3", maxCount: 1 }
]),updateProduct);

router.delete("/products/:id", authenticateAdmin, deleteProduct);

// Public route
router.get("/products", getAllProducts);

module.exports = router;
