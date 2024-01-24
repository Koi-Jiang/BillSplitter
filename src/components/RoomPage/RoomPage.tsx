import style from "./roomPage.module.scss";
import {
  AppBar,
  Box,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MemberPanel from "../MemberPanel/MemberPanel";
import BillPanel from "../BillPanel/BillPanel";
import ResultPanel from "../ResultPanel/ResultPanel";
import GlobalContextProvider, {
  GlobalContext,
} from "../../contexts/GlobalContext";
import LinkDisplayDialog from "../LinkDisplayDialog/LinkDisplayDialog";
import RenameRoomDialog from "../RenameRoomDialog/RanameRoomDialog";

function RoomPage() {
  const theme = useTheme();
  const mediumAndUp = useMediaQuery(() => theme.breakpoints.up("md"));

  // ref 1. bind DOM node(htmlElement)
  // 2. store mutable element which won't effect page change
  const shareMenuAnchor = useRef<HTMLButtonElement>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false);

  const settingMenuAnchor = useRef<HTMLButtonElement>(null);
  const [settingMenuOpen, setSettingMenuOpen] = useState<boolean>(false);

  const [linkDisplayOpen, setLinkDisplayOpen] = useState<boolean>(false);
  const [isEditLinkDisplay, setIsEditLinkDisplay] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>("");

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState<boolean>(false);

  function handleCopyLink(editable: boolean, link: string) {
    setLinkDisplayOpen(true);
    setIsEditLinkDisplay(editable);
    setShareLink(link);
    // copy it to system clipboard
    navigator.clipboard.writeText(link);
  }

  return (
    <GlobalContextProvider>
      <Box className="min-h-screen max-h-screen grid grid-rows-[64px_1fr]">
        <AppBar
          position="static"
          className="justify-center 
            pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] "
        >
          <Toolbar>
            <div className="flex-auto flex">
              <Typography
                component="h1"
                variant="h5"
                className="whitespace-nowrap 
                overflow-hidden text-ellipsis w-[60vw]"
              >
                <GlobalContext.Consumer>
                  {(context) => context.roomName}
                </GlobalContext.Consumer>
              </Typography>
            </div>
            <IconButton
              className="flex-none"
              size="large"
              ref={shareMenuAnchor}
              onClick={() => setShareMenuOpen(true)}
            >
              <ShareIcon />
            </IconButton>
            <Menu
              anchorEl={shareMenuAnchor.current}
              open={shareMenuOpen}
              onClose={() => setShareMenuOpen(false)}
            >
              <GlobalContext.Consumer>
                {(context) => (
                  <MenuItem
                    onClick={() =>
                      handleCopyLink(
                        false,
                        window.location.origin + "/" + context.readonlyId,
                      )
                    }
                  >
                    <ListItemIcon>
                      <VisibilityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> Copy Read-only Link </ListItemText>
                  </MenuItem>
                )}
              </GlobalContext.Consumer>

              <MenuItem
                onClick={() => handleCopyLink(true, window.location.href)}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText> Copy Editable Link </ListItemText>
              </MenuItem>
            </Menu>

            <IconButton
              className="flex-none"
              size="large"
              ref={settingMenuAnchor}
              onClick={() => setSettingMenuOpen(true)}
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              anchorEl={settingMenuAnchor.current}
              open={settingMenuOpen}
              onClose={() => setSettingMenuOpen(false)}
            >
              <MenuItem onClick={() => setIsRenameDialogOpen(true)}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText> Rename Room </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <RestartAltIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText> Reset Room </ListItemText>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            maxHeight: mediumAndUp ? "calc(100vh - 64px)" : undefined,
            bgcolor: theme.palette.background.default,
          }}
          className={`${style.sectionContainer} grid gap-2 
            md:grid-rows-2 md:grid-cols-[2fr_1fr]
            xl:grid-rows-1 xl:grid-cols-[min(25%,500px)_auto_min(25%,500px)]`}
        >
          <Paper
            component="section"
            elevation={2}
            className="row-auto col-auto order-3
              md:col-start-2 md:row-start-2 md:order-1
              xl:row-auto xl:col-auto"
          >
            <MemberPanel />
          </Paper>
          <Paper
            component="section"
            elevation={2}
            className="row-auto col-auto order-2
              md:row-span-2 md:order-2
              xl:row-span-1 xl:order-2"
          >
            <BillPanel />
          </Paper>
          <Paper
            component="section"
            elevation={2}
            className="row-auto col-auto order-1
              md:order-3"
          >
            <ResultPanel />
          </Paper>
        </Box>
      </Box>
      <LinkDisplayDialog
        link={shareLink}
        isOpen={linkDisplayOpen}
        isEditLink={isEditLinkDisplay}
        onCancel={() => setLinkDisplayOpen(false)}
      />
      <RenameRoomDialog
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
      />
    </GlobalContextProvider>
  );
}

export default RoomPage;
