import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MemberListItem from "./MemberListItem";
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import MemberAddDialog from "../MemberAddDialog/MemberAddDialog";

function MemberPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { members, addMember } = useContext(GlobalContext)!;

  function handleMemberEditConfirm(memberName: string): boolean {
    setIsDialogOpen(false);
    const isMemberAdded = addMember(memberName);
    return isMemberAdded;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Members
          </Typography>
          <IconButton onClick={() => setIsDialogOpen(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List>
        {members.map((v) => (
          <MemberListItem key={v} name={v} />
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
