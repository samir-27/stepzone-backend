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

exports.getAllProducts = async (req, res) => {
  try {
    const { brand, category, color } = req.query;
    const queryObject = {};

    if (category) {
      queryObject.category = { $regex: category, $options: "i" };
    }
    if (brand) {
      queryObject.brand = { $regex: brand, $options: "i" };
    }
    if (color) {
      queryObject.color = { $regex: color, $options: "i" };
    }

    console.log(queryObject);
    const response = await Product.find(queryObject);
    res.status(200).json({
      success: true,
      data: response,
      message: "Products retrieved successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.updateProduct = async (req, res) => {
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

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedData = {
      name: name || product.name,
      description: description || product.description,
      image: image || product.image,
      subimage1: subimage1 || product.subimage1,
      subimage2: subimage1 || product.subimage2,
      subimage1: subimage3 || product.subimage3,
      price: price || product.price,
      brand: brand || product.brand,
      color: color || product.color,
      category: category || product.category,
      size: size || product.size,
      avg_rating: avg_rating || product.avg_rating,
      purchases: purchases || product.purchases,
      updatedAt: Date.now(),
    };

    product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: product,
      message: "product updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const response = await Product.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "error while deleting the user.",
      error: err.message,
    });
  }
};
