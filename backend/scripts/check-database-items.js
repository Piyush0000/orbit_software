const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkThemes() {
  try {
    const themes = await prisma.theme.findMany();
    console.log('Themes in database:');
    console.log(JSON.stringify(themes.map(t => ({ name: t.name, slug: t.slug })), null, 2));
    
    const categories = await prisma.category?.findMany() || [];
    console.log('\nCategories in database:');
    console.log(JSON.stringify(categories, null, 2));
  } catch (error) {
    console.error('Error fetching themes/categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkThemes();
