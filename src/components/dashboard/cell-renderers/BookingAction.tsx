import { Booking } from '../../../types/bookings';
import ButtonDialog from '../../common/ButtonDialog';
import { RenderWithValueParams } from '../../../types/common';
import { useDeleteBookingMutation } from '../../../hooks/bookings/useDeleteBookingMutation';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';

export interface ActionCellProps {
  bookingId: string;
  roomName: string;
}

const BookingActionCell = ({ bookingId, roomName }: ActionCellProps) => {
  const { mutateAsync } = useDeleteBookingMutation(bookingId);

  const onSubmit = async () => {
    await mutateAsync();
  };

  return (
    <>
      <ButtonDialog
        buttonLabel='Delete'
        submitLabel='Yes'
        cancelLabel='No'
        dialogTitle={`Confirm Delete ${roomName} booking?`}
        onSubmit={onSubmit}
        variant='outlined'
        color='error'
        startIcon={<DeleteIcon />}
      >
        <Alert severity="warning">This action is irreversible!</Alert>
      </ButtonDialog>
    </>
  );
};

export const renderAction = (params: RenderWithValueParams<Booking>) => {
  if (!params.value?.id || !params.value?.room?.name) {
    return '';
  }
  return <BookingActionCell 
    bookingId={params.value.id}
    roomName={params.value.room.name}
  />;
};