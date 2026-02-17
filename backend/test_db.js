const { connectMongo } = require('./src/config/database');
const env = require('./src/config/env');

console.log('Testing connection to MongoDB...');
connectMongo().then(() => {
    console.log('MongoDB Connected!');
    process.exit(0);
}).catch(err => {
    console.error('MongoDB Connection Failed:', err);
    process.exit(1);
});
