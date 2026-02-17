const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const count = await prisma.theme.count();
    console.log('Total themes:', count);
    const themes = await prisma.theme.findMany({
      where: { category: 'ELECTRONICS' }
    });
    console.log('Electronics themes:', themes.map(t => t.slug));
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
