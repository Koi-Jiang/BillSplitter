import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import ValidatedTextField from "../common/ValidatedTextField";
import { SnackbarContext } from "../../contexts/SnackbarContextProvider";

export interface MemberAddArgs {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (memberName: string) => Promise<boolean>;
}

const MemberAddDialog: FC<MemberAddArgs> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const { openSnackbar } = useContext(SnackbarContext);
  const [memberName, setMemberName] = useState<string>("");

  async function handleAddMember() {
    const isMemberAdded = onConfirm(memberName.trim());
    setMemberName("");
    if (await isMemberAdded) {
      openSnackbar("Added a new member");
    } else {
      openSnackbar("Failed to add a new member", "error");
    }
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
    </>
  );
};

export default MemberAddDialog;
