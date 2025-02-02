import { StateCreator } from 'zustand';
import { Booking } from '../../types/bookings';

export interface BookingsSlice {
  bookings: Booking[],
  getBookings: () => Booking[],
  setBookings: (bookings: Booking[] | undefined) => void,
  addBooking: (booking: Booking) => void,
  updateBooking: (bookingId: string, update: Partial<Booking>) => void,
  deleteBooking: (bookingId: string) => void,
}

export const createBookingsSlice: StateCreator<
  BookingsSlice,
  [],
  [],
  BookingsSlice
> = (set, get) => ({
  bookings: [],
  getBookings: () => get().bookings,
  setBookings: (bookings) => set((state) => {
    state.bookings = bookings || [];
    return state;
  }),
  addBooking: (booking) => set((state) => {
    if (!state.bookings) {
      state.bookings = [];
    }
    state.bookings.push(booking);
    return state;
  }),
  updateBooking: (bookingId, update) => set((state) => {
    state.bookings = state.bookings.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          ...update,
        };
      }
      return booking;
    });

    return state;
  }),
  deleteBooking: (bookingId) => set((state) => {
    state.bookings = state.bookings.filter(booking => booking.id !== bookingId);
    return state;
  })
});