import { Typography } from '@mui/material';
import { useGetBookingsQuery } from '../../hooks/bookings/useGetBookingsQuery';
import BookingTable from './BookingTable';
import ViewingTable from './ViewingTable';
import { useGetViewingsQuery } from '../../hooks/viewings/useGetViewingsQuery';

function Dashboard() {
  const { data: bookingData } = useGetBookingsQuery();
  const { data: viewingData } = useGetViewingsQuery();
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom>Bookings</Typography>
      
      <BookingTable bookings={bookingData} />
      <Typography sx={{ mt: 4 }} variant="h5" gutterBottom>Viewings</Typography>
      <ViewingTable viewings={viewingData} />
    </div>
  );
}

export default Dashboard;
