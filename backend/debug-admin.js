const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.admin.findUnique({
    where: { email: 'admin@orbit.com' }
  });
  console.log('--- ADMIN CHECK ---');
  if (admin) {
    console.log(`Found admin: ${admin.email}`);
    console.log(`isActive: ${admin.isActive}`);
    console.log(`Role: ${admin.role}`);
  } else {
    console.log('Admin not found in database');
  }
  console.log('-------------------');
  await prisma.$disconnect();
}

main().catch(console.error);
