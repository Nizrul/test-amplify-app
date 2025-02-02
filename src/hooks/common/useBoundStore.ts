import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { BookingsSlice, createBookingsSlice } from '../../libs/store/createBookingSlice';
import { createUserSlice, UserSlice } from '../../libs/store/createUserSlice';
import { createViewingsSlice, ViewingsSlice } from '../../libs/store/createViewingSlice';

export const useBoundStore = create(devtools(persist<ViewingsSlice & BookingsSlice & UserSlice>((...state) => ({
  ...createViewingsSlice(...state),
  ...createBookingsSlice(...state),
  ...createUserSlice(...state),
}), {
  name: 'user-storage',
})));