import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import BillListItem from "./BillListItem";
import BillEditDialog from "../BillEditDialog/BillEditDialog";
import { useContext, useState } from "react";
import BillDetailDialog from "../BillDetailDialog/BillDetailDialog";
import { BillInfo } from "../../utils/billInfo";
import { GlobalContext } from "../../contexts/GlobalContext";

// FIX:

function BillPanel() {
  const globalContext = useContext(GlobalContext);

  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [billDetailInfo, setBillDetailInfo] = useState<BillInfo>(
    new BillInfo(),
  );
  function handleDetailOpen(billInfo: BillInfo) {
    setBillDetailInfo(billInfo);
    setIsDetailOpen(true);
  }

  const [billEditInfo, setBillEditInfo] = useState<BillInfo | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  function handleBillChange(billInfo: BillInfo) {
    setIsEditOpen(false);
    globalContext.updateBill(billInfo);
  }
  function handleEditOpen(billInfo: BillInfo) {
    setBillEditInfo(billInfo);
    setIsEditOpen(true);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Bills
          </Typography>
          <IconButton onClick={() => setIsEditOpen(true)}>
            <AddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        {
          // TODO: add color difference between old and even lines + add hover color change and make it clickable
        }
        {globalContext?.bills
          .toSorted((a, b) => {
            return a.date.isBefore(b.date) ? 1 : -1;
          })
          .map((v) => (
            <BillListItem
              key={v.id}
              billInfo={v}
              onDetailOpen={handleDetailOpen}
              onEditOpen={handleEditOpen}
            />
          ))}
      </List>
      <BillEditDialog
        isOpen={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onConfirm={handleBillChange}
        billInfo={billEditInfo}
      />
      <BillDetailDialog
        isOpen={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        billInfo={billDetailInfo}
      />
    </>
  );
}

export default BillPanel;
