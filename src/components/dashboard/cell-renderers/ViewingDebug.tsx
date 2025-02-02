import { z } from 'zod';
import { Viewing, ViewingStatus } from '../../../types/viewings';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import ButtonDialog from '../../common/ButtonDialog';
import { RenderWithValueParams } from '../../../types/common';
import { useUpdateViewingMutation } from '../../../hooks/viewings/useUpdateViewingMutation';
import { MenuItem, Select } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const schema = z.object({
  viewingStatus: z.nativeEnum(ViewingStatus),
  agreedDate: z.date()
}).required();

export type DebugViewingStatusTransitionPayload = z.infer<typeof schema>;

export interface DebugCellProps {
  viewingId: string;
  currentStatus: ViewingStatus;
  suggestedDate: Date;
  currentAgreedDate: Date | undefined;
}

const ViewingDebugCell = ({ viewingId, currentStatus, suggestedDate, currentAgreedDate }: DebugCellProps) => {
  const { mutateAsync } = useUpdateViewingMutation(viewingId);
  const { handleSubmit, formState: { errors }, register, control } = useForm<DebugViewingStatusTransitionPayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      agreedDate: currentAgreedDate || suggestedDate,
      viewingStatus: currentStatus
    }
  });

  const onSubmit = async ({ viewingStatus, agreedDate }: DebugViewingStatusTransitionPayload) => {
    await mutateAsync({ status: viewingStatus, agreedDate });
  };

  return (
    <>
      <ButtonDialog
        buttonLabel='Update viewing'
        dialogTitle='Update Viewing'
        onSubmit={handleSubmit(onSubmit)}
        variant='outlined'
        startIcon={<ConstructionIcon />}
      >
        {errors.viewingStatus?.message && <p>{errors.viewingStatus?.message.toString()}</p>}
        <Select
          sx={{ width: '100%', mb: 2 }}
          {...register('viewingStatus')}
          defaultValue={currentStatus}
        >
          {
            Object.values(ViewingStatus).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))
          }
        </Select>
        <Controller 
          name="agreedDate"
          control={control}
          render={({ field }) => (
            <DateTimePicker 
              sx={{ mb: 2 }}
              label={'Final Viewing Date'}
              onChange={(item) => field.onChange(item?.toDate())}
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
};

export const renderDebug = (params: RenderWithValueParams<Viewing>) => {
  if (!params.value?.id || !params.value?.status) {
    return '';
  }
  return <ViewingDebugCell 
    viewingId={params.value.id}
    currentStatus={params.value.status}
    suggestedDate={params.value.suggestedDate}
    currentAgreedDate={params.value.agreedDate}
  />;
};