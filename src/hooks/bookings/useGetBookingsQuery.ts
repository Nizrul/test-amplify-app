import { useQuery } from '@tanstack/react-query';
import { useBoundStore } from '../common/useBoundStore';

export const useGetBookingsQuery = () => {
  const { getBookings } = useBoundStore();
  return useQuery({
    queryKey: ['booking'],
    queryFn: (userId) => {
      const bookings = getBookings();
      console.log(`Getting bookings for user with id ${userId}`, bookings);
      // const bookings = localStorageUtil.getObject<Booking[]>('booking');
      // setBookings(bookings);
      return bookings;
    },
  });
};