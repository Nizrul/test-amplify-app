import { useQuery } from '@tanstack/react-query';
import { useBoundStore } from '../common/useBoundStore';

export const useGetViewingsQuery = () => {
  const { getViewings } = useBoundStore();
  return useQuery({
    queryKey: ['viewing'],
    queryFn: (userId) => {
      const viewings = getViewings();
      console.log(`Getting viewings for user with id ${userId}`, viewings);
      // const viewings = localStorageUtil.getObject<Viewing[]>('viewing');
      // setViewings(viewings);
      return viewings;
    },
  });
};