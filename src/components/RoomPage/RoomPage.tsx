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
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MemberPanel from "../MemberPanel/MemberPanel";
import BillPanel from "../BillPanel/BillPanel";
import ResultPanel from "../ResultPanel/ResultPanel";

function RoomPage() {
  const { roomId } = useParams();
  const theme = useTheme();
  const mediumAndUp = useMediaQuery(() => theme.breakpoints.up("md"));

  const shareMenuAnchor = useRef<HTMLButtonElement>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false);

  return (
    <Box className="min-h-screen max-h-screen grid grid-rows-[64px_1fr]">
      <AppBar
        position="static"
        className="justify-center 
          pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] "
      >
        <Toolbar>
          <div className="flex-auto">
            <Typography
              component="h1"
              variant="h5"
              className="whitespace-nowrap 
              overflow-hidden text-ellipsis w-[60vw]"
            >
              {roomId}
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
            <MenuItem>
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText> Copy Read-only Link </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText> Copy Editable Link </ListItemText>
            </MenuItem>
          </Menu>
          <IconButton size="large" className="flex-none">
            <SettingsIcon />
          </IconButton>
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
  );
}

export default RoomPage;
