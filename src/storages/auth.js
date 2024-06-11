import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    user: null,
    isExpired: false,
    setUser: (user) => set({ user }),
    setIsExpired: (isExpired) => set({ isExpired }),
}))
