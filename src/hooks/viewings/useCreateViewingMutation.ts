import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Viewing } from '../../types/viewings';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useBoundStore } from '../common/useBoundStore';

export const useCreateViewingMutation = () => { 
  const { addViewing } = useBoundStore();
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  return useMutation({
    mutationKey: ['viewing'],
    mutationFn: async (viewing: Viewing) => {
      // localStorageUtil.addObject('viewing', viewing);
      addViewing(viewing);
      // return viewing;
    },
    onError: (err: Error) => notifications.show(`Failed to add viewing: ${err.message}`, {
      severity: 'error',
      autoHideDuration: 2000
    }),
    onSuccess: () => {
      notifications.show('Successfully added viewing!', {
        severity: 'success',
        autoHideDuration: 2000,
      });
      queryClient.invalidateQueries({
        queryKey: ['viewing']
      });
    }
  });
};