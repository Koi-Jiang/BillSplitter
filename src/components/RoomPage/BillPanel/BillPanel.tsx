import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import BillListItem from "./BillListItem";

function BillPanel() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Bills
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <BillListItem
          amount={656}
          payer="Kelly"
          lenders={["bill", "bill2", "hie", "hihdfg"]}
          description="jilihl0"
          date={242424242}
        />{" "}
        <BillListItem
          amount={656333.533}
          payer="Kelly"
          lenders={["bill", "hihdfg"]}
          description="jilihl0"
          date={242424242}
        />{" "}
      </List>
    </>
  );
}

export default BillPanel;
