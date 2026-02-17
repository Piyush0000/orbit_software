const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedThemes() {
  const themes = [
    {
      name: 'Tech Modern',
      slug: 'electronics-modern',
      category: 'ELECTRONICS',
      description: 'A sleek, modern theme designed for electronics retailers',
      version: '1.0.0',
      isActive: true,
      config: {
        features: ['responsive', 'fast-loading', 'seo-optimized', 'mobile-first'],
        customizationOptions: ['colors', 'fonts', 'logo', 'hero-section']
      }
    },
    {
      name: 'Tech Pro',
      slug: 'electronics-pro',
      category: 'ELECTRONICS',
      description: 'Professional theme for electronics businesses',
      version: '1.0.0',
      isActive: true,
      config: {
        features: ['responsive', 'fast-loading', 'seo-optimized', 'mobile-first'],
        customizationOptions: ['colors', 'fonts', 'logo', 'hero-section']
      }
    },
    {
      name: 'Tech Store',
      slug: 'electronics-store',
      category: 'ELECTRONICS',
      description: 'Simple and effective theme for electronics stores',
      version: '1.0.0',
      isActive: true,
      config: {
        features: ['responsive', 'fast-loading', 'seo-optimized', 'mobile-first'],
        customizationOptions: ['colors', 'fonts', 'logo', 'hero-section']
      }
    },
    {
      name: 'Electronics Upfront 3',
      slug: 'electronics-upfront-3',
      category: 'ELECTRONICS',
      description: 'Advanced electronics theme with premium features',
      version: '1.0.0',
      isActive: true,
      config: {
        features: ['responsive', 'fast-loading', 'seo-optimized', 'mobile-first'],
        customizationOptions: ['colors', 'fonts', 'logo', 'hero-section']
      }
    },
    {
      name: 'Electronics Upfront 2',
      slug: 'electronics-upfront-2',
      category: 'ELECTRONICS',
      description: 'Feature-rich electronics theme with modern design',
      version: '1.0.0',
      isActive: true,
      config: {
        features: ['responsive', 'fast-loading', 'seo-optimized', 'mobile-first'],
        customizationOptions: ['colors', 'fonts', 'logo', 'hero-section']
      }
    },
    {
      name: 'Orbit Upfront',
      slug: 'orbit-upfront',
      category: 'ELECTRONICS',
      description: 'Comprehensive electronics theme with all features',
      version: '1.0.0',
      isActive: true,
      config: {
        features: ['responsive', 'fast-loading', 'seo-optimized', 'mobile-first'],
        customizationOptions: ['colors', 'fonts', 'logo', 'hero-section']
      }
    }
  ];

  console.log('Seeding themes...');

  for (const theme of themes) {
    await prisma.theme.upsert({
      where: { slug: theme.slug },
      update: theme,
      create: theme
    });
    console.log(`- Seeded ${theme.name} (${theme.slug})`);
  }

  console.log('Done seeding themes!');
}

seedThemes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
