const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const stores = await prisma.store.findMany({
    select: {
      id: true,
      subdomain: true,
      category: true,
      products: {
        select: {
          id: true,
          name: true,
          category: true,
          isActive: true
        }
      },
      websiteCustomization: true
    }
  });
  
  stores.forEach(store => {
    console.log(`Store: ${store.subdomain} (ID: ${store.id})`);
    console.log(`  Category: ${store.category}`);
    console.log(`  Total Products: ${store.products.length}`);
    store.products.forEach(p => {
      console.log(`    - [${p.isActive ? 'ACTIVE' : 'INACTIVE'}] ${p.name} (Category: ${p.category})`);
    });
    
    if (store.websiteCustomization) {
      console.log(`  Customization Config:`, JSON.stringify(store.websiteCustomization.config, null, 2));
      // Also check other fields in case I put it somewhere else
      console.log(`  Customization Sections:`, JSON.stringify(store.websiteCustomization.productSections, null, 2));
    } else {
      console.log(`  No website customization found.`);
    }
    console.log('---');
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
