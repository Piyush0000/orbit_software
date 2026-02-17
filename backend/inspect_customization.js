const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const store = await prisma.store.findUnique({
    where: { subdomain: 'toys' },
    include: {
      websiteCustomization: true
    }
  });

  if (!store) {
    console.log('Store "toys" not found.');
    const allStores = await prisma.store.findMany({ select: { id: true, subdomain: true } });
    console.log('Available stores:', allStores);
    return;
  }

  console.log('--- Store Info ---');
  console.log('ID:', store.id);
  console.log('Subdomain:', store.subdomain);
  console.log('--- Customization ---');
  if (store.websiteCustomization) {
    console.log('Logo:', store.websiteCustomization.logo);
    console.log('Hero Section:', JSON.stringify(store.websiteCustomization.heroSection, null, 2));
    console.log('Brand Colors:', JSON.stringify(store.websiteCustomization.brandColors, null, 2));
    console.log('Product Sections:', JSON.stringify(store.websiteCustomization.productSections, null, 2));
    console.log('Announcement Bar:', JSON.stringify(store.websiteCustomization.announcementBar, null, 2));
  } else {
    console.log('No customization data found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
