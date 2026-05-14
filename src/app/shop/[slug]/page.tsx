'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { StarRating } from '@/components/StarRating'
import { ReviewCard } from '@/components/ReviewCard'
import { ProductGrid } from '@/components/ProductGrid'
import { useProductBySlug, useProducts } from '@/hooks/useProducts'
import { useCart } from '@/stores/cartStore'
import Image from 'next/image'
import { useState } from 'react'
import { formatPrice } from '@/utils/formatPrice'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import EmailSubscriber from '@/components/EmailSubscriber'

function slugFromParams(raw: string | string[] | undefined): string {
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw) && raw.length > 0) return raw[0] ?? ''
  return ''
}

const SIZES = ['7', '8', '9', '10', '11']
const COLORS = ['Black', 'Brown', 'White']

export default function ProductPage() {
  const routeParams = useParams()
  const slug = slugFromParams(routeParams?.slug as string | string[] | undefined)
  const { product } = useProductBySlug(slug)
  const { allProducts } = useProducts()
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(SIZES[0])
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [added, setAdded] = useState(false)

  if (!slug) {
    return (
      <Container>
        <div className="py-24 text-center text-gray-500 font-supreme">Loading…</div>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container>
        <div className="py-24 text-center">
          <Heading level={2} className="font-gambetta-italic font-medium">Product not found</Heading>
          <Link href="/shop">
            <Button className="mt-8">Back to Shop</Button>
          </Link>
        </div>
      </Container>
    )
  }

  // Mocking multiple images for the gallery
  const galleryImages = [product.image, product.image, product.image]

  // Get similar products (excluding current)
  const similarProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    // In a real app, you would add size and color to the cart item
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Container>
      <div className='pt-2'>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Image Gallery (Scrollable) */}
          <div className="md:col-span-7 flex flex-col gap-4 md:gap-8">
            {galleryImages.map((imgSrc, idx) => (
              <div key={idx} className="relative aspect-[4/5] md:aspect-square w-full overflow-hidden bg-gray-100">
                <Image
                  src={imgSrc}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Right Column: Product Details (Sticky) */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-32 flex flex-col justify-start">

              <Heading level={1} className="mb-2 font-gambetta-italic font-medium text-2xl! md:text-5xl" animate={false}>
                {product.name}
              </Heading>

              <div className="flex items-center gap-2 mb-6">
                <StarRating rating={product.rating || 0} />
                <Text size="sm" className="text-gray-500 font-supreme">
                  ({product.reviewCount || ((product.id.length * 7) % 50) + 10} reviews)
                </Text>
              </div>

              <Heading level={4} className="mb-8 font-supreme text-secondary text-lg!" animate={false}>
                {formatPrice(product.price)}
              </Heading>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <Text className="font-supreme font-medium text-sm">Color</Text>
                  <Text className="font-supreme text-gray-500 text-sm">{selectedColor}</Text>
                </div>
                <div className="flex gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border text-sm font-supreme transition-all ${selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black text-black bg-transparent'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <Text className="font-supreme font-medium text-sm">Size (US)</Text>
                  <button className="text-xs text-gray-500 underline font-supreme">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-full border text-sm font-supreme transition-all ${selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black text-black bg-transparent'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className="w-full py-4 text-lg font-supreme"
                >
                  {added ? '✓ Added to Cart' : product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                </Button>

                {/* Description moved below Add to Cart */}
                <div className="pt-6 border-t border-gray-200">
                  <Text className="text-gray-700 font-supreme leading-relaxed">
                    {product.description}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="py-16 md:py-24 border-t border-gray-200">
          <Heading level={2} className="mb-10 font-gambetta-italic font-medium text-center md:text-left" animate={false}>
            You might also like
          </Heading>
          <ProductGrid products={similarProducts} layout="shop" />
        </div>
      )}

      <EmailSubscriber />
    </Container>
  )
}
