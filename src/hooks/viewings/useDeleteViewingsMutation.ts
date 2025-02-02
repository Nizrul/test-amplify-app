import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useBoundStore } from '../common/useBoundStore';

export const useDeleteViewingMutation = (viewingId: string) => { 
  const { deleteViewing } = useBoundStore();
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  return useMutation({
    mutationKey: ['viewing'],
    mutationFn: async () => {
      deleteViewing(viewingId);
    },
    onError: (err: Error) => notifications.show(`Failed to delete viewing: ${err.message}`, {
      severity: 'error',
      autoHideDuration: 2000
    }),
    onSuccess: () => {
      notifications.show('Successfully deleted viewing!', {
        severity: 'success',
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ['viewing']
      });
    }
  });
};