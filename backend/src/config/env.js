const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  mongodbUri: process.env.MONGODB_URI,
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me',
    expire: process.env.JWT_EXPIRE || '7d'
  },
  email: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    fromEmail: process.env.FROM_EMAIL,
    fromName: process.env.FROM_NAME
  },
  upload: {
    path: process.env.UPLOAD_PATH || './uploads',
    maxFileSize: Number(process.env.MAX_FILE_SIZE || 5 * 1024 * 1024)
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  meta: {
    appId: process.env.META_APP_ID,
    appSecret: process.env.META_APP_SECRET,
    redirectUri: process.env.META_REDIRECT_URI,
    apiVersion: process.env.META_API_VERSION || 'v19.0',
    tokenEncKey: process.env.META_TOKEN_ENC_KEY,
    publicAccessToken: process.env.META_PUBLIC_ACCESS_TOKEN
  },
  admin: {
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: process.env.DEFAULT_ADMIN_PASSWORD
  }
};

module.exports = env;
