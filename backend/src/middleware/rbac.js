const { ROLES } = require('../config/constants');

const rbac =
  (roles = []) =>
  (req, res, next) => {
    if (!req.user) {
      console.warn(`RBAC: No user found in request to ${req.originalUrl}`);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const allowed = Array.isArray(roles) ? roles : [roles];
    if (allowed.length === 0) return next();
    
    if (!allowed.includes(req.user.role)) {
      console.warn(`RBAC: User ${req.user.email} with role ${req.user.role} attempted to access ${req.originalUrl}. Allowed: ${allowed.join(', ')}`);
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };

module.exports = { rbac, ROLES };
