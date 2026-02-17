const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const stores = await prisma.store.findMany({
    include: { user: true }
  });
  const output = JSON.stringify(stores, null, 2);
  fs.writeFileSync('stores_debug_output.txt', output);
  console.log('Done writing to stores_debug_output.txt');
  await prisma.$disconnect();
}

main().catch(e => {
  fs.writeFileSync('stores_debug_output.txt', 'Error: ' + e.message);
  process.exit(1);
});
