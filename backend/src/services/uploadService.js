const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const env = require('../config/env');

// Configure Cloudinary only if credentials are provided
const isCloudinaryConfigured = env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret;

let storage;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'orbit-platform',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'ico'],
      public_id: (req, file) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        return `${unique}-${file.originalname.split('.')[0]}`;
      }
    }
  });
  console.log('✅ Cloudinary Storage initialized');
} else {
  // Fallback to local disk storage
  const ensureUploadDir = () => {
    const uploadPath = path.resolve(env.upload.path);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    return uploadPath;
  };

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, ensureUploadDir());
    },
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}-${file.originalname}`);
    }
  });
  console.log('⚠️ Cloudinary not configured, falling back to Local Disk Storage');
}

const upload = multer({
  storage,
  limits: { fileSize: env.upload.maxFileSize }
});

module.exports = { upload };
