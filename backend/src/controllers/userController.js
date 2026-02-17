const bcrypt = require('bcryptjs');
const { prisma } = require('../config/database');

const getMe = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { fullName }
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Current password incorrect' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: req.user.id }, data: { password: hashed } });
    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
};

const deleteMe = async (req, res, next) => {
  try {
    await prisma.user.update({ where: { id: req.user.id }, data: { isActive: false } });
    res.json({ message: 'Account deactivated' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe, updateMe, changePassword, deleteMe };
