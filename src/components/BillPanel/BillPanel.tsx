import {
  AppBar,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import BillListItem from "./BillListItem";
import BillEditDialog from "../BillEditDialog/BillEditDialog";
import { useContext, useRef, useState } from "react";
import BillDetailDialog from "../BillDetailDialog/BillDetailDialog";
import { BillInfo } from "../../utils/billInfo";
import { GlobalContext } from "../../contexts/GlobalContext";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";
import { SnackbarContext } from "../../contexts/SnackbarContextProvider";

function BillPanel() {
  const globalContext = useContext(GlobalContext);
  const { openSnackbar } = useContext(SnackbarContext);

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
  async function handleBillChange(billInfo: BillInfo) {
    setIsEditOpen(false);
    const success = await globalContext.updateBill(billInfo);
    if (success) {
      openSnackbar("Updated the bill list");
    } else {
      openSnackbar("Failed to update the bill list", "error");
    }
  }
  function handleEditOpen(billInfo: BillInfo) {
    setBillEditInfo(billInfo);
    setIsEditOpen(true);
  }

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const menuAnchor = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Bills
          </Typography>
          {globalContext.isEditableLink && <>
            <IconButton onClick={() => setIsEditOpen(true)}>
              <AddIcon />
            </IconButton>
            <IconButton ref={menuAnchor} onClick={() => setMenuOpen(true)}>
              <MoreVertIcon />
            </IconButton>
          </>}
          <Menu
            anchorEl={menuAnchor.current}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                setIsConfirmDialogOpen(true);
                setMenuOpen(false);
              }}
            >
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText> Delete All Bills </ListItemText>
            </MenuItem>
          </Menu>
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
      <DeleteConfirmDialog
        isOpen={isConfirmDialogOpen}
        onDelete={ async () => {
          const success = await globalContext.deleteAllBills();
          if (success) {
            openSnackbar("Deleted all bills");
          } else {
            openSnackbar("Failed to delete all bills", "error");
          }
        }}
        onCancel={() => setIsConfirmDialogOpen(false)}
        message="Are you sure you want to permanently delete all your bills?"
      />
    </>
  );
}

export default BillPanel;
