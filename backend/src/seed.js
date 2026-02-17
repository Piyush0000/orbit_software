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

    // Seed Fragrance Themes
    const fragranceThemes = [
      {
        name: 'Fragrance Rose Essence',
        slug: 'fragrance-rose-essence',
        category: 'PERFUME',
        description: 'A soft, ethereal design with rose gold accents and elegant typography. Perfect for feminine and floral scents.',
        version: '1.0.0',
        config: { colors: { primary: '#fb7185', secondary: '#fff1f2', accent: '#9f1239' }, font: 'serif', layout: 'etheral' },
        thumbnail: '/themes/thumbnails/fragrance-rose.png',
        previewUrl: 'https://perfume1.orbit360.shop'
      },
      {
        name: 'Fragrance Essence Noir',
        slug: 'fragrance-essence-noir',
        category: 'PERFUME',
        description: 'A luxurious dark theme with gold accents. Ideal for premium, unisex, or oud-based collections.',
        version: '1.0.0',
        config: { colors: { primary: '#f59e0b', secondary: '#09090b', accent: '#ffffff' }, font: 'serif', layout: 'luxury' },
        thumbnail: '/themes/thumbnails/fragrance-noir.png',
        previewUrl: 'https://perfume2.orbit360.shop'
      },
      {
        name: 'Fragrance Botanical Green',
        slug: 'fragrance-botanical-green',
        category: 'PERFUME',
        description: 'An organic, fresh theme centered around nature. Features emerald greens and rounded, soft shapes.',
        version: '1.0.0',
        config: { colors: { primary: '#047857', secondary: '#ecfdf5', accent: '#065f46' }, font: 'sans', layout: 'natural' },
        thumbnail: '/themes/thumbnails/fragrance-green.png',
        previewUrl: 'https://perfume3.orbit360.shop'
      }
    ];

    const themeService = require('./services/themeService');
    console.log('Seeding Fragrance Themes...');
    for (const theme of fragranceThemes) {
        try {
            // We use direct prisma check to avoid service overhead if simplified
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



