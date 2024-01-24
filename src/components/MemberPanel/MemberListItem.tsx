import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { FC, useContext } from "react";
import Avatar from "boring-avatars";
import DeleteIconButton from "../common/DeleteIconButton/DeleteIconButton";
import { GlobalContext } from "../../contexts/GlobalContext";
import { SnackbarContext } from "../../contexts/SnackbarContextProvider";

export interface MemberListItemArgs {
  name: string;
}

const MemberListItem: FC<MemberListItemArgs> = ({
  name,
}) => {
  const { deleteMember, isEditableLink } = useContext(GlobalContext)!;
  const { openSnackbar } = useContext(SnackbarContext);

  async function tryDeleteMember(name: string) {
    const isMemberDeteled = await deleteMember(name);
    if (isMemberDeteled) {
      openSnackbar("Successfully deleted member");
    } else {
      openSnackbar("Cannot delete a member in existing bills", "error");
    }
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
      { isEditableLink && <DeleteIconButton onDelete={() => tryDeleteMember(name)} /> }
    </ListItem>
  );
};

export default MemberListItem;
