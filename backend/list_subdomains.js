const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.store.findMany({ select: { subdomain: true } })
  .then(s => console.log('STORES:', s))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
