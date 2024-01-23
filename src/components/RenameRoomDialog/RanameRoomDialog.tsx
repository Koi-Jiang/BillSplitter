import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import ValidatedTextField from "../common/ValidatedTextField";
import { ROOM_NAME_MAX_LENGTH } from "../../utils/constants";
import { GlobalContext } from "../../contexts/GlobalContext";

export interface RenameRoomArgs{
  isOpen: boolean;
  onClose: () => void;
}

const RenameRoomDialog: FC<RenameRoomArgs> = ({
  isOpen,
  onClose,
}) => {

  const { roomName, renameRoom } = useContext(GlobalContext);
  const [newName, setNewName] = useState<string>(roomName);

  useEffect(() => {
    setNewName(roomName);
  }, [roomName]);

  function handleRenameRoom() {
    renameRoom(newName);
    onClose();
  }

  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle>Room Name</DialogTitle>
      <DialogContent>
        <ValidatedTextField
          immediate={true}
          validator={(value) =>
            value.trim() === "" ? "Room name can't be empty" : ""
          }
          autoFocus
          label="Room Name"
          fullWidth
          variant="standard"
          required
          inputProps={{ maxLength: ROOM_NAME_MAX_LENGTH }}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyUp={(e) => e.code === "Enter" && handleRenameRoom()}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            onClose();
            setNewName(roomName);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={handleRenameRoom}
          disabled={newName.trim() === ""}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameRoomDialog;
