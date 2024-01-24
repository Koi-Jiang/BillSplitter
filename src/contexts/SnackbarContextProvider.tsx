import { Snackbar, Alert } from "@mui/material";
import { FC, PropsWithChildren, createContext, useState } from "react";
import { SNACKBAR_HIDE_DURATION } from "../utils/constants";

export type OpenSnackbarFunc = (message: string, level?: SnackbarLevel) => void;
export type SnackbarLevel = "success" | "error";

export interface SnackbarContextValue {
  openSnackbar: OpenSnackbarFunc;
}

export const SnackbarContext = createContext<SnackbarContextValue>(null!);

const SnackbarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [level, setLevel] = useState<SnackbarLevel>("success");
  const [message, setMessage] = useState("");

  const openSnackbar: OpenSnackbarFunc = (message, level = "success") => {
    setIsSnackbarOpen(true);
    setLevel(level);
    setMessage(message);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackbarOpen}
        autoHideDuration={SNACKBAR_HIDE_DURATION}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert variant="outlined" severity={level}>
          {message}
        </Alert>
      </Snackbar>

      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
