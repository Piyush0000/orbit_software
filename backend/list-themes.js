const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkThemes() {
  try {
    const themes = await prisma.theme.findMany();
    console.log('--- Themes in Database ---');
    themes.forEach(t => {
      console.log(`- [${t.category}] ${t.name} (Slug: ${t.slug})`);
    });
    console.log(`Total: ${themes.length} themes.`);
  } catch (error) {
    console.error('Error fetching themes:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkThemes();
