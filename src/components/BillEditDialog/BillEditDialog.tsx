import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FC, useState } from "react";
import { BillListItemArgs } from "../BillPanel/BillListItem";
import MoneyInput from "../MoneyInput/MoneyInput";
import ValidatedTextField from "../common/ValidatedTextField";
import CheckmarksSelect from "../common/CheckmarkSelect";

const MenuProps = {
  PaperProps: {
    style: {
      // item: 54 * 4.5, padding top: 8
      maxHeight: 251,
    },
  },
};

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

  function moneyValidator(value?: number): string {
    if (!value || value === 0) {
      return "Amount can't be empty";
    } else {
      return "";
    }
  }

  // FIX:
  const memberArr = [
    "John Cena",
    "John Doe",
    "Jesus",
    "What",
    "a very long name with break in it",
    "averylongnamewithnobreakinit",
    "oh, hello there",
  ];

  return (
    <Dialog open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle>Bill</DialogTitle>
      <DialogContent>
        <ValidatedTextField
          immediate={true}
          validator={(value) =>
            value.trim() === "" ? "Please enter a description" : ""
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
          validator={moneyValidator}
          onChange={handleAmountChange}
        />

        <FormControl fullWidth required margin="dense">
          <InputLabel variant="standard">Payer</InputLabel>
          <Select
            value={bill.payer}
            required
            variant="standard"
            onChange={(e) => {
              handlePayerChange(e.target.value);
            }}
            MenuProps={MenuProps}
          >
            {memberArr.map((v, i) => (
              <MenuItem className="h-[54px]" value={v} key={i}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CheckmarksSelect
          value={bill.lenders}
          options={memberArr}
          label="Lenders"
          onChange={(value) => handleLendersChange(value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={() => onConfirm(bill!)}
          disabled={
            bill.amount === 0 ||
            bill.description === "" ||
            bill.lenders.length === 0 ||
            bill.payer === ""
          }
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BillEditDialog;
