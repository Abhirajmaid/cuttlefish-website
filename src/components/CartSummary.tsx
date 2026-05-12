'use client'

import { useCart } from '@/stores/cartStore'
import { Button } from './Button'
import { Heading } from './Heading'
import { Text } from './Text'
import { formatPrice } from '@/utils/formatPrice'
import Link from 'next/link'

export const CartSummary = () => {
  const { items } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 100 ? 0 : 10
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded text-center">
        <Heading level={3} className="mb-2">
          Your cart is empty
        </Heading>
        <Text className="text-gray-600 mb-6">
          Continue shopping to add items to your cart.
        </Text>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-6 rounded space-y-4">
      <Heading level={3}>Order Summary</Heading>

      <div className="space-y-2 border-b pb-4">
        <div className="flex justify-between text-sm">
          <Text>Subtotal</Text>
          <Text>{formatPrice(subtotal)}</Text>
        </div>
        <div className="flex justify-between text-sm">
          <Text>Shipping</Text>
          <Text>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</Text>
        </div>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <Text>Total</Text>
        <Text>{formatPrice(total)}</Text>
      </div>

      <Link href="/checkout">
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  )
}
