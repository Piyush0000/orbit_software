const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const emails = ['admin@orbit.com', 'admin@evoc.com'];
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  for (const email of emails) {
    await prisma.admin.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        isActive: true,
        role: 'SUPER_ADMIN'
      },
      create: {
        email,
        password: hashedPassword,
        fullName: 'Super Admin',
        role: 'SUPER_ADMIN',
        isActive: true
      }
    });
    console.log(`Admin ${email} is ready. Password: admin123`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
