import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Booking } from '../../types/bookings';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useBoundStore } from '../common/useBoundStore';

export const useCreateBookingMutation = () => { 
  const { addBooking } = useBoundStore();
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  return useMutation({
    mutationKey: ['booking'],
    mutationFn: async (booking: Booking) => {
      // localStorageUtil.addObject('booking', booking);
      addBooking(booking);
      // return booking;
    },
    onError: (err: Error) => notifications.show(`Failed to add booking: ${err.message}`, {
      severity: 'error',
      autoHideDuration: 2000
    }),
    onSuccess: () => {
      notifications.show('Successfully added booking!', {
        severity: 'success',
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ['booking']
      });
    }
  });
};