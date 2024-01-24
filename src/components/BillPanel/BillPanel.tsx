import {
  Alert,
  AppBar,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
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
import { SNACKBAR_HIDE_DURATION } from "../../utils/constants";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";

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

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const [isDeleteSnackbarOpen, setIsDeleteSnackbarOpen] =
    useState<boolean>(false);
  const [isDeleteAllSnackbarOpen, setIsDeleteAllSnackbarOpen] =
    useState<boolean>(false);

  function handleDeleteBillAlert() {
    setIsDeleteSnackbarOpen(true);
  }

  const menuAnchor = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
          <IconButton ref={menuAnchor} onClick={() => setMenuOpen(true)}>
            <MoreVertIcon />
          </IconButton>
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
              handleDeleteBillAlert={handleDeleteBillAlert}
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
        onDelete={() => {
          globalContext.deleteAllBills();
          setIsDeleteAllSnackbarOpen(true);
        }}
        onCancel={() => setIsConfirmDialogOpen(false)}
        message="Are you sure you want to permanently delete all your bills?"
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isDeleteSnackbarOpen}
        autoHideDuration={SNACKBAR_HIDE_DURATION}
        onClose={() => setIsDeleteSnackbarOpen(false)}
      >
        <Alert variant="outlined" severity="success">
          <Typography component="p">Deleted a bill</Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isDeleteAllSnackbarOpen}
        autoHideDuration={SNACKBAR_HIDE_DURATION}
        onClose={() => setIsDeleteAllSnackbarOpen(false)}
      >
        <Alert variant="outlined" severity="success">
          <Typography component="p">Deleted all bills</Typography>
        </Alert>
      </Snackbar>
    </>
  );
}

export default BillPanel;
