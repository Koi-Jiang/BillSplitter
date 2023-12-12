import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MemberListItem from "./MemberListItem";
import { useState } from "react";
import MemberEditDialog from "../MemberEditDialog/MemberEditDialog";

function MemberPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  function handleMemberEditConfirm(memberName) {
    setIsDialogOpen(false);
    // and new member to memberList(not create yet)
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
        <MemberListItem name="this bill is not that bill" />
        <MemberListItem name="Bill Peng" />
        <MemberListItem name="Emily" />
        <MemberListItem name="Kelly" />
        <MemberListItem name="this bill is notooo that bill" />
        <MemberListItem name="this bill ioos not that bill" />
        <MemberListItem name="this obill is not that =======++++\
          ========================== bill" />
        <MemberListItem name="this boill is not that bill" />
      </List>

      <MemberEditDialog
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={(memberName) => handleMemberEditConfirm(memberName)}
      />
    </>
  );
}

export default MemberPanel;
