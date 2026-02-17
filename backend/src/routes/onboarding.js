const express = require('express');
const auth = require('../middleware/auth');
const { upload } = require('../services/uploadService');
const {
  getOptions,
  createGuestSession,
  getOnboarding,
  updateStep,
  submitOnboarding
} = require('../controllers/onboardingController');

const router = express.Router();

router.get('/options', getOptions);
router.post('/guest', createGuestSession);
router.get('/', auth, getOnboarding);
router.put('/steps/:stepKey', auth, updateStep);
router.post('/submit', auth, submitOnboarding);

router.post('/logo', auth, upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Logo file required' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
