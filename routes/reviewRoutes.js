const express = require('express');
const { createReview, getAllReview, deleteReview } = require('../controller/reviewController');
const router = express.Router();

router.post("/products/:productId/reviews", createReview);

router.get("/products/:productId/reviews", getAllReview);

router.delete("/reviews/:id", deleteReview);

module.exports = router;
