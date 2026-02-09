import themeMap from '@/config/theme-map.json';

export interface ThemeMetadata {
  name: string;
  templatePath: string;
  entryComponent: string;
  layoutComponent: string;
}

export function getThemeMetadata(themeSlug: string): ThemeMetadata | null {
  return themeMap[themeSlug as keyof typeof themeMap] || null;
}

export function getThemeComponentPath(themeSlug: string): string | null {
  const metadata = getThemeMetadata(themeSlug);
  if (!metadata) return null;
  
  // Return the template path and entry component
  return metadata.templatePath + '/' + metadata.entryComponent;
}