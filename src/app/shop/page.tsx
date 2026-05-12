'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { ProductFilter } from '@/components/ProductFilter'
import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

interface Filters {
  category: string
  priceRange: [number, number]
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating'
}

export default function ShopPage() {
  const { allProducts } = useProducts()
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priceRange: [0, 500],
    sortBy: 'newest',
  })

  const filteredProducts = useMemo(() => {
    let result = [...allProducts]

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category)
    }

    // Filter by price
    result = result.filter((p) => p.price <= filters.priceRange[1])

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // newest - keep original order
        break
    }

    return result
  }, [allProducts, filters])

  return (
    <main>
      <Container>
        <div className="py-12">
          <Heading level={1} className="mb-8">
            Shop
          </Heading>

          <div className="flex flex-col lg:flex-row gap-8">
            <ProductFilter onFilterChange={setFilters} />
            <div className="flex-1">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
