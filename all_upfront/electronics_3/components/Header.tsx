import React from 'react';
import Link from 'next/link';
import { CartDrawer } from "./CartDrawer";
import { Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

import Footer from "@/components/Footer";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-black text-primary uppercase tracking-tighter">
              Provision & Co.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/products" 
              className={`text-sm font-medium ${pathname === '/products' ? 'text-primary' : 'text-zinc-600 hover:text-primary'}`}
            >
              Products
            </Link>
            <Link 
              href="/categories" 
              className={`text-sm font-medium ${pathname === '/categories' ? 'text-primary' : 'text-zinc-600 hover:text-primary'}`}
            >
              Categories
            </Link>
            <Link 
              href="/offers" 
              className={`text-sm font-medium ${pathname === '/offers' ? 'text-primary' : 'text-zinc-600 hover:text-primary'}`}
            >
              Offers
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64 pl-10 h-10 bg-zinc-50 border-zinc-200 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-zinc-50 rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="text-2xl font-black text-primary uppercase tracking-tighter">
                    Provision & Co.
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6">
                  {/* Mobile Search */}
                  <div className="relative md:hidden">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full pl-10 h-10 bg-zinc-50 border-zinc-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-4">
                    <Link 
                      href="/products" 
                      className={`text-sm font-medium ${pathname === '/products' ? 'text-primary' : 'text-zinc-600 hover:text-primary'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Products
                    </Link>
                    <Link 
                      href="/categories" 
                      className={`text-sm font-medium ${pathname === '/categories' ? 'text-primary' : 'text-zinc-600 hover:text-primary'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Categories
                    </Link>
                    <Link 
                      href="/offers" 
                      className={`text-sm font-medium ${pathname === '/offers' ? 'text-primary' : 'text-zinc-600 hover:text-primary'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Offers
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}