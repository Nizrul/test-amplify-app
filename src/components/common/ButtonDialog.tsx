import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, ButtonProps, DialogActions, DialogContent } from '@mui/material';

export interface ButtonDialogProps extends ButtonProps {
  buttonLabel: string;
  submitLabel?: string;
  cancelLabel?: string;
  dialogTitle: string;
  onClose?: () => void;
  onSubmit?: () => void;
  validation?: () => boolean; 
}

function ButtonDialog(props: React.PropsWithChildren<ButtonDialogProps>) {
  const [open, setOpen] = React.useState(false);
  const { buttonLabel, submitLabel, cancelLabel, dialogTitle, onClose, onSubmit, validation, children, ...otherButtonProps } = props;

  const handleClose = () => {
    onClose?.();
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    onSubmit?.();
    if(!validation || validation()) {
      setOpen(false);
    }
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen} { ...otherButtonProps }>
        {buttonLabel}
      </Button>
      <Dialog onClose={handleClose} open={open} maxWidth={'xs'}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelLabel || 'Cancel'}</Button>
          <Button onClick={handleSubmit} type="submit">{submitLabel || 'Submit'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ButtonDialog;