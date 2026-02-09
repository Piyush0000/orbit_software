const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const stores = await prisma.store.findMany();
  console.log('Stores:', JSON.stringify(stores, null, 2));

  const products = await prisma.product.findMany({ take: 5 });
  console.log('Sample Products:', JSON.stringify(products, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
