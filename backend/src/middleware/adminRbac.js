const { ADMIN_ROLES } = require('../config/constants');

const adminRbac =
  (roles = []) =>
  (req, res, next) => {
    if (!req.admin) return res.status(401).json({ message: 'Unauthorized' });
    const allowed = Array.isArray(roles) ? roles : [roles];
    if (allowed.length === 0) return next();
    if (!allowed.includes(req.admin.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };

module.exports = { adminRbac, ADMIN_ROLES };
