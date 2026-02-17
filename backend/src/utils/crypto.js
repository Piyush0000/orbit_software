const crypto = require('crypto');
const env = require('../config/env');

const ALGO = 'aes-256-ctr';
const key = env.meta.tokenEncKey ? Buffer.from(env.meta.tokenEncKey, 'hex') : null;

const requireKey = () => {
  if (!key || key.length !== 32) {
    throw new Error('META_TOKEN_ENC_KEY must be 32-byte hex string');
  }
};

const encrypt = (plain) => {
  requireKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (cipherText) => {
  requireKey();
  const [ivHex, dataHex] = cipherText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(dataHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
};

module.exports = { encrypt, decrypt };
