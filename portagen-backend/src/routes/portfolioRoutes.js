const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  downloadPortfolioAsZip,
  downloadPortfolioAsPdf,
} = require('../controllers/portfolioController');

const router = express.Router();

router.route('/')
  .post(protect, createPortfolio)
  .get(protect, getPortfolios);

router.route('/:id')
  .get(protect, getPortfolioById)
  .put(protect, updatePortfolio)
  .delete(protect, deletePortfolio);

router.get('/:id/download/zip', protect, downloadPortfolioAsZip);
router.get('/:id/download/pdf', protect, downloadPortfolioAsPdf);

module.exports = router;