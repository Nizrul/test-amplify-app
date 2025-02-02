import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Booking } from '../../types/bookings';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useBoundStore } from '../common/useBoundStore';

export const useUpdateBookingMutation = (bookingId: string) => { 
  const { updateBooking } = useBoundStore();
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  return useMutation({
    mutationKey: ['booking'],
    mutationFn: async (update: Partial<Booking>) => {
    //   const updatedObject = localStorageUtil.updateObject('booking', update.id, update);
      updateBooking(bookingId, update);
    },
    onError: (err: Error) => notifications.show(`Failed to update booking: ${err.message}`, {
      severity: 'error',
      autoHideDuration: 2000
    }),
    onSuccess: () => {
      notifications.show('Successfully updated booking!', {
        severity: 'success',
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ['booking']
      });
    }
  });
};