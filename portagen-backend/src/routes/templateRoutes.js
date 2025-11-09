const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require('../controllers/templateController');

const router = express.Router();

router.route('/')
  .get(getTemplates)
  .post(protect, admin, createTemplate);

router.route('/:id')
  .get(getTemplateById)
  .put(protect, admin, updateTemplate)
  .delete(protect, admin, deleteTemplate);

module.exports = router;