const fs = require('fs');
const path = require('path');

function disableNextFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      disableNextFiles(fullPath);
    } else {
      if (file === 'page.tsx' || file === 'layout.tsx' || file === 'loading.tsx' || file === 'error.tsx' || file === 'not-found.tsx' || file === 'route.ts') {
        const newPath = fullPath + '.bak';
        try {
          if (fs.existsSync(newPath)) fs.unlinkSync(newPath); // Delete old backup if exists
          fs.renameSync(fullPath, newPath);
          console.log(`Renamed ${file} to ${file}.bak`);
        } catch (e) {
          console.error(`Failed to rename ${file}:`, e);
        }
      }
    }
  }
}

['app', 'components', 'context', 'lib'].forEach(d => disableNextFiles(path.join(__dirname, d)));
