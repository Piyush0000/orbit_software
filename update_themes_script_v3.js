const fs = require('fs');
const path = require('path');

const rootDir = 'D:/orbit/all_upfront';

function getApiFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(getApiFiles(file));
            }
        } else if (file.endsWith('api.ts')) {
            results.push(file);
        }
    });
    return results;
}

const apiFiles = getApiFiles(rootDir);

apiFiles.forEach(apiPath => {
    console.log(`Processing: ${apiPath}`);
    let content = fs.readFileSync(apiPath, 'utf8');
    
    // 1. Add getStoreSections to StorefrontAPI class
    if (!content.includes('getStoreSections')) {
        const classMatch = /static async getThemeConfig\(\)\s*\{[\s\S]*?\n\s*\}/;
        content = content.replace(classMatch, (match) => {
            return match + `

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
        });
    }
    
    // 2. Update useStore hook
    if (content.includes('export function useStore()') && !content.includes('setSections')) {
        // Add sections state
        content = content.replace(
            /(const \[customization, setCustomization\] = useState\(null\);)/,
            '$1\n  const [sections, setSections] = useState({});'
        );
        
        // Update Promise.all
        content = content.replace(
            /(const \[info, custom\] = await Promise\.all\(\[)/,
            '$1\n          StorefrontAPI.getStoreInfo(),\n          StorefrontAPI.getStoreCustomization(),\n          StorefrontAPI.getStoreSections()'
        );
        
        // Remove the old lines in Promise.all if they were different
        content = content.replace(/StorefrontAPI\.getStoreInfo\(\),\s*StorefrontAPI\.getStoreCustomization\(\)/, '');
        // Fix double entries in Promise.all if any
        content = content.replace(/StorefrontAPI\.getStoreInfo\(\),\s*\n\s*StorefrontAPI\.getStoreInfo\(\)/, 'StorefrontAPI.getStoreInfo()');
        
        // Update state sets
        content = content.replace(
            /(setCustomization\(custom\);)/,
            '$1\n        setSections(sectionsData);'
        );
        
        // Update returned object
        content = content.replace(
            /(customization,)/,
            '$1\n    sections,'
        );
        
        // Fix the Promise.all destructuring if it was [info, custom]
        if (content.includes('[info, custom] = await Promise.all')) {
            content = content.replace('[info, custom] = await Promise.all', '[info, custom, sectionsData] = await Promise.all');
        }
    }
    
    fs.writeFileSync(apiPath, content);
    
    // Now update store-context.tsx
    const folderDir = path.dirname(path.dirname(apiPath));
    let contextPath = path.join(folderDir, 'context/store-context.tsx');
    if (!fs.existsSync(contextPath)) {
        contextPath = path.join(folderDir, 'src/context/store-context.tsx');
    }
    
    if (fs.existsSync(contextPath)) {
        console.log(`Processing context: ${contextPath}`);
        let contextContent = fs.readFileSync(contextPath, 'utf8');
        if (!contextContent.includes('sections: any;')) {
            contextContent = contextContent.replace(
                /(customization: any;)/,
                '$1\n  sections: any;'
            );
            fs.writeFileSync(contextPath, contextContent);
        }
    }
});
