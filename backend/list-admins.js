const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.admin.findMany({
    select: { email: true, role: true, isActive: true }
  });
  console.log('--- ADMIN LIST ---');
  console.log(JSON.stringify(admins, null, 2));
  console.log('------------------');
  await prisma.$disconnect();
}

main().catch(console.error);
