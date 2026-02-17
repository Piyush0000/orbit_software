#!/usr/bin/env node

/**
 * Meta Integration Database Migration Script
 * 
 * This script helps migrate the database to include Meta integration fields.
 * Run this after updating the Prisma schema.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Meta Integration Database Migration\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: .env file not found!');
  console.log('Please create a .env file based on .env.example');
  process.exit(1);
}

// Check if Prisma schema exists
const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
if (!fs.existsSync(schemaPath)) {
  console.error('❌ Error: Prisma schema not found!');
  process.exit(1);
}

console.log('📋 Pre-migration checklist:');
console.log('  ✓ .env file exists');
console.log('  ✓ Prisma schema exists\n');

try {
  // Step 1: Generate Prisma Client
  console.log('📦 Step 1: Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('  ✓ Prisma Client generated\n');

  // Step 2: Create migration
  console.log('📝 Step 2: Creating database migration...');
  execSync('npx prisma migrate dev --name add_meta_integration_fields', { 
    stdio: 'inherit' 
  });
  console.log('  ✓ Migration created and applied\n');

  // Step 3: Verify migration
  console.log('🔍 Step 3: Verifying migration...');
  execSync('npx prisma migrate status', { stdio: 'inherit' });
  console.log('  ✓ Migration verified\n');

  console.log('✅ Meta integration database migration completed successfully!\n');
  console.log('Next steps:');
  console.log('  1. Configure Meta credentials in .env file');
  console.log('  2. Start the server: npm run dev');
  console.log('  3. Test the Meta integration in the frontend\n');
  console.log('📚 Documentation:');
  console.log('  - Quick Start: ../QUICK_START.md');
  console.log('  - Setup Guide: ../META_INTEGRATION_SETUP.md');
  console.log('  - Summary: ../INTEGRATION_SUMMARY.md\n');

} catch (error) {
  console.error('❌ Migration failed!');
  console.error('\nError details:', error.message);
  console.log('\nTroubleshooting:');
  console.log('  1. Ensure PostgreSQL is running');
  console.log('  2. Check DATABASE_URL in .env is correct');
  console.log('  3. Verify database user has necessary permissions');
  console.log('  4. Try running migrations manually:');
  console.log('     npx prisma migrate dev --name add_meta_fields');
  process.exit(1);
}
