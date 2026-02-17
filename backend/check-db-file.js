const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  try {
    const store = await prisma.store.findUnique({
      where: { subdomain: 'more' }
    });
    fs.writeFileSync('db_output.json', JSON.stringify(store, null, 2));
  } catch (e) {
    fs.writeFileSync('db_error.txt', e.stack);
  }
}

main().finally(() => prisma.$disconnect());
