const fetch = require('node-fetch');

async function checkProductStructure() {
  try {
    const subdomain = 'fashion';
    console.log(`Checking products for ${subdomain}...`);
    const res = await fetch(`http://localhost:5000/api/storefront/public/${subdomain}/products`);
    const data = await res.json();
    
    if (data.data && data.data.products && data.data.products.length > 0) {
      console.log('Sample Product:', JSON.stringify(data.data.products[0], null, 2));
    } else {
      console.log('No products found or error:', data);
    }
  } catch (err) {
    console.error(err);
  }
}

checkProductStructure();
