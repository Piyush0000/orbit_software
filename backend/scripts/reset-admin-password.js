const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    const newPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const admin = await prisma.admin.update({
      where: { email: 'admin@orbit360.com' },
      data: { password: hashedPassword }
    });

    console.log('✅ Admin password reset successfully!');
    console.log('\n📧 Email:', admin.email);
    console.log('🔑 New Password: admin123');
    console.log('👤 Full Name:', admin.fullName);
    console.log('🎭 Role:', admin.role);
    console.log('\n🚀 You can now login to Orbit Admin!');
    console.log('\nLogin at: http://localhost:3001');

  } catch (error) {
    console.error('❌ Error resetting password:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();
