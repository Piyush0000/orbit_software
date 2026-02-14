const fs = require('fs');
const path = require('path');

const rootDir = 'D:/orbit/all_upfront';

function getApiFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
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

const oldThemeConfig = `  // Get theme configuration
  static async getThemeConfig() {
    try {
      const response = await fetch(\`\${API_BASE_URL}/\${this.subdomain}/theme\`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Failed to fetch theme config');
      return data.data;
    } catch (error) {
      console.error('Error fetching theme config:', error);
      return {};
    }
  }`;

const newThemeConfigPlusSections = `${oldThemeConfig}

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

const oldUseStore = `// Hook for store context
export function useStore() {
  const [storeInfo, setStoreInfo] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [info, custom] = await Promise.all([
          StorefrontAPI.getStoreInfo(),
          StorefrontAPI.getStoreCustomization()
        ]);
        setStoreInfo(info);
        setCustomization(custom);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        console.error('Error loading store data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    storeInfo,
    customization,
    loading,
    error
  };
}`;

const newUseStore = `// Hook for store context
export function useStore() {
  const [storeInfo, setStoreInfo] = useState(null);
  const [customization, setCustomization] = useState(null);
  const [sections, setSections] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [info, custom, sectionsData] = await Promise.all([
          StorefrontAPI.getStoreInfo(),
          StorefrontAPI.getStoreCustomization(),
          StorefrontAPI.getStoreSections()
        ]);
        setStoreInfo(info);
        setCustomization(custom);
        setSections(sectionsData);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        console.error('Error loading store data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    storeInfo,
    customization,
    sections,
    loading,
    error
  };
}`;

apiFiles.forEach(apiPath => {
    let content = fs.readFileSync(apiPath, 'utf8');
    let changed = false;

    if (content.includes(oldThemeConfig) && !content.includes('getStoreSections')) {
        content = content.replace(oldThemeConfig, newThemeConfigPlusSections);
        changed = true;
    }

    if (content.includes(oldUseStore)) {
        content = content.replace(oldUseStore, newUseStore);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(apiPath, content);
        console.log(`Updated ${apiPath}`);
        
        // Also update context
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
                const oldCtx = `interface StoreContextType {
  storeInfo: any;
  customization: any;
  loading: boolean;
  error: string | null;
}`;
                const newCtx = `interface StoreContextType {
  storeInfo: any;
  customization: any;
  sections: any;
  loading: boolean;
  error: string | null;
}`;
                if (contextContent.includes(oldCtx)) {
                    contextContent = contextContent.replace(oldCtx, newCtx);
                    fs.writeFileSync(contextPath, contextContent);
                    console.log(`Updated context ${contextPath}`);
                }
            }
        });
    }
});
