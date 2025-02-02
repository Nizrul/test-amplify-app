import ButtonDialog from '../../common/ButtonDialog';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Input, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const schema = z.object({
  bookingDate: z.date(),
  bookingDuration: z.number().int().min(12),
});

export type BookingFormPayload = z.infer<typeof schema>;

export interface BookingDialogProps {
  propertyName: string;
  onSubmit: (data: BookingFormPayload) => void;
}

function BookingDialog(props: BookingDialogProps) {
  const { propertyName, onSubmit } = props;
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      bookingDate: new Date(),
      bookingDuration: 12,
    }
  });

  console.warn('Form errors are', errors);

  return (
    <>
      <ButtonDialog 
        buttonLabel='Book now'
        dialogTitle={`Book ${propertyName}`}
        onSubmit={handleSubmit(onSubmit)}
        validation={() => isValid}
      >
        <Alert severity="info" sx={{ mb: 2 }}>We will review the requested booking date and duration before confirmation.</Alert>
        <Typography variant='body2' sx={{ mb: 1 }}>When are you booking the property?</Typography>
        {errors.bookingDate?.message && <Alert severity="error" sx={{ mt: 1, mb: 1 }}>{errors.bookingDate?.message.toString()}</Alert>}
        <Controller 
          name="bookingDate"
          control={control}
          render={({ field }) => (
            <DatePicker 
              sx={{ mb: 2 }}
              onChange={(item) => field.onChange(item?.toDate())}
              minDate={dayjs(new Date())}
              value={dayjs(field.value)}
            />
          )}
        />
        <Typography variant='body2' sx={{ mb: 1 }}>How long would you be booking it for?</Typography>
        {errors.bookingDuration?.message && <Alert severity="error" sx={{ mt: 1, mb: 1 }}>{errors.bookingDuration?.message.toString()}</Alert>}
        <Controller 
          name="bookingDuration"
          control={control}
          render={({ field }) => (
            <Input 
              sx={{ mb: 2 }}
              onChange={(item) => item && field.onChange(parseInt(item.target.value))}
              type='number'
              inputProps={{
                step: 1
              }}
              value={field.value}
            />
          )}
        />
      </ButtonDialog>
    </>
  );
}

export default BookingDialog;