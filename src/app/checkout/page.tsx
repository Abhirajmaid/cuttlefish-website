'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { CheckoutForm } from '@/components/CheckoutForm'
import { CartSummary } from '@/components/CartSummary'
import { useCart } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'
import { ShippingAddress } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, setShippingAddress, clearCheckout } = useCart()
  const { placeOrder } = useOrderStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  if (items.length === 0) {
    return (
      <Container>
        <div className="py-12 text-center">
          <Heading level={2}>Your cart is empty</Heading>
        </div>
      </Container>
    )
  }

  const handleCheckoutSubmit = async (
    address: ShippingAddress,
    paymentMethod: 'card' | 'paypal'
  ) => {
    setIsLoading(true)
    try {
      setShippingAddress(address)

      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shipping = subtotal >= 100 ? 0 : 10
      const total = subtotal + shipping

      placeOrder(items, total, address)

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      clearCheckout()
      router.push('/thank-you')
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <Container>
        <div className="py-12">
          <Heading level={1} className="mb-8">
            Checkout
          </Heading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <CheckoutForm onSubmit={handleCheckoutSubmit} isLoading={isLoading} />
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
