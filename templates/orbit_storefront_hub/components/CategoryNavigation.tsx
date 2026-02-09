'use client';

import { useStorefront } from '@/contexts/StorefrontContext';
import Link from 'next/link';

export default function CategoryNavigation() {
  const { storeInfo, categoryData } = useStorefront();
  const category = storeInfo?.category;

  // Define navigation based on category
  const getNavigationItems = () => {
    if (category?.toLowerCase().includes('fashion') || category?.toLowerCase().includes('clothing')) {
      // Fashion-specific navigation (Men/Women)
      return [
        { label: 'Men', href: '/men' },
        { label: 'Women', href: '/women' },
        { label: 'Kids', href: '/kids' },
        { label: 'Accessories', href: '/accessories' },
      ];
    } else {
      // General navigation (Categories/Featured)
      return [
        { label: 'All Products', href: '/products' },
        { label: 'Featured', href: '/featured' },
        { label: 'New Arrivals', href: '/new' },
        { label: 'Sale', href: '/sale' },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto py-4">
          {navigationItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="whitespace-nowrap text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}