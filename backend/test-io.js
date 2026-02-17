const fs = require('fs');
fs.writeFileSync('test_io.txt', 'IO WORKED at ' + new Date().toISOString());
console.log('Test IO script finished');
