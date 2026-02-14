const fs = require('fs');
const path = require('path');

const themesDir = 'D:/orbit/all_upfront';
const folders = fs.readdirSync(themesDir).filter(f => fs.statSync(path.join(themesDir, f)).isDirectory());

folders.forEach(folder => {
    const folderPath = path.join(themesDir, folder);
    console.log(`Checking theme: ${folder}`);
    
    // 1. Update api.ts
    let apiPath = path.join(folderPath, 'lib/api.ts');
    if (!fs.existsSync(apiPath)) {
        apiPath = path.join(folderPath, 'src/lib/api.ts');
    }
    
    if (fs.existsSync(apiPath)) {
        let content = fs.readFileSync(apiPath, 'utf8');
        
        // Add getStoreSections method if not exists
        if (!content.includes('getStoreSections')) {
            const themeConfigMethod = 'static async getThemeConfig() {';
            const methodIndex = content.indexOf(themeConfigMethod);
            if (methodIndex !== -1) {
                const closingBraceIndex = content.indexOf('}', methodIndex);
                if (closingBraceIndex !== -1) {
                    const nextMethodIndex = content.indexOf('}', methodIndex) + 1;
                    const newMethod = `

  // Get homepage sections with products
  static async getStoreSections() {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/sections\`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch sections');
      return data.data;
    } catch (error) {
      console.error('Error fetching sections:', error);
      return {};
    }
  }`;
                    content = content.slice(0, nextMethodIndex) + newMethod + content.slice(nextMethodIndex);
                }
            }
        }
        
        // Update useStore hook
        if (content.includes('export function useStore()') && !content.includes('setSections')) {
            content = content.replace(
                /const \[customization, setCustomization\] = useState\(null\);/,
                'const [customization, setCustomization] = useState(null);\n  const [sections, setSections] = useState({});'
            );
            content = content.replace(
                /const \[info, custom\] = await Promise\.all\(\[/,
                'const [info, custom, sectionsData] = await Promise.all(['
            );
            content = content.replace(
                /StorefrontAPI\.getStoreCustomization\(\)/,
                'StorefrontAPI.getStoreCustomization(),\n          StorefrontAPI.getStoreSections()'
            );
            content = content.replace(
                /setCustomization\(custom\);/,
                'setCustomization(custom);\n        setSections(sectionsData);'
            );
            content = content.replace(
                /customization,/,
                'customization,\n    sections,'
            );
        }
        
        fs.writeFileSync(apiPath, content);
        console.log(`Updated api.ts in ${folder}`);
    }

    // 2. Update store-context.tsx
    let contextPath = path.join(folderPath, 'context/store-context.tsx');
    if (!fs.existsSync(contextPath)) {
        contextPath = path.join(folderPath, 'src/context/store-context.tsx');
    }
    
    if (fs.existsSync(contextPath)) {
        let content = fs.readFileSync(contextPath, 'utf8');
        if (!content.includes('sections: any;')) {
            content = content.replace(
                /customization: any;/,
                'customization: any;\n  sections: any;'
            );
            fs.writeFileSync(contextPath, content);
            console.log(`Updated store-context.tsx in ${folder}`);
        }
    }
});
