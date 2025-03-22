const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

exports.createReview = async (req, res) => {
  try {
    const { stars, description, userId } = req.body; // Get userId
    const { productId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Check if the user has already reviewed this product
    const existingReview = await Review.findOne({ userId, productId });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Create a new review
    const review = await Review.create({
      stars,
      description,
      productId,
      userId,
    });

    // Add the review to the product
    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: review._id },
    });

    res.status(200).json({
      success: true,
      data: review,
      message: "Review created successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



exports.getAllReview = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Populate the userId field to get name and profile_img from the User collection
    const reviews = await Review.find({ productId }).populate("userId", "name profile_img");
    console.log(reviews);
    

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
