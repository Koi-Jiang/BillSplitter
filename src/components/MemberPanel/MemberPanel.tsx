import {
  AppBar,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MemberListItem from "./MemberListItem";
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import MemberAddDialog from "../MemberAddDialog/MemberAddDialog";

function MemberPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { members, addMember, isEditableLink } = useContext(GlobalContext)!;

  function handleMemberEditConfirm(memberName: string): Promise<boolean> {
    setIsDialogOpen(false);
    return addMember(memberName);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Members
          </Typography>
          {isEditableLink && 
            <IconButton onClick={() => setIsDialogOpen(true)}>
              <AddIcon />
            </IconButton>
          }
        </Toolbar>
      </AppBar>

      <List>
        {members.map((v) => (
          <MemberListItem
            key={v}
            name={v}
          />
        ))}
      </List>

      <MemberAddDialog
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={(memberName) => handleMemberEditConfirm(memberName)}
      />
    </>
  );
}

export default MemberPanel;
