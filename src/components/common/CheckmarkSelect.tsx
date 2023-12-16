import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FC, useMemo } from "react";
import { Divider, FormControlLabel } from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      // hr: 17 item: 54 * 4.5, padding top: 8
      maxHeight: 268,
    },
  },
};

export interface CheckmarksSelectArgs {
  label: string;
  value: string[];
  options: string[];
  onChange: (input: string[]) => void;
}

const CheckmarksSelect: FC<CheckmarksSelectArgs> = ({
  label,
  options,
  value,
  onChange,
}) => {
  function ensureStringArray(value: string | string[]): string[] {
    if (typeof value === "string") {
      return value.split(",");
    }
    return value;
  }

  const allSelected = useMemo(
    () => value.length == options.length,
    [options, value],
  );

  const someSelected = useMemo(() => value.length > 0, [value]);

  function toggleSelectAll() {
    onChange(someSelected ? [] : options);
  }

  return (
    <FormControl fullWidth required margin="dense">
      <InputLabel required variant="standard">
        {label}
      </InputLabel>
      <Select
        multiple
        variant="standard"
        value={value}
        onChange={(e) => onChange(ensureStringArray(e.target.value))}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        <FormControlLabel
          className="mx-[16px] my-[6px] cursor-default"
          label="Select All"
          control={
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              onChange={toggleSelectAll}
            />
          }
        />
        <Divider />

        {options.map((v, i) => (
          <MenuItem key={i} value={v}>
            <Checkbox checked={value.indexOf(v) > -1} />
            <ListItemText primary={v} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CheckmarksSelect;
