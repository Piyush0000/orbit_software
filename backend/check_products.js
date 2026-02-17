const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log(JSON.stringify(products.map(p => ({id: p.id, name: p.name, category: p.category})), null, 2));
}

main().finally(() => process.exit(0));
