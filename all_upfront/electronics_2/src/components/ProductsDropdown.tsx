'use client';

import { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

const filterCategories: FilterOption[] = [
  {
    id: 'category',
    label: 'Category',
    options: ['Electronics', 'Accessories', 'Audio', 'Computers', 'Mobile', 'Wearables']
  },
  {
    id: 'price',
    label: 'Price Range',
    options: ['₹0 - ₹4,000', '₹4,000 - ₹8,000', '₹8,000 - ₹16,000', '₹16,000 - ₹40,000', '₹40,000+']
  },
  {
    id: 'brand',
    label: 'Brand',
    options: ['Premium', 'Smart', 'Wireless', 'Pro', 'Elite']
  },
  {
    id: 'rating',
    label: 'Rating',
    options: ['4+ Stars', '3+ Stars', '2+ Stars', '1+ Stars']
  }
];

interface ProductsDropdownProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

export default function ProductsDropdown({ onFilterChange }: ProductsDropdownProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleFilter = (categoryId: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[categoryId] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      const newFilters = { ...prev, [categoryId]: updated };
      onFilterChange(newFilters);
      // Dispatch custom event for ProductGrid
      window.dispatchEvent(new CustomEvent('filterChange', { detail: newFilters }));
      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
    window.dispatchEvent(new CustomEvent('filterChange', { detail: {} }));
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="glass shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-2xl border p-8 animate-fadeIn" style={{ borderColor: 'var(--card-border)', pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <h3 className="text-xl font-bold font-heading tracking-wide" style={{ color: 'var(--text)' }}>Filter Products</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-white"
            style={{ color: 'var(--accent-blue)' }}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filterCategories.map((category) => (
          <div key={category.id}>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest" style={{ color: 'var(--accent-purple)' }}>
              {category.label}
            </h4>
            <div className="space-y-3">
              {category.options.map((option) => {
                const isSelected = (selectedFilters[category.id]?.includes(option) ?? false);
                return (
                  <label
                    key={option}
                    htmlFor={`filter-${category.id}-${option}`}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-[var(--accent-blue)] border-[var(--accent-blue)]' : 'bg-white/5 border-white/20 group-hover:border-white/40'}`}>
                      {isSelected && <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <input
                      id={`filter-${category.id}-${option}`}
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleFilter(category.id, option);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="hidden"
                    />
                    <span
                      className="text-sm transition-colors font-medium"
                      style={{
                        color: isSelected ? 'white' : 'var(--text-muted)'
                      }}
                    >
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {activeFilterCount > 0 && (
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
          <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center">Active Filters:</span>
          {Object.entries(selectedFilters).map(([categoryId, options]) =>
            options.map((option) => (
              <button
                key={`${categoryId}-${option}`}
                onClick={() => toggleFilter(categoryId, option)}
                className="px-3 py-1 text-xs font-bold rounded-full flex items-center gap-2 transition-all hover:bg-white hover:text-black group border"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'var(--accent-blue)',
                  borderColor: 'var(--accent-blue)'
                }}
              >
                {option}
                <svg className="w-3 h-3 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
