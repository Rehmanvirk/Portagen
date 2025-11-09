const Payment = require('../models/Payment');
const User = require('../models/User');

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
  try {
    const { templateId, amount } = req.body;
    
    const payment = await Payment.create({
      userId: req.user._id,
      templateId,
      amount,
      paymentStatus: 'pending',
    });

    // In a real application, you would integrate with Stripe here
    // For now, we'll simulate a successful payment
    payment.paymentStatus = 'completed';
    await payment.save();
    
    // Update user to premium
    const user = await User.findById(req.user._id);
    user.isPremium = true;
    await user.save();

    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all payments for a user
// @route   GET /api/payments
// @access  Private
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate('templateId', 'name')
      .sort({ paymentDate: -1 });
    
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createPayment,
  getPayments,
};