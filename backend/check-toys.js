const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const store = await prisma.store.findUnique({
    where: { subdomain: 'toys' },
    include: { websiteCustomization: true }
  });
  if (store) {
    fs.writeFileSync('toys_store_check.txt', JSON.stringify(store, null, 2));
  } else {
    fs.writeFileSync('toys_store_check.txt', 'Store with subdomain "toys" NOT FOUND.');
  }
  await prisma.$disconnect();
}

main().catch(e => {
  fs.writeFileSync('toys_store_check.txt', 'Error: ' + e.message);
  process.exit(1);
});
