import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { FC, useContext } from "react";
import Avatar from "boring-avatars";
import DeleteIconButton from "../common/DeleteIconButton/DeleteIconButton";
import { GlobalContext } from "../../contexts/GlobalContext";

export interface MemberListItemArgs {
  name: string;
  handleDeleteMemberAlert: (isMemberDeteled: boolean) => void;
}

const MemberListItem: FC<MemberListItemArgs> = ({
  name,
  handleDeleteMemberAlert,
}) => {
  const { deleteMember } = useContext(GlobalContext)!;

  function tryDeleteMember(name: string) {
    const isMemberDeteled = deleteMember(name);
    handleDeleteMemberAlert(isMemberDeteled);
  }

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
          className: "whitespace-nowrap overflow-hidden text-ellipsis",
        }}
        className="ml-4"
      />
      <DeleteIconButton onDelete={() => tryDeleteMember(name)} />
    </ListItem>
  );
};

export default MemberListItem;
