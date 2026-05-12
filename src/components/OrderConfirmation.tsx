import { Order } from '@/types'
import { Heading } from './Heading'
import { Text } from './Text'
import { formatPrice } from '@/utils/formatPrice'
import { Button } from './Button'
import Link from 'next/link'

interface OrderConfirmationProps {
  order: Order
}

export const OrderConfirmation = ({ order }: OrderConfirmationProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <Heading level={1}>Order Confirmed!</Heading>
      <Text className="text-gray-600">Thank you for your purchase.</Text>

      {/* Order Details */}
      <div className="bg-gray-50 p-6 rounded space-y-4">
        <div>
          <Text size="sm" className="text-gray-500">
            Order Number
          </Text>
          <p className="font-mono text-lg font-semibold">{order.id}</p>
        </div>

        <div className="border-t pt-4">
          <Text size="sm" className="text-gray-500 mb-2">
            Order Total
          </Text>
          <p className="text-2xl font-semibold">{formatPrice(order.total)}</p>
        </div>

        <div className="border-t pt-4">
          <Text size="sm" className="text-gray-500 mb-2">
            Shipping To
          </Text>
          <p className="text-sm">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.address}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>

        <div className="border-t pt-4">
          <Text size="sm" className="text-gray-500 mb-2">
            Estimated Delivery
          </Text>
          <p className="text-sm">
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            {' + 5-7 business days'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/shop">
          <Button variant="secondary">Continue Shopping</Button>
        </Link>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
