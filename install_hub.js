const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log('Running npm install in hub...');
  execSync('npm install', { cwd: 'd:/orbit/templates/orbit_storefront_hub' });
  console.log('npm install finished.');
} catch (e) {
  console.error('npm install failed: ' + e.message);
  fs.writeFileSync('npm_install_error.txt', e.message + '\n' + e.stderr.toString());
}
