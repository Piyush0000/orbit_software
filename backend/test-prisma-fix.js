const { prisma } = require('./src/config/database');

async function testInclude() {
  try {
    const stores = await prisma.store.findMany({
      include: {
        user: true,
        onboarding: true
      },
      take: 1
    });
    console.log('SUCCESS: Onboarding relationship working!');
    console.log('Sample Store:', stores[0]?.name || 'No stores found');
  } catch (err) {
    console.error('STILL FAILED:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testInclude();
