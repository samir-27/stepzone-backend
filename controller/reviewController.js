const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

exports.createReview = async (req, res) => {
  try {
    const { stars, description } = req.body;
    const { productId } = req.params;

    const review = await Review.create({
      stars,
      description,
      productId,
    });

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id }
    });

    res.status(200).json({
      success: true,
      data: review,
      message: "Review created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.getAllReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const response = await Product.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "review not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "review deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "error while deleting the review.",
      error: err.message,
    });
  }
};
