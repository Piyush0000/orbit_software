const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting double admin reset...');
  try {
    const emails = ['admin@orbit.com', 'admin@evoc.com'];
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    for (const email of emails) {
      console.log(`Resetting ${email}...`);
      await prisma.admin.deleteMany({ where: { email } });
      const admin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
          fullName: 'Super Admin',
          role: 'SUPER_ADMIN',
          isActive: true
        }
      });
      console.log(`DONE: ${admin.email}`);
    }
    
    console.log('ALL ADMINS RESET SUCCESSFULLY.');
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
