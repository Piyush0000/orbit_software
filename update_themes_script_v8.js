const fs = require('fs');
const path = require('path');

const rootDir = 'D:/orbit/all_upfront';

function getFiles(dir, ext) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(getFiles(fullPath, ext));
            }
        } else if (file.endsWith(ext)) {
            results.push(fullPath);
        }
    });
    return results;
}

const apiFiles = getFiles(rootDir, 'api.ts');

apiFiles.forEach(apiPath => {
    let content = fs.readFileSync(apiPath, 'utf8');
    let original = content;

    // 1. Add getStoreSections to class
    if (!content.includes('getStoreSections')) {
        const insertionPoint = content.indexOf('static async getThemeConfig()');
        if (insertionPoint !== -1) {
            const nextBrace = content.indexOf('}', insertionPoint);
            const methodEnd = content.indexOf('}', nextBrace + 1); // rough guess for end of method
            if (methodEnd !== -1) {
                const afterMethod = methodEnd + 1;
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
                content = content.slice(0, afterMethod) + newMethod + content.slice(afterMethod);
            }
        }
    }

    // 2. Update useStore hook
    if (content.includes('export function useStore()') && !content.includes('setSections')) {
        content = content.replace('const [customization, setCustomization] = useState(null);', 'const [customization, setCustomization] = useState(null);\n  const [sections, setSections] = useState<any>({});');
        content = content.replace('[info, custom] = await Promise.all([', '[info, custom, sectionsData] = await Promise.all([');
        content = content.replace('StorefrontAPI.getStoreCustomization()', 'StorefrontAPI.getStoreCustomization(),\n          StorefrontAPI.getStoreSections()');
        content = content.replace('setCustomization(custom);', 'setCustomization(custom);\n        setSections(sectionsData);');
        content = content.replace('customization,', 'customization,\n    sections,');
    }

    if (content !== original) {
        fs.writeFileSync(apiPath, content);
        console.log(`Updated API: ${apiPath}`);
    }
});

const contextFiles = getFiles(rootDir, 'store-context.tsx');
contextFiles.forEach(ctxPath => {
    let content = fs.readFileSync(ctxPath, 'utf8');
    if (!content.includes('sections: any;')) {
        content = content.replace('customization: any;', 'customization: any;\n  sections: any;');
        fs.writeFileSync(ctxPath, content);
        console.log(`Updated Context: ${ctxPath}`);
    }
});
