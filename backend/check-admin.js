const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const adminCount = await prisma.admin.count();
  console.log(`Current admins: ${adminCount}`);

  if (adminCount === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@orbit.com',
        password: hashedPassword,
        fullName: 'Super Admin',
        role: 'SUPER_ADMIN',
        isActive: true
      }
    });
    console.log('Created default admin: admin@orbit.com / admin123');
  } else {
    const admins = await prisma.admin.findMany();
    admins.forEach(a => console.log(`Admin Found: ${a.email} (Active: ${a.isActive})`));
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
