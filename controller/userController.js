const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwtsecret = process.env.JWT_SECRET;

exports.createUser = [
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  body("name", "Name must be at least 5 characters long").isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        return res.status(400).json({ errors: validationError.array() });
      }
      
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(password, salt);
      const response = await User.create({
        name,
        email,
        password: securePassword,
      });
      res.status(200).json({
        success: true,
        data: response,
        message: "User created successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
];

exports.loginUser = [
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
  async (req, res) => {
    try {
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        return res.status(400).json({ errors: validationError.array() });
      }

      const { email, password } = req.body;
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({
          success: false,
          message: "credentials invalid",
        });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res.status(400).json({
          success: false,
          message: "credentials invalid",
        });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtsecret);
      res.status(200).json({
        success: true,
        authToken: authToken,
        message: "user login successfully",
        Role:"user"
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
];

exports.getAllUsers = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json({
      success: true,
      data: response,
      message: "find all user successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
    try {
      const { name, email, password, img, address, phone } = req.body;
  
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const updatedData = {
        name: name || user.name,
        email: email || user.email,
        img: img || user.img,
        address: address || user.address,
        phone: phone || user.phone,
        updatedAT: Date.now(),
      };
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedData.password = await bcrypt.hash(password, salt);
      }
  
      user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      res.status(200).json({
        success: true,
        data: user,
        message: "User updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
        const response = await User.findByIdAndDelete(req.params.id);

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "User not found", 
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
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
