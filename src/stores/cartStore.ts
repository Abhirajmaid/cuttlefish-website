'use client';

import { CartItem, Product, ShippingAddress } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  paymentMethod: 'card' | 'paypal' | null;
  shippingCost: number;
}

interface CartState {
  items: CartItem[];
  checkout: CheckoutState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: 'card' | 'paypal') => void;
  setShippingCost: (cost: number) => void;
  calculateTotal: () => number;
  clearCheckout: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      checkout: {
        shippingAddress: null,
        paymentMethod: null,
        shippingCost: 0,
      },
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity }],
          };
        });
      },
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          }));
        }
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      setShippingAddress: (address: ShippingAddress) => {
        set((state) => ({
          checkout: { ...state.checkout, shippingAddress: address },
        }));
      },
      setPaymentMethod: (method: 'card' | 'paypal') => {
        set((state) => ({
          checkout: { ...state.checkout, paymentMethod: method },
        }));
      },
      setShippingCost: (cost: number) => {
        set((state) => ({
          checkout: { ...state.checkout, shippingCost: cost },
        }));
      },
      calculateTotal: () => {
        const state = get();
        const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return subtotal + state.checkout.shippingCost;
      },
      clearCheckout: () => {
        set({
          checkout: {
            shippingAddress: null,
            paymentMethod: null,
            shippingCost: 0,
          },
        });
      },
    }),
    {
      name: 'parcel-cart',
    }
  )
);

// Export alias for compatibility
export const useCart = useCartStore;
