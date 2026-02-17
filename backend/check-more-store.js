const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const store = await prisma.store.findUnique({
    where: { subdomain: 'more' },
    include: { websiteCustomization: true }
  });
  console.log(JSON.stringify(store, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}).finally(() => prisma.$disconnect());
