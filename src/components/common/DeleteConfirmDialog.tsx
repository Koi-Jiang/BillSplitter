import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface DeleteConfirmArgs {
  message: string;
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteConfirmDialog: FC<DeleteConfirmArgs> = ({
  message,
  onDelete,
  isOpen,
  onCancel,
}) => {
  return (
    <Dialog open={isOpen} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography component="p">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            onDelete();
            onCancel();
          }}
          className="text-red-500"
        >
          Delete
        </Button>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
