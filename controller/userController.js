const User = require("../models/userModel");

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await User.create({ name, email, password });
        res.status(200).json({
            success: true,
            data: response,
            message: "User created successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
