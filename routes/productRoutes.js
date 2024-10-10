const express = require('express')
const { createProduct, updateProduct, getAllProducts, deleteProduct } = require('../controller/productController')
const router = express.Router()

router.post("/addproduct",createProduct)
router.get("/products",getAllProducts)
router.put("/products/:id",updateProduct)

module.exports = router;