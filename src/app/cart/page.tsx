'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { CartSummary } from '@/components/CartSummary'
import { useCart } from '@/stores/cartStore'
import { formatPrice } from '@/utils/formatPrice'
import Image from 'next/image'
import { useProducts } from '@/hooks/useProducts'
import { useMemo } from 'react'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const { allProducts } = useProducts()

  const cartWithDetails = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        product: allProducts.find((p) => p.id === item.id),
      })),
    [items, allProducts]
  )

  return (
    <main>
      <Container>
        <div className="py-12">
          <Heading level={1} className="mb-8">
            Shopping Cart
          </Heading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <Text className="text-gray-500 mb-4">Your cart is empty</Text>
                  <Link href="/shop">
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>
              ) : (
                cartWithDetails.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border rounded p-4 bg-white"
                  >
                    {item.product && (
                      <>
                        <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold">{item.product.name}</p>
                          <p className="text-gray-600 text-sm">
                            {formatPrice(item.price)}
                          </p>

                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-2 py-1 border rounded text-sm"
                              >
                                −
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-2 py-1 border rounded text-sm"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 text-sm hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="text-right font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
