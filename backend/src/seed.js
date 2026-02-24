const bcrypt = require('bcryptjs');
const { prisma, connectMongo, disconnectMongo } = require('./config/database');
const env = require('./config/env');
const Template = require('./models/mongoose/Template');
const Section = require('./models/mongoose/Section');
const { ADMIN_ROLES } = require('./config/constants');

const seed = async () => {
  try {
    await connectMongo();

    // Admin user
    const adminEmail = env.admin.email ? env.admin.email.trim().toLowerCase() : null;
    if (adminEmail) {
      const existing = await prisma.admin.findUnique({ where: { email: adminEmail } });
      if (!existing) {
        const hashed = await bcrypt.hash(env.admin.password || 'change-this-password', 10);
        await prisma.admin.create({
          data: {
            email: adminEmail,
            password: hashed,
            fullName: 'Admin',
            role: ADMIN_ROLES.SUPER_ADMIN
          }
        });
        console.log('Admin account created');
      }
    }

    // Sections
    const hero = await Section.findOneAndUpdate(
      { name: 'Hero' },
      { name: 'Hero', type: 'hero', description: 'Hero banner', defaultConfig: { heading: 'Welcome' } },
      { upsert: true, new: true }
    );

    // Templates
    await Template.findOneAndUpdate(
      { name: 'Minimal' },
      {
        name: 'Minimal',
        description: 'Clean starter template',
        category: 'minimal',
        defaultSections: [{ type: hero.type, config: hero.defaultConfig }],
        defaultTheme: { primaryColor: '#111', secondaryColor: '#555' },
        isActive: true
      },
      { upsert: true, new: true }
    );

    // Seed All Themes from all_upfront
    const allThemes = [
      // Perfume
      {
        name: 'Perfume Essence 1',
        slug: 'perfume-upfront',
        category: 'PERFUME',
        description: 'Elegant and minimal perfume theme focus.',
        version: '1.0.0',
        config: { colors: { primary: '#fb7185', secondary: '#fff1f2', accent: '#9f1239' }, font: 'serif', layout: 'luxury' },
        thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://perfume1.orbit360.shop'
      },
      {
        name: 'Perfume Noir 2',
        slug: 'perfume-upfront-theme2',
        category: 'PERFUME',
        description: 'Dark luxury theme for premium colognes.',
        version: '1.0.0',
        config: { colors: { primary: '#f59e0b', secondary: '#09090b', accent: '#ffffff' }, font: 'serif', layout: 'luxury' },
        thumbnail: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://perfume2.orbit360.shop'
      },
      {
        name: 'Perfume Botanical 3',
        slug: 'perfume-upfront-theme3',
        category: 'PERFUME',
        description: 'Fresh botanical theme for organic scents.',
        version: '1.0.0',
        config: { colors: { primary: '#047857', secondary: '#ecfdf5', accent: '#065f46' }, font: 'sans', layout: 'natural' },
        thumbnail: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://perfume3.orbit360.shop'
      },
      // Fashion
      {
        name: 'Fashion Hub 1',
        slug: 'fashion_upfront',
        category: 'CLOTHING',
        description: 'Clean street fashion layout.',
        version: '1.0.0',
        config: { colors: { primary: '#000000', secondary: '#ffffff', accent: '#555555' }, font: 'sans', layout: 'grid' },
        thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://fashion1.orbit360.shop'
      },
      {
        name: 'Fashion Trend 2',
        slug: 'fashion_upfront_2',
        category: 'CLOTHING',
        description: 'Trendy fashion store with high visual impact.',
        version: '1.0.0',
        config: { colors: { primary: '#dfc27d', secondary: '#f5f5f5', accent: '#000000' }, font: 'serif', layout: 'modern' },
        thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://fashion2.orbit360.shop'
      },
      {
        name: 'Fashion Elite 3',
        slug: 'fashion-upfront-3',
        category: 'CLOTHING',
        description: 'Luxury fashion boutique design.',
        version: '1.0.0',
        config: { colors: { primary: '#000000', secondary: '#f8f8f8', accent: '#c5a059' }, font: 'serif', layout: 'elite' },
        thumbnail: 'https://images.unsplash.com/photo-1539109132314-3475d24c2194?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://fashion3.orbit360.shop'
      },
      // Electronics
      {
        name: 'Tech Pro 1',
        slug: 'electronics_1',
        category: 'ELECTRONICS',
        description: 'Standard tech store with focus on specs.',
        version: '1.0.0',
        config: { colors: { primary: '#2563eb', secondary: '#ffffff', accent: '#1e40af' }, font: 'inter', layout: 'modern' },
        thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://electronics1.orbit360.shop'
      },
      {
        name: 'Gamer Pulse 2',
        slug: 'electronics_2',
        category: 'ELECTRONICS',
        description: 'Gaming focused tech layout with dark mode.',
        version: '1.0.0',
        config: { colors: { primary: '#dc2626', secondary: '#000000', accent: '#ffffff' }, font: 'inter', layout: 'gaming' },
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://electronics2.orbit360.shop'
      },
      {
        name: 'Minimal Tech 3',
        slug: 'electronics_3',
        category: 'ELECTRONICS',
        description: 'Sleek, minimalist tech gadgets design.',
        version: '1.0.0',
        config: { colors: { primary: '#3b82f6', secondary: '#f1f5f9', accent: '#0f172a' }, font: 'sans', layout: 'minimal' },
        thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://electronics3.orbit360.shop'
      },
      // Food
      {
        name: 'Gourmet 1',
        slug: 'food_1',
        category: 'FOOD_BEVERAGE',
        description: 'Warm, rustic food theme.',
        version: '1.0.0',
        config: { colors: { primary: '#ea580c', secondary: '#ffffff', accent: '#9a3412' }, font: 'serif', layout: 'fresh' },
        thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://food1.orbit360.shop'
      },
      {
        name: 'Green Table 2',
        slug: 'food_2',
        category: 'FOOD_BEVERAGE',
        description: 'Healthy and organic food focused design.',
        version: '1.0.0',
        config: { colors: { primary: '#16a34a', secondary: '#f0fdf4', accent: '#14532d' }, font: 'sans', layout: 'organic' },
        thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://food2.orbit360.shop'
      },
      {
        name: 'Street Flavors 3',
        slug: 'food_3',
        category: 'FOOD_BEVERAGE',
        description: 'Bold and energetic theme for fast food.',
        version: '1.0.0',
        config: { colors: { primary: '#e11d48', secondary: '#fff1f2', accent: '#881337' }, font: 'rounded', layout: 'bold' },
        thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://food3.orbit360.shop'
      },
      // Jewellery
      {
        name: 'Classic Bloom 1',
        slug: 'Jewellery_Upfront',
        category: 'JEWELLERY',
        description: 'Timeless jewellery design.',
        version: '1.0.0',
        config: { colors: { primary: '#8b5e3c', secondary: '#fffcf5', accent: '#4b2e1e' }, font: 'serif', layout: 'royal' },
        thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://jewellery1.orbit360.shop'
      },
      {
        name: 'Silver Luxe 2',
        slug: 'Jewellery_Upfront_2',
        category: 'JEWELLERY',
        description: 'Modern silver and diamond showcase.',
        version: '1.0.0',
        config: { colors: { primary: '#334155', secondary: '#f8fafc', accent: '#0f172a' }, font: 'serif', layout: 'modern' },
        thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://jewellery2.orbit360.shop'
      },
      {
        name: 'Pure Gold 3',
        slug: 'jewellery-upfront-1',
        category: 'JEWELLERY',
        description: 'Gold-focused luxurious layout.',
        version: '1.0.0',
        config: { colors: { primary: '#78350f', secondary: '#fffbeb', accent: '#451a03' }, font: 'serif', layout: 'gold' },
        thumbnail: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://jewellery3.orbit360.shop'
      },
      // Beauty
      {
        name: 'Beauty Care 1',
        slug: 'beauty-personal-care-upfront',
        category: 'COSMETICS',
        description: 'Clinical and clean beauty layout.',
        version: '1.0.0',
        config: { colors: { primary: '#ec4899', secondary: '#fdf2f8', accent: '#be185d' }, font: 'serif', layout: 'clean' },
        thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://beauty1.orbit360.shop'
      },
      {
        name: 'Glow Up 2',
        slug: 'beauty-theme-2',
        category: 'COSMETICS',
        description: 'Radiant and colorful beauty theme.',
        version: '1.0.0',
        config: { colors: { primary: '#db2777', secondary: '#ffffff', accent: '#831843' }, font: 'sans', layout: 'radiant' },
        thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfad054594?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://beauty2.orbit360.shop'
      },
      {
        name: 'Organic Blush 3',
        slug: 'beauty-theme-3',
        category: 'COSMETICS',
        description: 'Natural and organic beauty design.',
        version: '1.0.0',
        config: { colors: { primary: '#059669', secondary: '#ecfdf5', accent: '#064e3b' }, font: 'serif', layout: 'organic' },
        thumbnail: 'https://images.unsplash.com/photo-1556941151-09896150b490?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://beauty3.orbit360.shop'
      },
      // Toys
      {
        name: 'Toy World 1',
        slug: 'toys upfront',
        category: 'TOYSTORE',
        description: 'Large and playful toy store center.',
        version: '1.0.0',
        config: { colors: { primary: '#facc15', secondary: '#fefce8', accent: '#ca8a04' }, font: 'rounded', layout: 'playful' },
        thumbnail: 'https://images.unsplash.com/photo-1536640712361-bb1430225882?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://toys1.orbit360.shop'
      },
      {
        name: 'Happy Kids 2',
        slug: 'toy upfront 2',
        category: 'TOYSTORE',
        description: 'Fun and engaging kids brand layout.',
        version: '1.0.0',
        config: { colors: { primary: '#3b82f6', secondary: '#eff6ff', accent: '#1e40af' }, font: 'rounded', layout: 'kids' },
        thumbnail: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://toys2.orbit360.shop'
      },
      {
        name: 'Discovery Play 3',
        slug: 'toy upfront 3',
        category: 'TOYSTORE',
        description: 'Education focused toy theme.',
        version: '1.0.0',
        config: { colors: { primary: '#ef4444', secondary: '#fef2f2', accent: '#991b1b' }, font: 'sans', layout: 'discovery' },
        thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://toys3.orbit360.shop'
      },
      // Footwear
      {
        name: 'Sole Mate 1',
        slug: 'FOOTWEAR UPFRONT',
        category: 'FOOTWEAR',
        description: 'Premium footwear and sneakers layout.',
        version: '1.0.0',
        config: { colors: { primary: '#0f172a', secondary: '#ffffff', accent: '#334155' }, font: 'inter', layout: 'snkr' },
        thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
        previewUrl: 'https://footwear1.orbit360.shop'
      }
    ];

    console.log('Seeding All 22 Professional Themes...');
    for (const theme of allThemes) {
        try {
            const existing = await prisma.theme.findUnique({ where: { slug: theme.slug } });
            if (!existing) {
                await prisma.theme.create({
                    data: {
                        name: theme.name,
                        slug: theme.slug,
                        category: theme.category,
                        description: theme.description,
                        thumbnail: theme.thumbnail,
                        version: theme.version,
                        config: theme.config,
                        previewUrl: theme.previewUrl,
                        isActive: true
                    }
                });
                console.log(`Created theme: ${theme.name}`);
            } else {
                console.log(`Theme ${theme.slug} exists.`);
            }
        } catch (e) {
            console.error(`Error seeding ${theme.slug}:`, e.message);
        }
    }

    console.log('Seed completed');



  } catch (err) {

    console.error(err);
  } finally {
    await disconnectMongo();
    await prisma.$disconnect();
  }
};

seed();



