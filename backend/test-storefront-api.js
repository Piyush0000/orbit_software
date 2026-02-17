const fetch = require('node-fetch');

async function testStorefrontAPI() {
  try {
    console.log('Testing storefront API endpoint...\n');
    
    // Test 1: Check if backend is running
    console.log('1. Checking if backend is running on port 5000...');
    const healthCheck = await fetch('http://localhost:5000/api/health').catch(() => null);
    if (!healthCheck) {
      console.log('❌ Backend is not running on port 5000');
      console.log('   Please start the backend with: npm run dev\n');
      return;
    }
    console.log('✅ Backend is running\n');
    
    // Test 2: Test the resolve endpoint
    console.log('2. Testing /api/storefront/resolve endpoint...');
    const response = await fetch('http://localhost:5000/api/storefront/resolve?domain=demo');
    
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    const data = await response.json();
    console.log('   Response:', JSON.stringify(data, null, 2));
    
    if (response.ok && data.success) {
      console.log('\n✅ Storefront API is working!');
      console.log(`   Found store: ${data.store.name}`);
      console.log(`   Subdomain: ${data.store.subdomain}`);
      console.log(`   Theme: ${data.store.theme}`);
      console.log(`   Category: ${data.store.category}`);
    } else {
      console.log('\n⚠️  Store not found in database');
      console.log('   This means you need to create a merchant with subdomain "demo" in your database');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testStorefrontAPI();
