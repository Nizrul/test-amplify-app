import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useBoundStore } from '../common/useBoundStore';

export const useDeleteBookingMutation = (bookingId: string) => { 
  const { deleteBooking } = useBoundStore();
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  return useMutation({
    mutationKey: ['booking'],
    mutationFn: async () => {
      deleteBooking(bookingId);
    },
    onError: (err: Error) => notifications.show(`Failed to delete booking: ${err.message}`, {
      severity: 'error',
      autoHideDuration: 2000
    }),
    onSuccess: () => {
      notifications.show('Successfully deleted booking!', {
        severity: 'success',
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ['booking']
      });
    }
  });
};