const fs = require('fs');
const path = require('path');

const CATEGORY_PORTS = {
  'toys': 3004,
  'fashion': 3005,
  'electronics': 3006,
  'food': 3007,
  'footwear': 3008,
  'perfume': 3009,
  'beauty': 3010,
  'jewellery': 3017
};

const upfrontDir = 'D:\\orbit\\all_upfront';
let logs = [];

function updatePackageJson(dir, port) {
  const pkgPath = path.join(dir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const content = fs.readFileSync(pkgPath, 'utf8');
      const pkg = JSON.parse(content);
      
      let modified = false;
      if (pkg.scripts) {
        if (pkg.scripts.dev && !pkg.scripts.dev.includes(`-p ${port}`)) {
          pkg.scripts.dev = pkg.scripts.dev.replace(/-p \d+/, '').trim() + ` -p ${port}`;
          modified = true;
        }
        if (pkg.scripts.start && !pkg.scripts.start.includes(`-p ${port}`)) {
          pkg.scripts.start = pkg.scripts.start.replace(/-p \d+/, '').trim() + ` -p ${port}`;
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
        logs.push(`Updated ${pkgPath} to port ${port}`);
      }
    } catch (e) {
      logs.push(`Failed to process ${pkgPath}: ${e.message}`);
    }
  }
}

try {
  const categories = fs.readdirSync(upfrontDir);
  for (const dirName of categories) {
    const fullPath = path.join(upfrontDir, dirName);
    if (!fs.statSync(fullPath).isDirectory()) continue;
    
    let matched = false;
    for (const [key, port] of Object.entries(CATEGORY_PORTS)) {
      if (dirName.toLowerCase().includes(key)) {
        updatePackageJson(fullPath, port);
        matched = true;
        break;
      }
    }
  }
  logs.push('Finished assigning ports.');
} catch (e) {
  logs.push('Error: ' + e.message);
}

fs.writeFileSync('D:\\orbit\\assign_ports_log.txt', logs.join('\n'));
