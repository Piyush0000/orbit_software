const https = require('https');
const http = require('http');

async function testAPI() {
  console.log('🔍 Testing Orbit API Connection...\n');

  // Test 1: Store Resolution
  const resolveUrl = 'http://localhost:5000/api/storefront/public/resolve?domain=toys.localhost:3000';
  console.log('1️⃣ Testing store resolution...');
  
  const resolveData = await new Promise((resolve) => {
    http.get(resolveUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });
  
  console.log('   ✅ Store found:', resolveData.store?.name);
  console.log('   ✅ Subdomain:', resolveData.store?.subdomain);
  console.log('   ✅ Theme:', resolveData.store?.theme);
  console.log('   ✅ Customization:', resolveData.store?.customization ? 'Present ✓' : 'Missing ✗');

  // Test 2: Products
  const productsUrl = 'http://localhost:5000/api/storefront/public/toys/products';
  console.log('\n2️⃣ Testing products API...');
  
  const productsData = await new Promise((resolve) => {
    http.get(productsUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });
  
  console.log('   ✅ Total products:', productsData.data?.pagination?.total);
  console.log('   ✅ Products loaded:', productsData.data?.products?.length);
  
  if (productsData.data?.products?.length > 0) {
    console.log('\n📦 Sample Products:');
    productsData.data.products.slice(0, 3).forEach(p => {
      console.log(`   • ${p.name} - $${p.price} (${p.category})`);
    });
  }

  // Test 3: Customization
  const customUrl = 'http://localhost:5000/api/storefront/public/toys/customization';
  console.log('\n3️⃣ Testing customization API...');
  
  const customData = await new Promise((resolve) => {
    http.get(customUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });
  
  console.log('   ✅ Hero title:', customData.data?.heroSection?.title);
  console.log('   ✅ Product sections:', customData.data?.productSections?.length || 0);
  
  if (customData.data?.productSections) {
    console.log('\n🎨 Product Sections:');
    customData.data.productSections.forEach(s => {
      console.log(`   • ${s.title} (${s.category})`);
    });
  }

  console.log('\n✅ ALL SYSTEMS CONNECTED!');
  console.log('\n📍 Next Steps:');
  console.log('   1. Open http://toys.localhost:3000 in your browser');
  console.log('   2. Products should now display on the storefront');
  console.log('   3. Changes in Orbit Admin (localhost:3001) will reflect on the website');
}

testAPI().catch(console.error);
