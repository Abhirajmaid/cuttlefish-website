import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Order, CartItem, ShippingAddress } from '@/types'

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  placeOrder: (items: CartItem[], total: number, shipping: ShippingAddress) => Order
  getOrderHistory: () => Order[]
  getOrderById: (id: string) => Order | null
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      placeOrder: (items, total, shipping) => {
        const order: Order = {
          id: `ORD-${Date.now()}`,
          items,
          subtotal: total - 10, // Mock: assume $10 shipping
          shippingCost: 10,
          total,
          shippingAddress: shipping,
          status: 'pending',
          createdAt: new Date(),
        }
        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        }))
        return order
      },
      getOrderHistory: () => get().orders,
      getOrderById: (id) => get().orders.find((o) => o.id === id) || null,
    }),
    { name: 'order-store' }
  )
)
