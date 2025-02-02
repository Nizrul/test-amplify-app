import { useQuery } from '@tanstack/react-query';

export const useGetBookingList = () => useQuery({
  queryKey: ['booking'],
  queryFn: () => [],
  enabled: false
});