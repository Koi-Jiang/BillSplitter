import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, useState } from "react";
import ValidatedTextField from "../common/ValidatedTextField";

export interface MemberAddArgs {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (memberName: string) => void;
}

const MemberAddDialog: FC<MemberAddArgs> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const [memberName, setMemberName] = useState<string>("");

  return (
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
          onClick={() => {onConfirm(memberName); setMemberName("");}}
          disabled={memberName === ""}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberAddDialog;
