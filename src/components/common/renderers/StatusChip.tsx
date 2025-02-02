import { Chip, ChipProps } from '@mui/material';
import { BookingStatus } from '../../../types/bookings';
import { RenderWithValueParams } from '../../../types/common';
import { ViewingStatus } from '../../../types/viewings';

export interface StatusProps {
  status: BookingStatus | ViewingStatus;
}

const StatusChip = ({ status }: StatusProps) => {
  const chipProps: ChipProps = {
    color: 'default'
  };

  switch (status) {
    case BookingStatus.CONFIRMED:
      chipProps.color = 'success';
      break;
    case BookingStatus.CANCELLED:
      chipProps.color = 'warning';
      break;
    case BookingStatus.REJECTED:
      chipProps.color = 'error';
      break;
    case ViewingStatus.PENDING_CUSTOMER:
      chipProps.color = 'info';
      break;
    case ViewingStatus.PENDING_ADMIN:
      chipProps.color = 'secondary';
      break;
  }

  return <Chip 
    {...chipProps}
    label={status}
  />;
};

export function renderStatusChip(params: RenderWithValueParams<BookingStatus & ViewingStatus>) {
  if (params.value === undefined || (!Object.values(BookingStatus).includes(params.value) && !Object.values(ViewingStatus).includes(params.value))) {
    return '';
  }

  return <StatusChip status={params.value} />;
}