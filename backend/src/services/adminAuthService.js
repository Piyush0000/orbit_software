const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { ADMIN_ROLES } = require('../config/constants');
const { prisma } = require('../config/database');

const signAdminToken = (admin) =>
  jwt.sign({ adminId: admin.id, role: admin.role, email: admin.email }, env.jwt.secret, {
    expiresIn: env.jwt.expire
  });

const ensureDefaultAdmin = async (email) => {
  if (!env.admin.email || !env.admin.password) return null;
  const normalized = email.trim().toLowerCase();
  if (normalized !== env.admin.email.trim().toLowerCase()) return null;

  const existing = await prisma.admin.findFirst({
    where: { email: { equals: normalized, mode: 'insensitive' } }
  });
  if (existing) return existing;

  const hashed = await bcrypt.hash(env.admin.password, 10);
  return prisma.admin.create({
    data: {
      email: normalized,
      password: hashed,
      fullName: 'Admin',
      role: ADMIN_ROLES.SUPER_ADMIN,
      isActive: true
    }
  });
};

const loginAdmin = async (email, password) => {
  const normalized = email.trim().toLowerCase();
  let admin = await prisma.admin.findFirst({
    where: { email: { equals: normalized, mode: 'insensitive' } }
  });
  if (!admin) {
    admin = await ensureDefaultAdmin(normalized);
  }
  if (!admin || !admin.isActive) {
    return null;
  }
  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return null;
  }
  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() }
  });
  const token = signAdminToken(admin);
  return { token, admin };
};

module.exports = { signAdminToken, loginAdmin };
