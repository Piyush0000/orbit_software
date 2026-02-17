const fs = require('fs');
const content = fs.readFileSync('D:/orbit/all_upfront/electronics_2/lib/api.ts', 'utf8');

const themeConfigMatch = content.match(/static\s+async\s+getThemeConfig\s*\(\s*\)\s*\{[\s\S]*?\}/);
console.log('themeConfigMatch:', !!themeConfigMatch);

const useStoreMatch = content.match(/const\s*\[info,\s*custom\]\s*=\s*await\s*Promise\.all\(\s*\[([\s\S]*?)\]\s*\);/);
console.log('useStoreMatch:', !!useStoreMatch);
