import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import BillListItem from "./BillListItem";
import BillEditDialog from "../BillEditDialog/BillEditDialog";
import { useContext, useState } from "react";
import BillDetailDialog from "../BillDetailDialog/BillDetailDialog";
import { BillInfo } from "../../utils/BillInfo";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { GlobalContext } from "../../contexts/GlobalContext";

// FIX:

function BillPanel() {
  const globalContext = useContext(GlobalContext);

  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [billDetailInfo, setBillDetailInfo] = useState<BillInfo>({
    id: nanoid(),
    amount: 0,
    payer: "payer",
    description: "Bill detail not exist",
    lenders: [],
    date: dayjs(),
  });
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
        {globalContext?.bills.map((v) => (
          <BillListItem
            key={v.id}
            billInfo={{
              id: v.id,
              amount: v.amount,
              date: v.date,
              payer: v.payer,
              lenders: v.lenders,
              description: v.description,
            }}
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
