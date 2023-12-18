import { FC } from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";
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
  return (
    <Dialog
      open={isOpen}
      maxWidth="md"
      fullWidth
      onClose={onCancel}
    >
      <DialogContent className="flex flex-col gap-2">
        <Typography component="h2" variant="h5" className="flex-auto font-bold">
          {numberFormatter(billInfo.amount)}
        </Typography>
        <Typography component="h2" variant="h5" className="flex-auto">
          {billInfo.description}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default BillDetailDialog;
