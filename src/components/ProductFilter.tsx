'use client'

import { useState } from 'react'
import { Button } from './Button'

interface Filters {
  category: string
  priceRange: [number, number]
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating'
}

interface ProductFilterProps {
  onFilterChange: (filters: Filters) => void
}

export const ProductFilter = ({ onFilterChange }: ProductFilterProps) => {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priceRange: [0, 500],
    sortBy: 'newest',
  })

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    onFilterChange(updated)
  }

  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Category</h3>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 border rounded text-sm"
        >
          <option value="all">All Products</option>
          <option value="Bags">Bags</option>
          <option value="Accessories">Accessories</option>
          <option value="Jackets">Jackets</option>
          <option value="Shoes">Shoes</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Price</h3>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
          className="w-full"
        />
        <p className="text-xs text-gray-600 mt-2">Up to ${filters.priceRange[1]}</p>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
          className="w-full px-3 py-2 border rounded text-sm"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <Button
        onClick={() => {
          const reset = { category: 'all', priceRange: [0, 500] as [number, number], sortBy: 'newest' as const }
          setFilters(reset)
          onFilterChange(reset)
        }}
        variant="secondary"
        className="w-full"
      >
        Reset Filters
      </Button>
    </aside>
  )
}
