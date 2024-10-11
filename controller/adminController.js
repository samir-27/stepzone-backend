const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Function to add an admin if it doesn't already exist
async function addAdmin() {
    try {
        const existingAdmin = await Admin.findOne({ email: 'samirkainbox@gmail.com' });
        if (!existingAdmin) {

            const hashedPassword = await bcrypt.hash('mypassword', 10);
            const newAdmin = new Admin({
                name: 'Samir Sumra',
                email: 'samirkainbox@gmail.com',
                password: hashedPassword,
            });
            await newAdmin.save();
            console.log('Admin added successfully');
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error('Error adding admin:', error);
    }
}

(async () => {
    await addAdmin();
})();

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { adminLogin };
