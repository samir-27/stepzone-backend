const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  subimage1: {
    type: String,
  },
  subimage2: {
    type: String,
  },
  subimage3: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  color: {
    type: String,
    enum: [
      "white",
      "gray",
      "blue",
      "brown",
      "red",
      "pink",
      "yellow",
      "green",
      "purple",
    ],
    required: true,
  },
  category: {
    type: String,
    enum: [
      "casual",
      "flipFlop",
      "ethnic",
      "formals",
      "sandals",
      "sports",
      "sneaker",
    ],
  },
  size: {
    type: [String],
    enum: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  avg_rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  purchases: {
    type: Number,
    default: 0,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
