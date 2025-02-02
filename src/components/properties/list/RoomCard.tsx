import { Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';
import reptile from '../../../static/images/cards/contemplative-reptile.jpg';
import BookingDialog, { BookingFormPayload } from './BookingDialog';
import { Room } from '../../../types/properties';
import ViewingDialog, { ViewingFormPayload } from './ViewingDialog';
import { useCreateBookingMutation } from '../../../hooks/bookings/useCreateBookingMutation';
import { v4 as uuid } from 'uuid';
import { BookingStatus } from '../../../types/bookings';
import { currencyUtil } from '../../../utils/currency';
import dayjs from 'dayjs';
import { useCreateViewingMutation } from '../../../hooks/viewings/useCreateViewingMutation';
import { ViewingStatus } from '../../../types/viewings';

export interface RoomCardProps {
  officeName: string;
  room: Room;
}

function RoomCard(props: RoomCardProps) {
  const { officeName, room } = props;
  const { mutateAsync: mutateBookingAsync } = useCreateBookingMutation();
  const { mutateAsync: mutateViewingAsync } = useCreateViewingMutation();
  return <Card sx={{ width: 345, mr: 4 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={reptile}
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {room.name}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{`${currencyUtil.formatCurrency(room.price)} / month`}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {room.description}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent:'end'}}>
      <ViewingDialog 
        propertyName={`${officeName} - ${room.name}`}
        onSubmit={async (data: ViewingFormPayload) => {
          console.warn('This is the received viewing data', data);
          const { viewingDateTime } = data;
          await mutateViewingAsync({
            id: uuid(),
            roomId: room.id,
            customerId: 'test',
            status: ViewingStatus.PENDING_ADMIN,
            suggestedDate: viewingDateTime,
            room
          });
        }}
      />
      <BookingDialog 
        propertyName={`${officeName} - ${room.name}`}
        onSubmit={async (data: BookingFormPayload) => {
          console.warn('This is the received booking data', data);
          const { bookingDate, bookingDuration } = data;
          await mutateBookingAsync({
            id: uuid(),
            customerId: 'test',
            roomId: room.id,
            totalPrice: room.price * bookingDuration,
            bookingDateFrom: bookingDate,
            bookingDateTo: dayjs(bookingDate).add(bookingDuration, 'months').toDate(),
            duration: bookingDuration,
            status: BookingStatus.PENDING,
            bookedDate: new Date(),
            room
          });
        }}
      />
    </CardActions>
  </Card>;
}

export default RoomCard;