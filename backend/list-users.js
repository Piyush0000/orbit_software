const { prisma } = require('./src/config/database');

async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        emailVerified: true,
        createdAt: true
      }
    });

    console.log(`\n📊 Found ${users.length} user(s) in database:\n`);
    
    if (users.length === 0) {
      console.log('❌ No users found! Database might be empty or connection issue.');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Name: ${user.fullName}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Verified: ${user.emailVerified}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listUsers();
