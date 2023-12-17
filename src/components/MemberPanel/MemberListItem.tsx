import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { FC, useState } from "react";
import Avatar from "boring-avatars";
import EditIcon from "@mui/icons-material/Edit";
import MemberEditDialog from "../MemberEditDialog/MemberEditDialog";

export interface MemberListItemArgs {
  name: string;
}

const MemberListItem: FC<MemberListItemArgs> = ({ name }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [memberName, setMemberName] = useState<string>(name);

  function handleMemberEditConfirm(name: string) {
    setIsDialogOpen(false);
    setMemberName(name);
  }
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            size={64}
            name={memberName}
            variant="beam"
            colors={["#5b36c2", "#6f53d1", "#866ddf", "#9d85ed", "#b69efa"]}
          />
        </ListItemAvatar>
        <ListItemText
          primary={memberName}
          primaryTypographyProps={{
            variant: "h6",
            component: "p",
            fontWeight: "normal",
            className: "whitespace-nowrap overflow-hidden text-ellipsis",
          }}
          className="ml-4"
        />
        <IconButton onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </IconButton>
      </ListItem>
      <MemberEditDialog
        name={memberName}
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={(name) => handleMemberEditConfirm(name)}
      />
    </>
  );
};

export default MemberListItem;
