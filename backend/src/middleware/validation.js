const { validate } = require('../utils/validators');

const withValidation = (rules) => {
  return [...rules, validate];
};

module.exports = { withValidation };
