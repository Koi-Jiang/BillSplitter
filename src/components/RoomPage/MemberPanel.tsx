import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

function MemberPanel() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Member
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="px-2">
        <div>
          <p>Lorem, ipsum dolor.</p>
        </div>
        <div>
          <p>Beatae, assumenda excepturi.</p>
        </div>
        <div>
          <p>Explicabo, magni! Modi!</p>
        </div>
        <div>
          <p>Provident, tempore illum.</p>
        </div>
        <div>
          <p>Vel, repellat beatae.</p>
        </div>
      </div>
    </>
  );
}

export default MemberPanel;
