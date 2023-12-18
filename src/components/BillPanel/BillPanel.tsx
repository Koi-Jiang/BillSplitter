import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import BillListItem from "./BillListItem";
import BillEditDialog from "../BillEditDialog/BillEditDialog";
import { useState } from "react";
import BillDetailDialog from "../BillDetailDialog/BillDetailDialog";
import { BillInfo } from "../../utils/BillInfo";

// FIX:

function BillPanel() {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  function handleBillChange() {
    setIsEditOpen(false);
  }

  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [billDetailInfo, setBillDetailInfo] = useState<BillInfo>({
    amount: 0,
    payer: "payer",
    description: "Bill not exist",
    lenders: [],
  });
  function handleDetailOpen(billInfo: BillInfo) {
    setBillDetailInfo(billInfo);
    setIsDetailOpen(true);
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
        <BillListItem
          billInfo={{
            amount: 0.1,
            payer: "kelly",
            lenders: ["bill", "bill2", "hie", "hihdfg"],
            description: "abcdefghijklmnopqrstuvwxyzssss w",
          }}
          onClick={handleDetailOpen}
        />
        <BillListItem
          billInfo={{
            amount: -23.535,
            payer: "Kelly",
            lenders: ["bill", "hihdfg"],
            description: "jilihl0",
          }}
          onClick={handleDetailOpen}
        />
        <BillListItem
          billInfo={{
            amount: 78778778.78,
            payer: "Kelly",
            lenders: ["bill", "hihdfg"],
            description: "jilihl0",
          }}
          onClick={handleDetailOpen}
        />
      </List>
      <BillEditDialog
        isOpen={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onConfirm={() => handleBillChange()}
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
