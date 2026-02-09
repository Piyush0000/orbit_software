const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function debugAdmin() {
  try {
    console.log('🔍 Checking admin accounts...\n');
    
    const admins = await prisma.admin.findMany();
    
    if (admins.length === 0) {
      console.log('❌ No admin accounts found!');
      console.log('\nCreating admin account...');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = await prisma.admin.create({
        data: {
          email: 'admin@orbit360.com',
          password: hashedPassword,
          fullName: 'Super Admin',
          role: 'SUPER_ADMIN',
          isActive: true
        }
      });
      
      console.log('✅ Admin created!');
      console.log('📧 Email:', admin.email);
      console.log('🔑 Password: admin123');
      return;
    }
    
    console.log(`Found ${admins.length} admin(s):\n`);
    
    for (const admin of admins) {
      console.log('─────────────────────────────');
      console.log('📧 Email:', admin.email);
      console.log('👤 Name:', admin.fullName);
      console.log('🎭 Role:', admin.role);
      console.log('✅ Active:', admin.isActive);
      console.log('🔑 Password Hash:', admin.password.substring(0, 20) + '...');
      
      // Test if password is 'admin123'
      const isMatch = await bcrypt.compare('admin123', admin.password);
      console.log('🔐 Password "admin123" works:', isMatch ? '✅ YES' : '❌ NO');
      
      if (!isMatch) {
        console.log('\n⚠️  Resetting password to "admin123"...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await prisma.admin.update({
          where: { id: admin.id },
          data: { password: hashedPassword }
        });
        console.log('✅ Password reset complete!');
      }
      console.log('');
    }
    
    console.log('─────────────────────────────');
    console.log('\n🚀 You can now login with:');
    console.log('📧 Email: admin@orbit360.com');
    console.log('🔑 Password: admin123');
    console.log('\n🌐 Login at: http://localhost:3001');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

debugAdmin();
