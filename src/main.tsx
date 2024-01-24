import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import FrontPage from "./components/FrontPage/FrontPage";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
// font style
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import RoomPage from "./components/RoomPage/RoomPage";
// import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "reflect-metadata";
import SnackbarContextProvider from "./contexts/SnackbarContextProvider";

const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9763ea",
    },
  },
  breakpoints,
});

// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#7c4dff",
//     },
//     background: {
//       default: grey[100],
//     },
//   },
//   breakpoints,
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "/:roomId",
    element: <RoomPage />,
  },
]);

// Globally extend dayjs format
dayjs.extend(localizedFormat);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <SnackbarContextProvider>
            <CssBaseline />
            <RouterProvider router={router} />
          </SnackbarContextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);
