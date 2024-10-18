const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  stars: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  description: {
    type: String,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
