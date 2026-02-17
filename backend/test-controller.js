const { createMerchant } = require('./src/controllers/adminMerchantProvisioningController');
const { prisma } = require('./src/config/database');

async function testCreateMerchant() {
  const req = {
    body: {
      merchantName: 'Test Merchant ' + Date.now(),
      email: 'test' + Date.now() + '@example.com',
      password: 'password123',
      category: 'electronics',
      theme: 'electronics-upfront',
      subdomain: 'test' + Date.now()
    },
    admin: { id: 'test-admin' }
  };

  const res = {
    status: function(s) { this.statusCode = s; return this; },
    json: function(j) { console.log('Response:', JSON.stringify(j, null, 2)); return this; }
  };

  const next = (err) => {
    if (err) console.error('Next called with error:', err);
  };

  try {
    await createMerchant(req, res, next);
  } catch (error) {
    console.error('Test failed with error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCreateMerchant();
