import { FC } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { numberFormatter } from "../../utils/numberFormatter";
import { BillInfo } from "../../utils/BillInfo";
import Avatar from "boring-avatars";
import CloseIcon from "@mui/icons-material/Close";

export interface BillEditArgs {
  // billInfo? means billInfo or undefined
  // billInfo: type | null means billInfo can be null
  billInfo: BillInfo;
  isOpen: boolean;
  onCancel: () => void;
}

const BillDetailDialog: FC<BillEditArgs> = ({ billInfo, isOpen, onCancel }) => {
  const { palette } = useTheme();
  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth onClose={onCancel}>
      <DialogActions className="absolute right-0">
        <IconButton onClick={onCancel}>
          <CloseIcon fontSize="large"/>
        </IconButton>
      </DialogActions>
      <DialogContent className="p-9">
        <Box component="section" className="mb-8">
          <Typography
            component="h2"
            variant="h4"
            className="text-center font-normal"
            gutterBottom
          >
            {billInfo.description}
          </Typography>
          <Typography component="p" variant="subtitle1" className="text-center">
            {billInfo.date.format("LL")}
          </Typography>
        </Box>
        <Box component="div" className="my-2 flex flex-row items-center">
          <Avatar
            size={48}
            name={billInfo.payer}
            variant="beam"
            colors={["#5b36c2", "#6f53d1", "#866ddf", "#9d85ed", "#b69efa"]}
          />
          <Typography
            component="p"
            variant="h6"
            className="flex-auto mx-6 font-normal"
          >
            <span className="font-bold">{billInfo.payer}</span> paid
          </Typography>
          <Typography
            component="p"
            variant="h6"
            color={palette.primary.light}
            className="flex-initial"
          >
            {numberFormatter(billInfo.amount)}
          </Typography>
        </Box>
        <Divider className="my-2" />
        {billInfo.lenders.map((v, i) => {
          if (v !== billInfo.payer) {
            return (
              <Box
                key={i}
                component="div"
                className="my-4 flex flex-row items-center"
              >
                <Avatar
                  size={48}
                  name={v}
                  variant="beam"
                  colors={[
                    "#5b36c2",
                    "#6f53d1",
                    "#866ddf",
                    "#9d85ed",
                    "#b69efa",
                  ]}
                />
                <Typography
                  component="p"
                  variant="h6"
                  className="flex-auto mx-6 font-normal"
                >
                  <span className="font-bold">{v}</span> owes
                </Typography>
                <Typography
                  component="p"
                  variant="h6"
                  className="flex-initial font-normal"
                >
                  {numberFormatter(billInfo.amount / billInfo.lenders.length)}
                </Typography>
              </Box>
            );
          }
        })}
      </DialogContent>
    </Dialog>
  );
};

export default BillDetailDialog;
