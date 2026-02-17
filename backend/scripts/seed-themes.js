const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const themes = [
  { slug: "fashion-upfront", name: "Fashion Style - Classic", category: "CLOTHING" },
  { slug: "fashion-upfront-2", name: "Fashion Style - Modern", category: "CLOTHING" },
  { slug: "footwear-upfront", name: "Footwear Pro - Sport", category: "FOOTWEAR" },
  { slug: "toy-upfront", name: "Toy Store - Playful", category: "TOYSTORE" },
  { slug: "toy-upfront-2", name: "Toy Store - Educational", category: "TOYSTORE" },
  { slug: "toy-upfront-3", name: "Toy Store - Premium", category: "TOYSTORE" },
  { slug: "perfume-upfront", name: "Fragrance Elite - Light", category: "PERFUME" },
  { slug: "perfume-upfront-theme2", name: "Fragrance Elite - Dark", category: "PERFUME" },
  { slug: "perfume-upfront-theme3", name: "Fragrance Elite - Luxury", category: "PERFUME" },
  { slug: "beauty-personal-care-upfront", name: "Beauty Glow - Upfront", category: "COSMETICS" },
  { slug: "furniture-upfront", name: "Home Comfort - Upfront", category: "FURNITURE" },
];

async function seedThemes() {
  console.log('Seeding themes...');
  for (const theme of themes) {
    await prisma.theme.upsert({
      where: { slug: theme.slug },
      update: {
        name: theme.name,
        category: theme.category,
      },
      create: {
        slug: theme.slug,
        name: theme.name,
        category: theme.category,
        isActive: true,
        version: "1.0.0"
      },
    });
    console.log(`- Seeded theme: ${theme.name} (${theme.slug})`);
  }
  console.log('Done!');
}

seedThemes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
