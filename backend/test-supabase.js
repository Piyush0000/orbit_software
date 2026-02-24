const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing connection to Supabase...');
    // Try a simple count on a table that might not exist yet
    // Or just try to connect
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('Result:', result);
    console.log('✅ Successfully connected to Supabase!');
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
