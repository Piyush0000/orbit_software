const fs = require('fs');
const path = require('path');

const rootDir = 'D:/orbit/all_upfront';

function getApiFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(getApiFiles(fullPath));
            }
        } else if (file.endsWith('api.ts')) {
            results.push(fullPath);
        }
    });
    return results;
}

const apiFiles = getApiFiles(rootDir);

apiFiles.forEach(apiPath => {
    console.log(`Processing: ${apiPath}`);
    let content = fs.readFileSync(apiPath, 'utf8');
    let original = content;
    
    // 1. Add getStoreSections to StorefrontAPI class
    if (!content.includes('getStoreSections')) {
        const nextMethodMatch = content.match(/static async getThemeConfig\(\s*.*?\)\s*\{/);
        if (nextMethodMatch) {
            const nextMethodIndex = nextMethodMatch.index;
            const closingBraceIndex = content.indexOf('}', nextMethodIndex);
            if (closingBraceIndex !== -1) {
                const afterClosingBrace = closingBraceIndex + 1;
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
                content = content.slice(0, afterClosingBrace) + newMethod + content.slice(afterClosingBrace);
            }
        }
    }
    
    // 2. Update useStore hook
    if (content.includes('export function useStore()') && !content.includes('setSections')) {
        // Sections state
        content = content.replace(
            /const \[customization,\s*setCustomization\]\s*=\s*useState\(null\);/,
            'const [customization, setCustomization] = useState(null);\n  const [sections, setSections] = useState<any>({});'
        );
        
        // Promise.all - very flexible match
        content = content.replace(
            /const\s*\[info,\s*custom\]\s*=\s*await\s*Promise\.all\(\s*\[\s*StorefrontAPI\.getStoreInfo\(\),\s*StorefrontAPI\.getStoreCustomization\(\)\s*\]\s*\);/,
            'const [info, custom, sectionsData] = await Promise.all([\n          StorefrontAPI.getStoreInfo(),\n          StorefrontAPI.getStoreCustomization(),\n          StorefrontAPI.getStoreSections()\n        ]);'
        );

        // State update
        content = content.replace(
            /setStoreInfo\(info\);\s*setCustomization\(custom\);/,
            'setStoreInfo(info);\n        setCustomization(custom);\n        setSections(sectionsData);'
        );
        
        // Return object
        content = content.replace(
            /customization,/,
            'customization,\n    sections,'
        );
    }
    
    if (content !== original) {
        fs.writeFileSync(apiPath, content);
        console.log(`Updated api.ts in ${apiPath}`);
    } else {
        console.log(`No changes needed for ${apiPath}`);
    }
    
    // Update store-context.tsx
    const folderDir = path.dirname(path.dirname(apiPath));
    const possibleContextPaths = [
        path.join(folderDir, 'context/store-context.tsx'),
        path.join(folderDir, 'src/context/store-context.tsx'),
        path.join(path.dirname(folderDir), 'context/store-context.tsx'),
        path.join(path.dirname(folderDir), 'src/context/store-context.tsx')
    ];
    
    possibleContextPaths.forEach(contextPath => {
        if (fs.existsSync(contextPath)) {
            let contextContent = fs.readFileSync(contextPath, 'utf8');
            if (!contextContent.includes('sections: any;')) {
                contextContent = contextContent.replace(
                    /customization: any;/,
                    'customization: any;\n  sections: any;'
                );
                fs.writeFileSync(contextPath, contextContent);
                console.log(`Updated context in ${contextPath}`);
            }
        }
    });
});
