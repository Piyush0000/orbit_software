const { loginAdmin } = require('../services/adminAuthService');

const sanitizeAdmin = (admin) => {
  if (!admin) return null;
  const { password, ...rest } = admin;
  return rest;
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginAdmin(email, password);
    if (!result) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ token: result.token, admin: sanitizeAdmin(result.admin) });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res) => {
  res.json({ admin: sanitizeAdmin(req.admin) });
};

module.exports = { login, me };
