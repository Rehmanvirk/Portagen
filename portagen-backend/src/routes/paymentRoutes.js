const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createPayment,
  getPayments,
} = require('../controllers/paymentController');

const router = express.Router();

router.route('/')
  .post(protect, createPayment)
  .get(protect, getPayments);

module.exports = router;