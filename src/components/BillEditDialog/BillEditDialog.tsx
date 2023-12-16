import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { BillListItemArgs } from "../BillPanel/BillListItem";
import MoneyInput from "../MoneyInput/MoneyInput";
import ValidatedTextField from "../common/ValidatedTextField";

export interface BillEditArgs {
  billInfo?: BillListItemArgs;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (billInfo: BillListItemArgs) => void;
}

const BillEditDialog: FC<BillEditArgs> = ({
  billInfo,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const [bill, setBill] = useState<BillListItemArgs>(
    billInfo ?? { amount: 0, description: "", payer: "", lenders: [] },
  );

  function handleAmountChange(value: number) {
    moneyValidator(value);
    setBill({ ...bill, amount: value });
  }
  function handleDescriptionChange(value: string) {
    setBill({ ...bill, description: value });
  }
  function handlePayerChange(value: string | null) {
    setBill({ ...bill, payer: value ?? "" });
  }
  function handleLendersChange(value: string[]) {
    setBill({ ...bill, lenders: value });
  }

  const [moneyHelperText, setMoneyHelperText] = useState<string>("");
  function moneyValidator(value?: number): void {
    if (!value || value === 0) {
      setMoneyHelperText("Amount can't be empty");
    }
    else {
      setMoneyHelperText("");
    }
  }

  // FIX:
  const memberArr = ["bulsafajhlf", "sadlfh", "asfhl"];

  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle>Bill</DialogTitle>
      <DialogContent>
        <ValidatedTextField
          immediate={true}
          validator={(value) =>
            value === "" ? "Please enter a description" : ""
          }
          label="Description"
          fullWidth
          required
          autoFocus
          variant="standard"
          inputProps={{ maxLength: 30 }}
          value={bill.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
        <MoneyInput
          immediate={true}
          label="Amount"
          value={bill.amount}
          onChange={handleAmountChange}
          helperText={moneyHelperText}
        />
        <Autocomplete
          fullWidth
          options={memberArr}
          value={bill.payer}
          onChange={(_, value) => handlePayerChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Payer"
              required
              variant="standard"
              margin="normal"
            />
          )}
        />
        <Autocomplete
          multiple
          fullWidth
          options={memberArr}
          value={bill.lenders}
          onChange={(_, value) => handleLendersChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              variant="standard"
              label="Choose Lenders"
              margin="normal"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={() => onConfirm(bill!)}
          disabled={!bill}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BillEditDialog;
