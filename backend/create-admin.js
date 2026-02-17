const bcrypt = require('bcryptjs');
const { prisma } = require('./src/config/database');
const { ADMIN_ROLES } = require('./src/config/constants');

async function createAdmin() {
  try {
    const email = 'admin@orbit360.com';
    const password = 'admin123'; // Simple password for testing
    
    console.log('🔍 Checking if admin exists...');
    const existing = await prisma.admin.findUnique({ where: { email } });
    
    if (existing) {
      console.log('⚠️  Admin already exists. Updating password...');
      const hashed = await bcrypt.hash(password, 10);
      await prisma.admin.update({
        where: { email },
        data: { password: hashed }
      });
      console.log('✅ Admin password updated!');
    } else {
      console.log('➕ Creating new admin user...');
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.admin.create({
        data: {
          email,
          password: hashed,
          fullName: 'Admin User',
          role: ADMIN_ROLES.SUPER_ADMIN
        }
      });
      console.log('✅ Admin user created!');
      console.log('   ID:', user.id);
    }
    
    console.log('\n📋 Login Credentials:');
    console.log('   Email:', email);
    console.log('   Password:', password);
    console.log('\n🌐 Login at: http://localhost:3000/login');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
