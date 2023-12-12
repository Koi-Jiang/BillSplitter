import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";

export interface MemberEditArgs {
  name?: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (memberName: string) => void;
}

const MemberEditDialog: FC<MemberEditArgs> = ({
  isOpen,
  name,
  onCancel,
  onConfirm,
}) => {
  const [memberName, setMemberName] = useState<string>(name ?? "");

  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle>Member</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Name"
          fullWidth
          variant="standard"
          required
          inputProps={{ maxLength: 30 }}
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={() => onConfirm(memberName)}
          disabled={memberName === ""}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberEditDialog;
