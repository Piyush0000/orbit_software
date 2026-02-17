const express = require('express');
const auth = require('../middleware/auth');
const { rbac, ROLES } = require('../middleware/rbac');
const {
  getLayout,
  updateLayout,
  addSection,
  updateSection,
  deleteSection,
  updateTheme,
  listTemplates,
  getTemplate,
  applyTemplate
} = require('../controllers/layoutController');

const router = express.Router();

router.get('/store/:storeId', auth, getLayout);
router.put('/store/:storeId', auth, updateLayout);
router.post('/store/:storeId/sections', auth, addSection);
router.put('/sections/:sectionId', auth, updateSection);
router.delete('/sections/:sectionId', auth, deleteSection);
router.put('/store/:storeId/theme', auth, updateTheme);
router.get('/templates', listTemplates);
router.get('/templates/:id', getTemplate);
router.post('/store/:storeId/template', auth, applyTemplate);

module.exports = router;
