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

    console.log('Seed completed');
  } catch (err) {
    console.error(err);
  } finally {
    await disconnectMongo();
    await prisma.$disconnect();
  }
};

seed();



