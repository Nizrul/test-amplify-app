import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Booking } from '../../types/bookings';
import { currencyUtil } from '../../utils/currency';
import { dateUtil } from '../../utils/date';
import { renderStatusChip } from '../common/renderers/StatusChip';
import { Paper } from '@mui/material';
import { renderDebug } from './cell-renderers/BookingDebug';
import { renderAction } from './cell-renderers/BookingAction';

export interface BookingTableProps {
  bookings?: Booking[];
}

function BookingTable({ bookings }: BookingTableProps) {
  const rows = bookings?.map(booking => {
    return {
      ...booking,
      roomName: booking.room.name,
      pricePerMonth: booking.room.price,
      bookingDateRange: `${dateUtil.formatDate(booking.bookingDateFrom)} - ${dateUtil.formatDate(booking.bookingDateTo)}`,
      // HACK: passing booking by setting them in the field for the action columns
      debug: booking,
      action: booking,
    };
  }) || [];
  const columns: GridColDef[] = 
  [
    {
      field: 'roomName',
      headerName: 'Room Name',
      width: 150
    }, 
    {
      field: 'bookingDateRange',
      headerName: 'Booking Dates',
      width: 200,
    }, 
    {
      field: 'duration',
      headerName: 'Duration',
      align: 'right',
      valueFormatter: (value) => `${value} month${value > 1 ? 's': ''}`
    }, 
    {
      field: 'pricePerMonth',
      headerName: 'Price Per Month',
      align: 'right',
      valueFormatter: (value) => `${currencyUtil.formatCurrency(value)} / month`,
      width: 200,
    }, 
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      align: 'right',
      valueFormatter: currencyUtil.formatCurrency,
      width: 150,
    }, 
    {
      field: 'bookedDate',
      headerName: 'Booked At',
      valueFormatter: dateUtil.formatDate
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: renderStatusChip,
      align: 'center',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      align: 'center',
      renderCell: renderAction,
      width: 150
    },
    {
      field: 'debug',
      headerName: 'Debug',
      align: 'center',
      renderCell: renderDebug,
      width: 200
    }
  ];

  return (
    <Paper>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        rowSelection={false}
      />
    </Paper>
  );
}

export default BookingTable;