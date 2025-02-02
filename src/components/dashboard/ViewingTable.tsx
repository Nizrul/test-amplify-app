import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Viewing } from '../../types/viewings';
import { dateUtil } from '../../utils/date';
import { renderStatusChip } from '../common/renderers/StatusChip';
import { Paper } from '@mui/material';
import { renderAction } from './cell-renderers/ViewingAction';
import { renderDebug } from './cell-renderers/ViewingDebug';

export interface ViewingTableProps {
  viewings?: Viewing[];
}

function ViewingTable({ viewings }: ViewingTableProps) {
  const rows = viewings?.map(viewing => {
    return {
      ...viewing,
      roomName: viewing.room.name,
      pricePerMonth: viewing.room.price,
      debug: viewing,
      action: viewing,
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
      field: 'suggestedDate',
      headerName: 'Suggested Viewing Date',
      valueFormatter: dateUtil.formatDate,
      width: 200
    },
    {
      field: 'agreedDate',
      headerName: 'Agreed Viewing Date',
      valueFormatter: dateUtil.formatDate,
      width: 200
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: renderStatusChip,
      align: 'center',
      width: 200,
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

export default ViewingTable;