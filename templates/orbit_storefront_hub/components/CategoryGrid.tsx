'use client';

import { useStorefront } from '@/contexts/StorefrontContext';
import Link from 'next/link';

export default function CategoryGrid() {
  const { storeInfo, categoryData } = useStorefront();
  const category = storeInfo?.category;

  // Define categories based on merchant category
  const getCategories = () => {
    if (category?.toLowerCase().includes('fashion') || category?.toLowerCase().includes('clothing')) {
      return [
        { name: 'Tops', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&auto=format&fit=crop', href: '/category/tops' },
        { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&auto=format&fit=crop', href: '/category/bottoms' },
        { name: 'Dresses', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop', href: '/category/dresses' },
        { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop', href: '/category/shoes' },
      ];
    } else if (category?.toLowerCase().includes('electronics')) {
      return [
        { name: 'Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop', href: '/category/phones' },
        { name: 'Computers', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop', href: '/category/computers' },
        { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop', href: '/category/audio' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=400&auto=format&fit=crop', href: '/category/accessories' },
      ];
    } else if (category?.toLowerCase().includes('cosmetic') || category?.toLowerCase().includes('beauty')) {
      return [
        { name: 'Skincare', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop', href: '/category/skincare' },
        { name: 'Makeup', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop', href: '/category/makeup' },
        { name: 'Haircare', image: 'https://images.unsplash.com/photo-1527799822367-4d8873767bf6?q=80&w=400&auto=format&fit=crop', href: '/category/haircare' },
        { name: 'Fragrance', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop', href: '/category/fragrance' },
      ];
    } else if (category?.toLowerCase().includes('food') || category?.toLowerCase().includes('beverage')) {
      return [
        { name: 'Snacks', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=400&auto=format&fit=crop', href: '/category/snacks' },
        { name: 'Drinks', image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=400&auto=format&fit=crop', href: '/category/drinks' },
        { name: 'Organic', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop', href: '/category/organic' },
        { name: 'Specialty', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop', href: '/category/specialty' },
      ];
    } else {
      // Default categories
      return [
        { name: 'Popular', image: '/placeholder-popular.jpg', href: '/category/popular' },
        { name: 'New', image: '/placeholder-new.jpg', href: '/category/new' },
        { name: 'Featured', image: '/placeholder-featured.jpg', href: '/category/featured' },
        { name: 'Sale', image: '/placeholder-sale.jpg', href: '/category/sale' },
      ];
    }
  };

  const categories = getCategories();

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shop By Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.href} 
              href={cat.href}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-200">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:opacity-90"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-900">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}