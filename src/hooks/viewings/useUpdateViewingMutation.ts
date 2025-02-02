import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Viewing } from '../../types/viewings';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useBoundStore } from '../common/useBoundStore';

export const useUpdateViewingMutation = (viewingId: string) => { 
  const { updateViewing } = useBoundStore();
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  return useMutation({
    mutationKey: ['viewing'],
    mutationFn: async (update: Partial<Viewing>) => {
    //   const updatedObject = localStorageUtil.updateObject('viewing', update.id, update);
      updateViewing(viewingId, update);
    },
    onError: (err: Error) => notifications.show(`Failed to update viewing: ${err.message}`, {
      severity: 'error',
      autoHideDuration: 2000
    }),
    onSuccess: () => {
      notifications.show('Successfully updated viewing!', {
        severity: 'success',
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ['viewing']
      });
    }
  });
};