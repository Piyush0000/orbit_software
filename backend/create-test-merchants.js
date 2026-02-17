const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testMerchants = [
  {
    name: 'Tech Haven',
    email: 'owner@techhaven.com',
    category: 'Electronics',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+1 555 123 4567',
    address: '456 Tech Street',
    city: 'San Francisco',
    country: 'USA'
  },
  {
    name: 'Bella Boutique',
    email: 'owner@bellaboutique.com',
    category: 'Fashion',
    firstName: 'Emily',
    lastName: 'Chen',
    phone: '+1 555 234 5678',
    address: '789 Fashion Ave',
    city: 'New York',
    country: 'USA'
  },
  {
    name: 'Sparkle & Shine',
    email: 'owner@sparkleshine.com',
    category: 'Jewelry',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    phone: '+1 555 345 6789',
    address: '321 Jewel Lane',
    city: 'Los Angeles',
    country: 'USA'
  }
];

async function createTestMerchants() {
  try {
    console.log('🚀 Creating test merchants...\n');

    for (const merchant of testMerchants) {
      // Generate subdomain
      const subdomain = merchant.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if already exists
      const existing = await prisma.store.findUnique({
        where: { subdomain }
      });

      if (existing) {
        console.log(`⏭️  Skipping "${merchant.name}" - already exists`);
        continue;
      }

      // Check if email exists
      const existingUser = await prisma.user.findUnique({
        where: { email: merchant.email }
      });

      if (existingUser) {
        console.log(`⏭️  Skipping "${merchant.name}" - email already exists`);
        continue;
      }

      // Create user
      const user = await prisma.user.create({
        data: {
          email: merchant.email,
          password: 'temp-password', // In production, hash this
          fullName: `${merchant.firstName} ${merchant.lastName}`,
          role: 'MERCHANT'
        }
      });

      // Create store
      const store = await prisma.store.create({
        data: {
          userId: user.id,
          name: merchant.name,
          subdomain,
          description: `${merchant.category} store`,
          category: merchant.category,
          onboardingStatus: 'NOT_STARTED',
          provisioningStatus: 'PENDING'
        }
      });

      // Create onboarding record
      await prisma.brandOnboarding.create({
        data: {
          storeId: store.id,
          status: 'NOT_STARTED',
          currentStep: 1,
          completionPercent: 0
        }
      });

      console.log(`✅ Created: ${merchant.name}`);
      console.log(`   Email: ${merchant.email}`);
      console.log(`   Subdomain: ${subdomain}`);
      console.log(`   Category: ${merchant.category}\n`);
    }

    console.log('🎉 Done! Check pending merchants:');
    console.log('   http://localhost:3000/dashboard/provisioning\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestMerchants();
