import { AppBar, IconButton, List, Toolbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import BillListItem from "./BillListItem";
import BillEditDialog from "../BillEditDialog/BillEditDialog";
import { useState } from "react";
import BillDetailDialog from "../BillDetailDialog/BillDetailDialog";
import { BillInfo } from "../../utils/BillInfo";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

// FIX:

function BillPanel() {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [billDetailInfo, setBillDetailInfo] = useState<BillInfo>({
    id: nanoid(),
    amount: 0,
    payer: "payer",
    description: "Bill not exist",
    lenders: [],
    date: dayjs(),
  });
  function handleDetailOpen(billInfo: BillInfo) {
    setBillDetailInfo(billInfo);
    setIsDetailOpen(true);
  }
  
  const [billEditInfo, setBillEditInfo] = useState<BillInfo | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  function handleBillChange() {
    setIsEditOpen(false);
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
        <BillListItem
          billInfo={{
            id: "sfjjsfds",
            amount: 0.1,
            date: dayjs("2018-04-04T16:00:00.000Z"),
            payer: "kelly",
            lenders: ["bill", "bill2", "hie", "hihdfg"],
            description: "Lorem ipsum dolor sit aliquam.",
          }}
          onDetailOpen={handleDetailOpen}
          onEditOpen={handleEditOpen}
        />
        <BillListItem
          billInfo={{
            id: "dsf",
            amount: 23.535,
            date: dayjs("2018-04-04T16:00:00.000Z"),
            payer: "Kelly",
            lenders: ["bill", "hihdfg"],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dui.",
          }}
          onDetailOpen={handleDetailOpen}
          onEditOpen={handleEditOpen}
        />
        <BillListItem
          billInfo={{
            id: "dsfsa",
            amount: 65535.78,
            date: dayjs("2018-04-04T16:00:00.000Z"),
            payer: "Kelly",
            lenders: ["bill", "hihdfg"],
            description: "Lorem ipsum",
          }}
          onDetailOpen={handleDetailOpen}
          onEditOpen={handleEditOpen}
        />
      </List>
      <BillEditDialog
        isOpen={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onConfirm={() => handleBillChange()}
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
