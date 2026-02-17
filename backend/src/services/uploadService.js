const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = require('../config/env');

const ensureUploadDir = () => {
  const uploadPath = path.resolve(env.upload.path);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  return uploadPath;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ensureUploadDir());
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: env.upload.maxFileSize }
});

module.exports = { upload };
