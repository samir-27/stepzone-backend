const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    maxLength: 10,
  },
  createdAT: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAT: {
    type: Date,
    required: true,
    default: Date.now(),
  },

});

module.exports = mongoose.model("User",userSchema)