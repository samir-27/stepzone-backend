const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwtsecret = process.env.JWT_SECRET

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

      const authToken = jwt.sign(data,jwtsecret);
      res.status(200).json({
        success: true,
        authToken: authToken,
        message: "user login successfully",
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
