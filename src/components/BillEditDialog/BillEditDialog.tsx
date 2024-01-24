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
import { FC, useContext, useEffect, useState } from "react";
import MoneyInput from "../MoneyInput/MoneyInput";
import ValidatedTextField from "../common/ValidatedTextField";
import CheckmarksSelect from "../common/CheckmarkSelect";
import { BillInfo } from "../../utils/billInfo";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { GlobalContext } from "../../contexts/GlobalContext";
import { plainToInstance } from "class-transformer";

const MenuProps = {
  PaperProps: {
    style: {
      // item: 54 * 4.5, padding top: 8
      maxHeight: 251,
    },
  },
};

export interface BillEditArgs {
  billInfo: BillInfo | null;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (billInfo: BillInfo) => void;
}

const BillEditDialog: FC<BillEditArgs> = ({
  billInfo,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const [bill, setBill] = useState<BillInfo>(billInfo ?? new BillInfo());

  useEffect(() => {
    setBill(billInfo ?? new BillInfo());
  }, [billInfo]);

  function handleAmountChange(value: number) {
    moneyValidator(value);
    setBill({ ...bill, amount: value });
  }
  function handleDescriptionChange(value: string) {
    setBill({ ...bill, description: value });
  }
  function handlePayerChange(value: string) {
    setBill({ ...bill, payer: value });
  }
  function handleLendersChange(value: string[]) {
    setBill({ ...bill, lenders: value });
  }
  function handleDateChange(value: Dayjs) {
    setBill({ ...bill, date: value });
  }

  function moneyValidator(value?: number): string {
    if (!value || value === 0) {
      return "Amount can't be empty";
    } else {
      return "";
    }
  }

  const [dateError, setDateError] = useState<boolean>(false);
  const { members } = useContext(GlobalContext);

  useEffect(() => {
    if (!isOpen) {
      setBill(new BillInfo());
    }
  }, [isOpen]);

  return (
    <>
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
          <DatePicker
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "standard",
                margin: "dense",
                label: "Date",
                required: true,
              },
            }}
            format="LL"
            value={bill.date}
            onChange={(e) => handleDateChange(e ?? dayjs())}
            onError={(err) => setDateError(err !== null)}
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
              {members.map((v) => (
                <MenuItem className="h-[54px]" value={v} key={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <CheckmarksSelect
            value={bill.lenders}
            options={members}
            label="Lenders"
            onChange={(value) => handleLendersChange(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => {
              onCancel();
              setBill(new BillInfo());
            }}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            onClick={() => {
              onConfirm(
                plainToInstance(BillInfo, {
                  ...bill,
                  date: bill.date.toISOString(),
                }),
              );
            }}
            disabled={
              bill.amount === 0 ||
              bill.description === "" ||
              bill.lenders.length === 0 ||
              bill.payer === "" ||
              dateError
            }
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BillEditDialog;
