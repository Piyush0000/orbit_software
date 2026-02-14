const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkStoreProducts() {
  try {
    console.log('Checking products for store fashion...');
    
    // First, find the store
    const store = await prisma.store.findUnique({
      where: { subdomain: 'fashion' },
      select: { id: true, name: true, subdomain: true }
    });
    
    if (!store) {
      console.log('Store with subdomain fashion not found!');
      return;
    }
    
    console.log('Found store:', store);
    
    // Now check products for this store
    const products = await prisma.product.findMany({
      where: { storeId: store.id },
      select: { id: true, name: true, price: true, stock: true, category: true }
    });
    
    console.log(`Found ${products.length} products for this store:`);
    console.log(products);
    
  } catch (error) {
    console.error('Error checking store products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStoreProducts();