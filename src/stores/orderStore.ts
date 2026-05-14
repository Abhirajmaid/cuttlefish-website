import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Order, CartItem, ShippingAddress } from '@/types'

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  placeOrder: (
    items: CartItem[],
    subtotal: number,
    shippingCost: number,
    shipping: ShippingAddress
  ) => Order
  getOrderHistory: () => Order[]
  getOrderById: (id: string) => Order | null
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      placeOrder: (items, subtotal, shippingCost, shipping) => {
        const order: Order = {
          id: `ORD-${Date.now()}`,
          items,
          subtotal,
          shippingCost,
          total: subtotal + shippingCost,
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
