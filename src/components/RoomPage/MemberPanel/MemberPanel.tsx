import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import MemberListItem from "./MemberListItem";
import { useState } from "react";


function MemberPanel() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Member
          </Typography>
          <IconButton onClick={() => setOpenDialog(true)}>
            <AddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
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
        <MemberListItem name="this obill is not that ================================== bill" />
        <MemberListItem name="this boill is not that bill" />
      </List>
    </>
  );
}

export default MemberPanel;
