import { create } from 'zustand'

export const useRestaurantStore = create((set) => ({
    restaurant: null,
    restaurants: [],
    setRestaurant: (restaurant) => set({ restaurant }),
    setRestaurants: (restaurants) => set({ restaurants }),
}))