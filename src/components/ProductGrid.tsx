'use client'

import { Grid } from './Grid'
import { ProductCard } from './ProductCard'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  layout?: 'default' | 'shop'
}

export const ProductGrid = ({ products, isLoading, layout = 'default' }: ProductGridProps) => {
  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>
  }

  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-sm tracking-wide text-gray-500">
        0 results
      </p>
    )
  }

  if (layout === 'shop') {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 md:gap-y-14 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} layout="shop" />
        ))}
      </div>
    )
  }

  return (
    <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 6 }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  )
}
