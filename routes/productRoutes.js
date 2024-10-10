const express = require('express')
const { createProduct, updateProduct, getProducts, deleteProduct } = require('../controller/productController')
const router = express.Router()

router.post("/addproduct",createProduct)
router.get("/products",getAllProducts)

module.exports = router;