import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { FC, useState } from "react";
import ValidatedTextField from "../common/ValidatedTextField";
import { SNACKBAR_HIDE_DURATION } from "../../utils/constants";

export interface MemberAddArgs {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (memberName: string) => boolean;
}

const MemberAddDialog: FC<MemberAddArgs> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const [memberName, setMemberName] = useState<string>("");
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] =
    useState<boolean>(false);
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] =
    useState<boolean>(false);

  function handleAddMember() {
    const isMemberAdded = onConfirm(memberName.trim());
    setMemberName("");
    setIsSuccessSnackbarOpen(isMemberAdded);
    setIsErrorSnackbarOpen(!isMemberAdded);
  }

  return (
    <>
      <Dialog open={isOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Member</DialogTitle>
        <DialogContent>
          <ValidatedTextField
            immediate={true}
            validator={(value) =>
              value.trim() === "" ? "Member name can't be empty" : ""
            }
            autoFocus
            label="Name"
            fullWidth
            variant="standard"
            required
            inputProps={{ maxLength: 20 }}
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            onKeyUp={(e) => e.code === "Enter" && handleAddMember()}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => {
              onCancel();
              setMemberName("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            onClick={handleAddMember}
            disabled={memberName.trim() === ""}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSuccessSnackbarOpen}
        autoHideDuration={SNACKBAR_HIDE_DURATION}
        onClose={() => setIsSuccessSnackbarOpen(false)}
      >
        <Alert variant="outlined" severity="success">
          Added a new member
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isErrorSnackbarOpen}
        autoHideDuration={SNACKBAR_HIDE_DURATION}
        onClose={() => setIsErrorSnackbarOpen(false)}
      >
        <Alert variant="outlined" severity="error">
          Cannnot add a member already exists
        </Alert>
      </Snackbar>
    </>
  );
};

export default MemberAddDialog;
