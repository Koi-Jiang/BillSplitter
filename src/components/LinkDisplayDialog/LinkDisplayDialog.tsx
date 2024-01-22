import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export interface LinkDisplayDialogArgs {
  link: string;
  isOpen: boolean;
  isEditLink: boolean;
  onCancel: () => void;
}

const LinkDisplayDialog: FC<LinkDisplayDialogArgs> = ({
  link,
  isEditLink,
  isOpen,
  onCancel,
}) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog open={isOpen} maxWidth="xs" fullWidth>
        <DialogTitle>
          Copy {isEditLink ? "Editable" : "Readonly"} Link
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Link"
            margin="normal"
            value={link}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      setIsSnackbarOpen(true);
                    }}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={() => {}}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={onCancel}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert variant="outlined">
          Copied to clipboard
        </Alert>
      </Snackbar>
    </>
  );
};

export default LinkDisplayDialog;
