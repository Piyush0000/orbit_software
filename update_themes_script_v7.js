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
    let content = fs.readFileSync(apiPath, 'utf8');
    let original = content;

    // 1. Add getStoreSections to StorefrontAPI
    if (!content.includes('getStoreSections')) {
        // Find the theme config method
        const themeConfigMatch = content.match(/static\s+async\s+getThemeConfig\s*\(\s*\)\s*\{[\s\S]*?\}/);
        if (themeConfigMatch) {
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
            content = content.replace(themeConfigMatch[0], themeConfigMatch[0] + newMethod);
        }
    }

    // 2. Add sections state to useStore
    if (content.includes('export function useStore()') && !content.includes('setSections')) {
        // Add state
        content = content.replace(
            /(const\s*\[customization,\s*setCustomization\]\s*=\s*useState\(null\);)/,
            '$1\n  const [sections, setSections] = useState<any>({});'
        );

        // Update Promise.all (handle info/custom pattern)
        content = content.replace(
            /const\s*\[info,\s*custom\]\s*=\s*await\s*Promise\.all\(\s*\[([\s\S]*?)\]\s*\);/,
            (match, inner) => {
                if (inner.includes('getStoreSections')) return match;
                return `const [info, custom, sectionsData] = await Promise.all([${inner},\n          StorefrontAPI.getStoreSections()\n        ]);`;
            }
        );

        // Update state assignments
        content = content.replace(
            /(setCustomization\(custom\);)/,
            '$1\n        setSections(sectionsData);'
        );

        // Update return values
        content = content.replace(
            /(customization,)/,
            '$1\n    sections,'
        );
    }

    if (content !== original) {
        fs.writeFileSync(apiPath, content);
        console.log(`Updated ${apiPath}`);
    }

    // Update store-context.tsx
    // Usually in context/store-context.tsx or src/context/store-context.tsx relative to root
    const themeFolder = apiPath.split(/[\/\\]lib[\/\\]/)[0].split(/[\/\\]src[\/\\]/)[0];
    const possibleContextPaths = [
        path.join(themeFolder, 'context/store-context.tsx'),
        path.join(themeFolder, 'src/context/store-context.tsx'),
        path.join(themeFolder, '../context/store-context.tsx'),
        path.join(themeFolder, '../src/context/store-context.tsx')
    ];

    possibleContextPaths.forEach(ctxPath => {
        if (fs.existsSync(ctxPath)) {
            let ctxContent = fs.readFileSync(ctxPath, 'utf8');
            if (!ctxContent.includes('sections: any;')) {
                ctxContent = ctxContent.replace(
                    /(customization:\s*any;)/,
                    '$1\n  sections: any;'
                );
                fs.writeFileSync(ctxPath, ctxContent);
                console.log(`Updated context ${ctxPath}`);
            }
        }
    });
});
