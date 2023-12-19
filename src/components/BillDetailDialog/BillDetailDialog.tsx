import { FC } from "react";
import { Box, Dialog, DialogContent, Divider, Typography, useTheme } from "@mui/material";
import { numberFormatter } from "../../utils/numberFormatter";
import { BillInfo } from "../../utils/BillInfo";

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
    <Dialog
      open={isOpen}
      maxWidth="xs"
      fullWidth
      onClose={onCancel}
    >
      <DialogContent>
        <Typography component="h2" variant="h5" className="text-center">
          {billInfo.description}
        </Typography>
        <Typography component="p" variant="subtitle2" className="text-center">
          Dec. 12, 2024
        </Typography>
        <Divider className="my-2"/>
        <Box component="section">
          <Typography component="h3" variant="h5">
            {billInfo.payer}
          </Typography>
        </Box>
        <Box component="section">
          <Typography component="h3" variant="h5">
            Lenders:
          </Typography>
          {billInfo.lenders.map((v, i) => (
            <Typography component="h4" variant="h6" className="font-normal indent-28" key={i}>{v}</Typography>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BillDetailDialog;
