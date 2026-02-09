const { prisma } = require('./src/config/database');

async function checkPrismaProperties() {
  console.log('Available Prisma models:');
  const models = Object.keys(prisma).filter(key => 
    !key.startsWith('_') && 
    !key.startsWith('$') && 
    typeof prisma[key] === 'object'
  );
  console.log(models);
  process.exit(0);
}

checkPrismaProperties();
