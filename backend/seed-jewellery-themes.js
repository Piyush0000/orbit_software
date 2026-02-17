const themeService = require('./src/services/themeService');

async function seed() {
    console.log('Starting Jewellery themes seed...');
    try {
        await themeService.seedDefaultThemes();
        console.log('Jewellery themes seeded successfully!');
    } catch (error) {
        console.error('Seed failed:', error);
    }
}

seed();
