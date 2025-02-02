import { Viewing } from '../../../types/viewings';
import ButtonDialog from '../../common/ButtonDialog';
import { RenderWithValueParams } from '../../../types/common';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import { useDeleteViewingMutation } from '../../../hooks/viewings/useDeleteViewingsMutation';

export interface ActionCellProps {
  viewingId: string;
  roomName: string;
}

const ViewingActionCell = ({ viewingId, roomName }: ActionCellProps) => {
  const { mutateAsync } = useDeleteViewingMutation(viewingId);

  const onSubmit = async () => {
    await mutateAsync();
  };

  return (
    <>
      <ButtonDialog
        buttonLabel='Delete'
        submitLabel='Yes'
        cancelLabel='No'
        dialogTitle={`Confirm Delete ${roomName} viewing?`}
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

export const renderAction = (params: RenderWithValueParams<Viewing>) => {
  if (!params.value?.id || !params.value?.room?.name) {
    return '';
  }
  return <ViewingActionCell 
    viewingId={params.value.id}
    roomName={params.value.room.name}
  />;
};