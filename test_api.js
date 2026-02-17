const axios = require('axios');

async function test() {
    try {
        const res = await axios.get('http://localhost:5000/api/storefront/resolve?domain=fashion');
        console.log('SUCCESS:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('ERROR:', err.response?.status, err.response?.data || err.message);
    }
}

test();
