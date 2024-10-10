const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      subimage1,
      subimage2,
      subimage3,
      price,
      brand,
      color,
      category,
      size,
      avg_rating,
      purchases,
    } = req.body;

    const response = await Product.create({
      name,
      description,
      image,
      subimage1,
      subimage2,
      subimage3,
      price,
      brand,
      color,
      category,
      size,
      avg_rating,
      purchases,
    });

    res.status(200).json({
      success: true,
      data: response,
      message: "Product created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};