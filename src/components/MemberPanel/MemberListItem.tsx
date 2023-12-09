import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import Avatar from "boring-avatars";
import EditIcon from "@mui/icons-material/Edit";

export interface MemberListItemArgs {
  name: string;
}

const MemberListItem: FC<MemberListItemArgs> = ({ name }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          size={64}
          name={name}
          variant="beam"
          colors={["#5b36c2", "#6f53d1", "#866ddf", "#9d85ed", "#b69efa"]}
        />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        primaryTypographyProps={{
          variant: "h6",
          component: "p",
          fontWeight: "normal",
          className: "whitespace-nowrap overflow-hidden text-ellipsis"
        }}
        className="ml-4"
      />
      <IconButton>
        <EditIcon />
      </IconButton>
    </ListItem>
  );
};

export default MemberListItem;
