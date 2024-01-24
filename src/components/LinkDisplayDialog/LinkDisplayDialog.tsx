import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FC, useContext } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SnackbarContext } from "../../contexts/SnackbarContextProvider";

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
  const { openSnackbar } = useContext(SnackbarContext);

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
                      openSnackbar("Copied to clipboard");
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
    </>
  );
};

export default LinkDisplayDialog;
