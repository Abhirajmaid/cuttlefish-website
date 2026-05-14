'use client'

import { Text } from './Text'
import { Button } from './Button'
import { useCart } from '@/stores/cartStore'
import { formatPrice } from '@/utils/formatPrice'
import Image from 'next/image'
import { useProducts } from '@/hooks/useProducts'
import { useMemo } from 'react'
import Link from 'next/link'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    // Overlay backdrop and right-edge drawer
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 bottom-0 w-full sm:w-120 md:w-130 bg-background shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{items.length} items in cart</h2>
          <div className="flex items-center gap-4">
            <button
              aria-label="Close cart"
              onClick={onClose}
              className="p-2 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="overflow-auto p-6 flex-1">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <Text className="text-gray-500 mb-4">Your cart is empty</Text>
              <Link href="/shop">
                <Button onClick={onClose}>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartWithDetails.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="relative w-28 h-28 bg-gray-100 overflow-hidden shrink-0">
                    {item.product && (
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-base">{item.product?.name}</p>
                        <Text size="sm" className="text-gray-500">
                          Dial color: <span className="font-semibold">Navy</span>
                        </Text>
                      </div>
                      <div className="text-right font-semibold">{formatPrice(item.price * item.quantity)}</div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="inline-flex items-center gap-2 bg-gray-100 px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1">
                          −
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1">
                          +
                        </button>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="ml-auto p-2 hover:bg-gray-100">
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="border-t p-6 bg-background">
          <div className="flex items-center justify-between mb-4">
            <Text className="text-gray-600">Subtotal</Text>
            <div className="text-lg font-semibold">{formatPrice(subtotal)}</div>
          </div>

          <Link href="/checkout" className="block" onClick={onClose}>
            <Button className="w-full py-4 rounded-none!">
              Checkout
            </Button>
          </Link>

          <div className="mt-4 flex items-center justify-center gap-3">
            {/* Payment icons placeholders */}
            <div className="h-6 w-12 bg-gray-100 flex items-center justify-center text-xs">VISA</div>
            <div className="h-6 w-12 bg-gray-100 flex items-center justify-center text-xs">MC</div>
            <div className="h-6 w-12 bg-gray-100 flex items-center justify-center text-xs">DISC</div>
            <div className="h-6 w-12 bg-gray-100 flex items-center justify-center text-xs">AMEX</div>
          </div>
        </div>
      </aside>
    </div>
  )
}
