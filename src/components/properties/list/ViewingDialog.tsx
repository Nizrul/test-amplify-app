import ButtonDialog from '../../common/ButtonDialog';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';

const schema = z.object({
  viewingDateTime: z.date().refine((date) => {
    const dayjsDate = dayjs(date);
    const day = dayjsDate.day();
    const hour = dayjsDate.hour();
    // has to be weekday between 9AM and 5PM
    return day !== 0 && day !== 6 && hour >= 9 && hour <= 17; 
  }, 'Valid date/time are weekdays between 9AM to 5PM'),
});

export type ViewingFormPayload = z.infer<typeof schema>;

export interface ViewingDialogProps {
  propertyName: string;
  onSubmit: (data: ViewingFormPayload) => void;
}

function ViewingDialog(props: ViewingDialogProps) {
  const { propertyName, onSubmit } = props;
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      viewingDateTime: new Date(),
    }
  });

  console.warn('Form errors are', errors);

  return (
    <>
      <ButtonDialog 
        buttonLabel='Schedule a Viewing'
        dialogTitle={`Book ${propertyName}`}
        onSubmit={handleSubmit(onSubmit)}
        validation={() => isValid}
      >
        <Alert severity="info" sx={{ mb: 2 }}>We will review your request for viewing before agreeing on a final date/time.</Alert>
        <Typography variant='body2' sx={{ mb: 1 }}>When would you like to view the property?</Typography>
        {errors.viewingDateTime?.message && <Alert severity="error" sx={{ mt: 1, mb: 1 }}>{errors.viewingDateTime?.message.toString()}</Alert>}
        <Controller 
          name="viewingDateTime"
          control={control}
          render={({ field }) => (
            <DateTimePicker 
              sx={{ mb: 2 }}
              onChange={(item) => field.onChange(item?.toDate())}
              // only weekdays are available
              shouldDisableDate={(day) => day.day() == 0 || day.day() == 6}
              shouldDisableTime={(time) => time.hour() < 9 || time.hour() > 17}
              views={['year','month','day','hours']}
              minDate={dayjs(new Date())}
              value={dayjs(field.value)}
              viewRenderers={{
                hours: renderTimeViewClock
              }}
            />
          )}
        />
      </ButtonDialog>
    </>
  );
}

export default ViewingDialog;