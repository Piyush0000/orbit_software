const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const store = await prisma.store.findUnique({
    where: { subdomain: 'toys' }
  });

  if (!store) {
    console.log('Store not found');
    return;
  }

  const products = await prisma.product.findMany({
    where: { storeId: store.id }
  });

  const categories = [...new Set(products.map(p => p.category))];
  console.log('Categories found:', categories);

  // Update customization to include configurable sections
  const customization = await prisma.websiteCustomization.findUnique({
    where: { storeId: store.id }
  });

  const updatedConfig = {
    ...(customization?.config || {}),
    productSections: [
      {
        id: 'featured',
        title: 'Featured Collections',
        subtitle: 'Our hand-picked selections for your little ones',
        category: 'all',
        limit: 4,
        style: 'grid'
      },
      {
        id: 'educational',
        title: 'Learning & Growth',
        subtitle: 'Toys that challenge and inspire young minds',
        category: 'educational',
        limit: 4,
        style: 'grid'
      }
    ]
  };

  await prisma.websiteCustomization.upsert({
    where: { storeId: store.id },
    update: { 
        config: updatedConfig,
        // Also update standard fields if they are null
        heroSection: customization?.heroSection || {
            title: "Spark Joy in Every Moment",
            subtitle: "Discover amazing toys that help your little ones learn, grow, and have a blast.",
            backgroundImage: null
        }
    },
    create: {
      storeId: store.id,
      config: updatedConfig,
      heroSection: {
        title: "Spark Joy in Every Moment",
        subtitle: "Discover amazing toys that help your little ones learn, grow, and have a blast.",
        backgroundImage: null
      }
    }
  });

  console.log('Successfully updated product sections configuration');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
