const Product = require("../models/productModel");
const cloudinary = require("../middleware/cloudinaryConfig");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      brand,
      color,
      category,
      size,
      avg_rating,
      purchases,
    } = req.body;


    // Ensure images exist before trying to access them
    const imageFile = req.files['image'] ? req.files['image'][0] : null;
    const subimage1File = req.files['subimage1'] ? req.files['subimage1'][0] : null;
    const subimage2File = req.files['subimage2'] ? req.files['subimage2'][0] : null;
    const subimage3File = req.files['subimage3'] ? req.files['subimage3'][0] : null;

    // Upload to Cloudinary
    const image = imageFile ? await cloudinary.uploader.upload(imageFile.path) : null;
    const subimage1 = subimage1File ? await cloudinary.uploader.upload(subimage1File.path) : null;
    const subimage2 = subimage2File ? await cloudinary.uploader.upload(subimage2File.path) : null;
    const subimage3 = subimage3File ? await cloudinary.uploader.upload(subimage3File.path) : null;

    const response = await Product.create({
      name,
      description,
      image: image ? image.secure_url : null,
      subimage1: subimage1 ? subimage1.secure_url : null,
      subimage2: subimage2 ? subimage2.secure_url : null,
      subimage3: subimage3 ? subimage3.secure_url : null,
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
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { brand, category, color, sort } = req.query;
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

    let apiData = Product.find(queryObject);

    if (sort) {
      let sortFix = sort.replace(","," ")
      apiData = apiData.sort(sortFix)
    }

    console.log(queryObject);
    const response = await apiData.sort(sort);
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

    // Check and upload new images if provided
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const subimage1File = req.files["subimage1"] ? req.files["subimage1"][0] : null;
    const subimage2File = req.files["subimage2"] ? req.files["subimage2"][0] : null;
    const subimage3File = req.files["subimage3"] ? req.files["subimage3"][0] : null;

    const updatedData = {
      name: name || product.name,
      description: description || product.description,
      image: imageFile ? (await cloudinary.uploader.upload(imageFile.path)).secure_url : product.image,
      subimage1: subimage1File ? (await cloudinary.uploader.upload(subimage1File.path)).secure_url : product.subimage1,
      subimage2: subimage2File ? (await cloudinary.uploader.upload(subimage2File.path)).secure_url : product.subimage2,
      subimage3: subimage3File ? (await cloudinary.uploader.upload(subimage3File.path)).secure_url : product.subimage3,
      price: price || product.price,
      brand: brand || product.brand,
      color: color || product.color,
      category: category || product.category,
      size: size || product.size,
      avg_rating: avg_rating || product.avg_rating,
      purchases: purchases || product.purchases,
      updatedAt: Date.now(),
    };

    product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
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
