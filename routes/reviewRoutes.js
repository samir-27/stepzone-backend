const express = require('express')
const { createReview, getAllReview, deleteReview } = require('../controller/reviewController')
const router = express.Router()
 
router.post("/addreview", createReview)
router.get("/reviews",getAllReview)
router.delete("/reviews/:id",deleteReview)

module.exports = router;