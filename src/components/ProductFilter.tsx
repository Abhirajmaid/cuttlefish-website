'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Text } from './Text';

export interface ShopFilters {
  category: string;
  priceRange: [number, number];
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating';
  search: string;
}

type FilterValue = ShopFilters[keyof ShopFilters];

interface ProductFilterProps {
  onFilterChange: (filters: ShopFilters) => void;
  orientation?: 'vertical' | 'horizontal';
}

const defaultFilters: ShopFilters = {
  category: 'all',
  priceRange: [0, 2000],
  sortBy: 'newest',
  search: '',
};

export const ProductFilter = ({ onFilterChange, orientation = 'vertical' }: ProductFilterProps) => {
  const [filters, setFilters] = useState<ShopFilters>(defaultFilters);

  const handleFilterChange = (key: keyof ShopFilters, value: FilterValue) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const isHorizontal = orientation === 'horizontal';

  const fieldShell = isHorizontal
    ? 'flex min-w-[140px] flex-col gap-1.5'
    : 'flex flex-col gap-1.5';

  const selectClass =
    'w-full border border-gray-200 bg-background px-3 py-2.5 text-sm text-black focus:border-black focus:outline-none';

  return (
    <aside className={isHorizontal ? 'w-full' : 'w-full lg:w-64'}>
      <div
        className={
          isHorizontal
            ? 'flex flex-col gap-8 border-gray-200 pb-8 xl:flex-row xl:items-end xl:justify-between xl:gap-10'
            : 'space-y-6'
        }
      >
        {/* Search */}
        <div className={isHorizontal ? 'w-full xl:max-w-xl xl:flex-1' : ''}>
          {isHorizontal ? (
            <Text variant="label" className="mb-2 text-gray-500">
              Search
            </Text>
          ) : null}
          <label className="sr-only" htmlFor="shop-search">
            Search products
          </label>
          <input
            id="shop-search"
            type="search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search products"
            className={
              isHorizontal
                ? 'w-full border-0 border-b border-black bg-transparent py-2.5 text-base text-black placeholder:text-gray-400 focus:border-black focus:outline-none'
                : 'w-full border border-gray-200 px-3 py-2.5 text-sm focus:border-black focus:outline-none'
            }
          />
        </div>

        <div className={isHorizontal ? 'flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end' : 'space-y-6'}>
          {/* Category */}
          <div className={fieldShell}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Category</h3>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className={selectClass}
            >
              <option value="all">All</option>
              <option value="Bags">Bags</option>
              <option value="Accessories">Accessories</option>
              <option value="Jackets">Jackets</option>
              <option value="Shoes">Shoes</option>
              <option value="Watches">Watches</option>
            </select>
          </div>

          {/* Price */}
          <div className={isHorizontal ? `${fieldShell} min-w-[160px]` : fieldShell}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Price</h3>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value, 10)])}
              className="w-full accent-black"
            />
            <p className="text-xs text-gray-500">Up to ${filters.priceRange[1]}</p>
          </div>

          {/* Sort */}
          <div className={isHorizontal ? `${fieldShell} min-w-[180px]` : fieldShell}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Sort</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value as ShopFilters['sortBy'])}
              className={selectClass}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>

          {isHorizontal ? (
            <Button
              onClick={() => {
                setFilters(defaultFilters);
                onFilterChange(defaultFilters);
              }}
              variant="outline"
              className="!rounded-none px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em]"
            >
              Reset
            </Button>
          ) : (
            <Button
              onClick={() => {
                setFilters(defaultFilters);
                onFilterChange(defaultFilters);
              }}
              variant="secondary"
              className="w-full"
            >
              Reset filters
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};
