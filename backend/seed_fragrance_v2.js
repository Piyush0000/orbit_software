require('dotenv').config();
const themeService = require('./src/services/themeService');

// Using 'PERFUME' to match Prisma Enum
const fragranceThemes = [
  {
    name: 'Fragrance Rose Essence',
    slug: 'fragrance-rose-essence',
    category: 'PERFUME', 
    description: 'A soft, ethereal design with rose gold accents and elegant typography. Perfect for feminine and floral scents.',
    version: '1.0.0',
    config: {
      colors: {
        primary: '#fb7185',
        secondary: '#fff1f2',
        accent: '#9f1239'
      },
      font: 'serif',
      layout: 'etheral'
    },
    thumbnail: '/themes/thumbnails/fragrance-rose.png',
    previewUrl: 'https://perfume1.orbit360.shop'
  },
  {
    name: 'Fragrance Essence Noir',
    slug: 'fragrance-essence-noir',
    category: 'PERFUME',
    description: 'A luxurious dark theme with gold accents. Ideal for premium, unisex, or oud-based collections.',
    version: '1.0.0',
    config: {
      colors: {
        primary: '#f59e0b',
        secondary: '#09090b',
        accent: '#ffffff'
      },
      font: 'serif',
      layout: 'luxury'
    },
    thumbnail: '/themes/thumbnails/fragrance-noir.png',
    previewUrl: 'https://perfume2.orbit360.shop'
  },
  {
    name: 'Fragrance Botanical Green',
    slug: 'fragrance-botanical-green',
    category: 'PERFUME',
    description: 'An organic, fresh theme centered around nature. Features emerald greens and rounded, soft shapes.',
    version: '1.0.0',
    config: {
      colors: {
        primary: '#047857',
        secondary: '#ecfdf5',
        accent: '#065f46'
      },
      font: 'sans',
      layout: 'natural'
    },
    thumbnail: '/themes/thumbnails/fragrance-green.png',
    previewUrl: 'https://perfume3.orbit360.shop'
  }
];

async function seed() {
  console.log('Seeding Fragrance Themes (v2)...');
  
  for (const theme of fragranceThemes) {
    try {
        console.log(`Checking ${theme.slug}...`);
        try {
            await themeService.getThemeBySlug(theme.slug);
            console.log(`Theme ${theme.slug} already exists.`);
        } catch (e) {
            console.log(`Creating ${theme.slug}...`);
            await themeService.createTheme(theme);
            console.log(`Created: ${theme.name}`);
        }
    } catch (error) {
      console.error(`Error processing ${theme.slug}:`, error.message);
    }
  }

  console.log('Seeding complete.');
  process.exit(0);
}

seed();
