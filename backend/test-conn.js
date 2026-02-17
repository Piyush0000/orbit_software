const net = require('net');
const client = new net.Socket();
client.setTimeout(2000);
client.on('connect', () => {
    console.log('CONNECTED TO 5432');
    process.exit(0);
});
client.on('error', (err) => {
    console.log('ERROR: ' + err.message);
    process.exit(1);
});
client.on('timeout', () => {
    console.log('TIMEOUT');
    process.exit(1);
});
client.connect(5432, '127.0.0.1');
