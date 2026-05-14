'use client'

import { useState } from 'react'
import { ShippingAddress } from '@/types'
import { validateEmail, validatePostalCode } from '@/utils/validateEmail'
import { Button } from './Button'
import { Text } from './Text'
import { Heading } from './Heading'

interface CheckoutFormProps {
  onSubmit: (data: ShippingAddress, paymentMethod: 'card' | 'paypal') => void
  isLoading?: boolean
}

export const CheckoutForm = ({ onSubmit, isLoading }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US',
  })
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!validatePostalCode(formData.postalCode, formData.country))
      newErrors.postalCode = 'Valid postal code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData, paymentMethod)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Address */}
      <div>
        <Heading level={3} className="mb-4">
          Shipping Address
        </Heading>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-3 py-2 border ${
                errors.fullName ? 'border-red-500' : ''
              }`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.fullName}
              </Text>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.email}
              </Text>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-3 py-2 border ${
                errors.address ? 'border-red-500' : ''
              }`}
              placeholder="123 Main St"
            />
            {errors.address && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.address}
              </Text>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full px-3 py-2 border ${
                errors.city ? 'border-red-500' : ''
              }`}
              placeholder="New York"
            />
            {errors.city && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.city}
              </Text>
            )}
          </div>

          {/* Postal Code & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Postal Code</label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className={`w-full px-3 py-2 border ${
                  errors.postalCode ? 'border-red-500' : ''
                }`}
                placeholder="10001"
              />
              {errors.postalCode && (
                <Text size="xs" className="text-red-600 mt-1">
                  {errors.postalCode}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <Heading level={3} className="mb-4">
          Payment Method
        </Heading>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'paypal')}
            />
            <Text>Credit Card</Text>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'paypal')}
            />
            <Text>PayPal</Text>
          </label>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isLoading} className="w-full py-4">
        {isLoading ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  )
}
