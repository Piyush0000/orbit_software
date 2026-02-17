import os
import re

def fix_imports(root_dir):
    print(f"Scanning {root_dir}...")
    if not os.path.exists(root_dir):
        print(f"Error: Path {root_dir} does not exist!")
        return
        
    for root, dirs, files in os.walk(root_dir):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.next' in dirs:
            dirs.remove('.next')
            
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                except Exception as e:
                    print(f"Error reading {filepath}: {e}")
                    continue
                
                # Calculate depth from root_dir
                rel_path = os.path.relpath(root, root_dir)
                if rel_path == '.':
                    depth = 0
                else:
                    depth = len(rel_path.split(os.sep))
                
                # For themes where src is the base, depth is from src
                # For others, it's from the root of the theme sub-app
                prefix = '../' * depth if depth > 0 else './'
                
                # Improved regex to handle various spacings
                new_content = re.sub(r'from\s+["']@/(.*?)["\']', f'from "{prefix}\\1"', content)
                new_content = re.sub(r'import\(["\']@/(.*?)["\']\)', f'import("{prefix}\\1")', new_content)
                
                if content != new_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed imports in {filepath} (depth={depth}, prefix={prefix})")

fix_imports('d:/orbit/packages/themes/cosmetics/perfume-upfront-theme2')
fix_imports('d:/orbit/packages/themes/fashion/src')
fix_imports('d:/orbit/packages/themes/electronics/src')
fix_imports('d:/orbit/packages/themes/toys/src')
