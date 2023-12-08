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
  openDialog: boolean;
  onCancel: () => void;
  onDone: (memberName: string) => void;
}

const MemberEditDialog: FC<MemberEditArgs> = ({ openDialog, name }) => {
  const [memberName, setMemberName] = useState<string>(name ? name : "");

  return (
    <Dialog open={openDialog} maxWidth="xs" fullWidth>
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
        <Button variant="text">Cancel</Button>
        <Button variant="text" disabled={memberName === ""}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberEditDialog;
