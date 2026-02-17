const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const stores = await prisma.store.findMany({
    include: { user: true }
  });
  console.log('--- STORES IN DATABASE ---');
  console.log(JSON.stringify(stores, null, 2));
  console.log('--------------------------');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
