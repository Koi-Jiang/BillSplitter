import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import BillListItem from "./BillListItem";
import BillEditDialog from "../BillEditDialog/BillEditDialog";
import { useState } from "react";


// FIX:

function BillPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  function handleBillChange() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Bills
          </Typography>
          <IconButton onClick={() => setIsDialogOpen(true)}>
            <AddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <BillListItem
          amount={0.1}
          payer="Kelly"
          lenders={["bill", "bill2", "hie", "hihdfg"]}
          description="jilihl0"
        />
        <BillListItem
          amount={23.535}
          payer="Kelly"
          lenders={["bill", "hihdfg"]}
          description="jilihl0"
        />
        <BillListItem
          amount={78778778.78}
          payer="Kelly"
          lenders={["bill", "hihdfg"]}
          description="jilihl0"
        />
      </List>
      <BillEditDialog 
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={() => handleBillChange()}
      />
    </>
  );
}

export default BillPanel;
