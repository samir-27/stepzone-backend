const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
  try {
    const { stars, description } = req.body;
    const response = await Review.create({
      stars,
      description,
    });
    res.status(200).json({
      success: true,
      data: response,
      message: "review created successfully",
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
    const response = await Review.find();
    res.status(200).json({
      success: true,
      data: response,
      message: "find all review successfully",
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
