const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function setMerchantPassword() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('❌ Usage: node set-merchant-password.js <email> <password>');
    console.log('');
    console.log('Example:');
    console.log('  node set-merchant-password.js testing@gmail.com mypassword123');
    process.exit(1);
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        stores: {
          select: {
            id: true,
            name: true,
            subdomain: true
          }
        }
      }
    });

    if (!user) {
      console.log(`❌ User not found: ${email}`);
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    console.log('✅ Password updated successfully!\n');
    console.log('───────────────────────────────────────');
    console.log(`User: ${user.fullName}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`Password: ${password}`);
    
    if (user.stores.length > 0) {
      console.log('\nStores:');
      user.stores.forEach((store, index) => {
        console.log(`  ${index + 1}. ${store.name}`);
        console.log(`     Subdomain: ${store.subdomain}`);
      });
    }
    
    console.log('\n───────────────────────────────────────');
    console.log('\n🔐 Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Dashboard: http://localhost:3003`);
    console.log('\n✅ Ready to use!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setMerchantPassword();
