'use client'

import { Grid } from './Grid'
import { ProductCard } from './ProductCard'
import { Product } from '@/types'
import Link from 'next/link'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>
  }

  if (products.length === 0) {
    return <div className="text-center py-12 text-gray-500">No products found. Try adjusting your filters.</div>
  }

  return (
    <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 6 }}>
      {products.map((product) => (
        <Link key={product.id} href={`/shop/${product.slug}`}>
          <ProductCard
            image={product.image}
            name={product.name}
            price={product.price}
            rating={product.rating || 0}
            reviewCount={product.reviewCount || 0}
            inStock={product.inStock !== false}
          />
        </Link>
      ))}
    </Grid>
  )
}
