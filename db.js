const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI= process.env.DB_URI

const DBconnection = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log("connected to database")
    } catch (error) {
        console.log("Error During Connection",error)
    }
}

module.exports = DBconnection;