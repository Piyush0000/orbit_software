const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkPendingMerchants() {
  try {
    console.log('🔍 Checking for pending merchants...\n');

    // Count all stores
    const totalStores = await prisma.store.count();
    console.log(`📊 Total Stores: ${totalStores}`);

    // Count by provisioning status
    const pendingCount = await prisma.store.count({
      where: { provisioningStatus: 'PENDING' }
    });
    const completedCount = await prisma.store.count({
      where: { provisioningStatus: 'COMPLETED' }
    });

    console.log(`⏳ Pending: ${pendingCount}`);
    console.log(`✅ Completed: ${completedCount}\n`);

    // List all stores with details
    const allStores = await prisma.store.findMany({
      include: {
        user: {
          select: {
            email: true,
            fullName: true
          }
        },
        onboarding: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('📋 All Stores:');
    console.log('─────────────────────────────────────────────────────────────');
    
    if (allStores.length === 0) {
      console.log('❌ No stores found in database!\n');
      console.log('💡 Tip: You need to register merchants via the onboarding app:');
      console.log('   http://localhost:3001\n');
      return;
    }

    allStores.forEach((store, index) => {
      console.log(`\n${index + 1}. ${store.name}`);
      console.log(`   ID: ${store.id}`);
      console.log(`   Subdomain: ${store.subdomain}`);
      console.log(`   Email: ${store.user.email}`);
      console.log(`   Owner: ${store.user.fullName}`);
      console.log(`   Category: ${store.category || 'Not set'}`);
      console.log(`   Status: ${store.provisioningStatus}`);
      console.log(`   Onboarding: ${store.onboardingStatus}`);
      console.log(`   Active: ${store.isActive ? '✅' : '❌'}`);
      console.log(`   Theme: ${store.themeId || 'Not assigned'}`);
      console.log(`   Created: ${store.createdAt.toISOString()}`);
    });

    console.log('\n─────────────────────────────────────────────────────────────\n');

    if (pendingCount === 0 && completedCount === 0) {
      console.log('💡 No merchants to provision. Create some via:');
      console.log('   1. Onboarding app: http://localhost:3001');
      console.log('   2. Or run: node create-test-merchants.js\n');
    } else if (pendingCount === 0) {
      console.log('✅ All merchants have been provisioned!');
      console.log('   Visit admin provisioning page to see it empty.\n');
    } else {
      console.log(`🎯 ${pendingCount} merchant(s) ready to provision!`);
      console.log('   Go to: http://localhost:3000/dashboard/provisioning\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkPendingMerchants();
