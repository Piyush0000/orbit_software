const fs = require('fs');
const path = require('path');

const dirs = ['app', 'components', 'context', 'lib', '.next'];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Deleted ${dir}`);
    } catch (e) {
      console.error(`Failed to delete ${dir}:`, e);
    }
  } else {
    console.log(`${dir} not found`);
  }
});
