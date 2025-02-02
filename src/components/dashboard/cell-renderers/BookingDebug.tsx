import { z } from 'zod';
import { Booking, BookingStatus } from '../../../types/bookings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ButtonDialog from '../../common/ButtonDialog';
import { RenderWithValueParams } from '../../../types/common';
import { useUpdateBookingMutation } from '../../../hooks/bookings/useUpdateBookingMutation';
import { MenuItem, Select } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const schema = z.object({
  bookingStatus: z.nativeEnum(BookingStatus)
}).required();

export type DebugBookingStatusTransitionPayload = z.infer<typeof schema>;

export interface DebugCellProps {
  bookingId: string;
  currentStatus: BookingStatus;
}

const BookingDebugCell = ({ bookingId, currentStatus }: DebugCellProps) => {
  const { mutateAsync } = useUpdateBookingMutation(bookingId);
  const { handleSubmit, formState: { errors }, register } = useForm<DebugBookingStatusTransitionPayload>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async ({ bookingStatus }: DebugBookingStatusTransitionPayload) => {
    await mutateAsync({ status: bookingStatus });
  };

  return (
    <>
      <ButtonDialog
        buttonLabel='Transition status'
        dialogTitle='Transition Booking Status'
        onSubmit={handleSubmit(onSubmit)}
        variant='outlined'
        startIcon={<ConstructionIcon />}
      >
        {errors.bookingStatus?.message && <p>{errors.bookingStatus?.message.toString()}</p>}
        <Select
          sx={{ width: '100%' }}
          {...register('bookingStatus')}
          defaultValue={currentStatus}
        >
          {
            Object.values(BookingStatus).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))
          }
        </Select>
      </ButtonDialog>
    </>
  );
};

export const renderDebug = (params: RenderWithValueParams<Booking>) => {
  if (!params.value?.id || !params.value?.status) {
    return '';
  }
  return <BookingDebugCell 
    bookingId={params.value.id}
    currentStatus={params.value.status}
  />;
};