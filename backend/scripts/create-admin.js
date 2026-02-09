const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@orbit360.com' }
    });

    if (existingAdmin) {
      console.log('✅ Admin already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Full Name:', existingAdmin.fullName);
      console.log('Role:', existingAdmin.role);
      console.log('\nTo reset password, delete this admin and run script again.');
      return;
    }

    // Create new admin
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

    console.log('✅ Admin created successfully!');
    console.log('\n📧 Email:', admin.email);
    console.log('🔑 Password: admin123');
    console.log('👤 Full Name:', admin.fullName);
    console.log('🎭 Role:', admin.role);
    console.log('\n🚀 You can now login to Orbit Admin!');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
