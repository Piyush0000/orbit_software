const fs = require('fs');
fs.writeFileSync('D:/orbit/test_success.txt', 'Script ran at ' + new Date());
console.log('Test file written');
