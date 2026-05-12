import { create } from 'zustand'
import { User, ShippingAddress } from '@/types'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  setSavedAddress: (address: ShippingAddress) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  setSavedAddress: (address) =>
    set((state) => {
      if (!state.user) return state
      return {
        user: {
          ...state.user,
          savedAddresses: [...state.user.savedAddresses, address],
        },
      }
    }),
  logout: () => set({ user: null }),
}))
