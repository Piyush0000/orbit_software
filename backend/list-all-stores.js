const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching stores...');
  const stores = await prisma.store.findMany({
    select: { subdomain: true, name: true, id: true }
  });
  console.log('Stores found:', JSON.stringify(stores, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
