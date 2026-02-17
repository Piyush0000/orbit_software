require('dotenv').config();
const themeService = require('./src/services/themeService');

const fragranceThemes = [
  {
    name: 'Fragrance Rose Essence',
    slug: 'fragrance-rose-essence',
    category: 'Fragrance',
    description: 'A soft, ethereal design with rose gold accents and elegant typography. Perfect for feminine and floral scents.',
    version: '1.0.0',
    config: {
      colors: {
        primary: '#fb7185', // Rose 400
        secondary: '#fff1f2', // Rose 50
        accent: '#9f1239' // Rose 900
      },
      font: 'serif',
      layout: 'etheral'
    },
    thumbnail: '/themes/thumbnails/fragrance-rose.png', // Placeholder
    previewUrl: 'https://perfume1.orbit360.shop' // Placeholder
  },
  {
    name: 'Fragrance Essence Noir',
    slug: 'fragrance-essence-noir',
    category: 'Fragrance',
    description: 'A luxurious dark theme with gold accents. Ideal for premium, unisex, or oud-based collections.',
    version: '1.0.0',
    config: {
      colors: {
        primary: '#f59e0b', // Amber 500
        secondary: '#09090b', // Zinc 950
        accent: '#ffffff'
      },
      font: 'serif',
      layout: 'luxury'
    },
    thumbnail: '/themes/thumbnails/fragrance-noir.png', // Placeholder
    previewUrl: 'https://perfume2.orbit360.shop' // Placeholder
  },
  {
    name: 'Fragrance Botanical Green',
    slug: 'fragrance-botanical-green',
    category: 'Fragrance',
    description: 'An organic, fresh theme centered around nature. Features emerald greens and rounded, soft shapes.',
    version: '1.0.0',
    config: {
      colors: {
        primary: '#047857', // Emerald 700
        secondary: '#ecfdf5', // Emerald 50
        accent: '#065f46' // Emerald 800
      },
      font: 'sans',
      layout: 'natural'
    },
    thumbnail: '/themes/thumbnails/fragrance-green.png', // Placeholder
    previewUrl: 'https://perfume3.orbit360.shop' // Placeholder
  }
];

async function seed() {
  console.log('Seeding Fragrance Themes...');
  
  for (const theme of fragranceThemes) {
    try {
      // Check if exists using getThemeBySlug which throws if not found
      try {
        await themeService.getThemeBySlug(theme.slug);
        console.log(`Theme ${theme.slug} already exists. Skipping.`);
        // Could update here if needed
      } catch (e) {
        if (e.message.includes('not found')) {
            await themeService.createTheme(theme);
            console.log(`Created theme: ${theme.name}`);
        } else {
            throw e;
        }
      }
    } catch (error) {
      console.error(`Error processing ${theme.slug}:`, error.message);
    }
  }

  console.log('Seeding complete.');
  process.exit(0);
}

seed();
