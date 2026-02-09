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
    options: ['$0 - $50', '$50 - $100', '$100 - $200', '$200 - $500', '$500+']
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

export default function ProductFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (categoryId: string, option: string) => {
    setSelectedFilters(prev => {
      const current = prev[categoryId] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      return { ...prev, [categoryId]: updated };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors"
          style={{
            backgroundColor: 'var(--card-bg)',
            color: 'var(--text)',
            border: '1px solid var(--card-border)'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}>
              {activeFilterCount}
            </span>
          )}
        </button>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm transition-opacity hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            Clear All
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="p-6 rounded-lg border mb-4 relative z-50 pointer-events-auto"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterCategories.map((category) => (
              <div key={category.id}>
                <h3 className="font-semibold mb-3 pb-2 border-b" style={{ color: 'var(--text)', borderColor: 'var(--card-border)' }}>
                  {category.label}
                </h3>
                <div className="space-y-2">
                  {category.options.map((option) => {
                    const isSelected = selectedFilters[category.id]?.includes(option) ?? false;
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleFilter(category.id, option)}
                          className="w-4 h-4 rounded"
                          style={{ accentColor: 'var(--header-text)' }}
                        />
                        <span
                          className="text-sm transition-colors"
                          style={{
                            color: isSelected ? 'var(--header-text)' : 'var(--text-muted)'
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
        </div>
      )}

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(selectedFilters).map(([categoryId, options]) =>
            options.map((option) => (
              <button
                key={`${categoryId}-${option}`}
                onClick={() => toggleFilter(categoryId, option)}
                className="px-3 py-1 text-sm rounded-full flex items-center gap-2 transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: 'var(--header-text)',
                  color: 'var(--header-bg)'
                }}
              >
                {option}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
