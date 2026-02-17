const axios = require('axios');

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:5000/api/admin/auth/login', {
      email: 'admin@orbit.com',
      password: 'admin123'
    });
    console.log('LOGIN SUCCESS! Status:', response.status);
    console.log('Token received:', !!response.data.token);
  } catch (err) {
    console.error('LOGIN FAILED!');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', JSON.stringify(err.response.data));
    } else {
      console.error('Error:', err.message);
    }
  }
}

testLogin();
