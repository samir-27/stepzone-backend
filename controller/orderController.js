const Order = require('../models/orderModel');

const placeOrder = async (req, res) => {
  try {
    const { user, items, address, pincode } = req.body;

    // Validate required fields
    if (!user || !items || items.length === 0 || !address || !pincode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create new order
    const newOrder = new Order({
      user,
      items,
      totalAmount,
      address,
      pincode,
    });

    // Save to database
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = placeOrder;
