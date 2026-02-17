const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkToysStore() {
  try {
    const store = await prisma.store.findFirst({
      where: { subdomain: 'toys' }
    });
    
    if (store) {
      console.log('✅ Toys store exists!');
      console.log('Name:', store.name);
      console.log('Theme:', store.theme);
      console.log('Subdomain:', store.subdomain);
      console.log('URL: http://toys.localhost:3000');
    } else {
      console.log('❌ No toys store found');
      console.log('Creating one now...');
      
      // Get first user
      const user = await prisma.user.findFirst();
      if (!user) {
        console.log('❌ No users found. Please create a merchant via admin panel first.');
        process.exit(1);
      }
      
      // Create toys store
      const newStore = await prisma.store.create({
        data: {
          userId: user.id,
          name: 'Toy Store Demo',
          subdomain: 'toys',
          theme: 'toys upfront',
          category: 'toys',
          description: 'Amazing toys for kids of all ages',
          isActive: true
        }
      });
      
      console.log('✅ Created toys store:', newStore.name);
      console.log('URL: http://toys.localhost:3000');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkToysStore();
