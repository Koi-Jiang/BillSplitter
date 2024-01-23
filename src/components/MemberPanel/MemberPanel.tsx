import {
  Alert,
  AppBar,
  IconButton,
  List,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MemberListItem from "./MemberListItem";
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import MemberAddDialog from "../MemberAddDialog/MemberAddDialog";
import { SNACKBAR_HIDE_DURATION } from "../../utils/constants";

function MemberPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { members, addMember } = useContext(GlobalContext)!;

  function handleMemberEditConfirm(memberName: string): boolean {
    setIsDialogOpen(false);
    const isMemberAdded = addMember(memberName);
    return isMemberAdded;
  }

  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] =
    useState<boolean>(false);
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] =
    useState<boolean>(false);

  function handleDeleteMemberAlert(isMemberDeteled: boolean) {
    setIsSuccessSnackbarOpen(isMemberDeteled);
    setIsErrorSnackbarOpen(!isMemberDeteled);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h6" className="flex-auto">
            Members
          </Typography>
          <IconButton onClick={() => setIsDialogOpen(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List>
        {members.map((v) => (
          <MemberListItem
            key={v}
            name={v}
            handleDeleteMemberAlert={handleDeleteMemberAlert}
          />
        ))}
      </List>

      <MemberAddDialog
        isOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={(memberName) => handleMemberEditConfirm(memberName)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSuccessSnackbarOpen}
        autoHideDuration={SNACKBAR_HIDE_DURATION}
        onClose={() => setIsSuccessSnackbarOpen(false)}
      >
        <Alert variant="outlined" severity="success">
          Successfully delete the member
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isErrorSnackbarOpen}
        autoHideDuration={SNACKBAR_HIDE_DURATION}
        onClose={() => setIsErrorSnackbarOpen(false)}
      >
        <Alert variant="outlined" severity="error">
          Cannot delete a member in existing bills
        </Alert>
      </Snackbar>
    </>
  );
}

export default MemberPanel;
