const crypto = require('crypto');

const generateOrderNumber = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 9999)}`;

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const pick = (obj, fields = []) =>
  fields.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key];
    return acc;
  }, {});

module.exports = { generateOrderNumber, hashToken, pick };
