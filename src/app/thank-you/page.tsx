'use client'

import { Container } from '@/components/Container'
import { OrderConfirmation } from '@/components/OrderConfirmation'
import { useOrderStore } from '@/stores/orderStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ThankYouPage() {
  const { currentOrder } = useOrderStore()
  const router = useRouter()

  useEffect(() => {
    // Redirect to shop if no current order
    if (!currentOrder) {
      router.push('/shop')
    }
  }, [currentOrder, router])

  if (!currentOrder) {
    return null
  }

  return (
    <main>
      <Container>
        <div className="py-12">
          <OrderConfirmation order={currentOrder} />
        </div>
      </Container>
    </main>
  )
}
