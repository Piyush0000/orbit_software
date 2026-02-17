const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function check() {
  try {
    const count = await prisma.theme.count();
    const themes = await prisma.theme.findMany({
      where: { category: 'ELECTRONICS' }
    });
    const output = `Total themes: ${count}\nElectronics themes: ${themes.map(t => t.slug).join(', ')}`;
    fs.writeFileSync('theme-check-result.txt', output);
    console.log('Results written to theme-check-result.txt');
  } catch (error) {
    fs.writeFileSync('theme-check-result.txt', 'Error: ' + error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
