'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { StarRating } from '@/components/StarRating'
import { ReviewCard } from '@/components/ReviewCard'
import { useProductBySlug } from '@/hooks/useProducts'
import { useCart } from '@/stores/cartStore'
import Image from 'next/image'
import { useState } from 'react'
import { formatPrice } from '@/utils/formatPrice'
import Link from 'next/link'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product } = useProductBySlug(params.slug)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <Container>
        <div className="py-12 text-center">
          <Heading level={2}>Product not found</Heading>
          <Link href="/shop">
            <Button className="mt-4">Back to Shop</Button>
          </Link>
        </div>
      </Container>
    )
  }

  const mockReviews = [
    {
      id: '1',
      productId: product.id,
      author: 'Sarah M.',
      rating: 5,
      text: 'Great quality and fast shipping!',
      createdAt: new Date('2026-05-10'),
    },
    {
      id: '2',
      productId: product.id,
      author: 'John D.',
      rating: 4,
      text: 'Good product, minor wear after 2 months.',
      createdAt: new Date('2026-05-05'),
    },
  ]

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main>
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="relative aspect-square bg-gray-100 rounded overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-start">
              <Heading level={1} className="mb-2">
                {product.name}
              </Heading>
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={product.rating || 0} />
                <Text size="sm" className="text-gray-500">
                  ({product.reviewCount || 0} reviews)
                </Text>
              </div>

              <Heading level={2} className="mb-6 text-2xl">
                {formatPrice(product.price)}
              </Heading>

              <Text className="text-gray-700 mb-6">{product.description}</Text>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="px-3 py-2 border rounded"
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className="w-full"
                >
                  {added ? '✓ Added to Cart' : product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                </Button>

                <Button variant="secondary" className="w-full">
                  View Shipping Policy
                </Button>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="max-w-2xl">
            <Heading level={2} className="mb-6">
              Customer Reviews
            </Heading>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
