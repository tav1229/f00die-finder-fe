import { create } from 'zustand'

export const useBookingStore = create((set) => ({
    booking: {
        restaurantId: null,
        time: null,
        customerName: null,
        customerPhone: null,
        numberOfAdults: null,
        numberOfChildren: null,
        note: null,
    },
    bookings: [],
    setBooking: (booking) => set({ booking }),
    setBookings: (bookings) => set({ bookings }),
}))