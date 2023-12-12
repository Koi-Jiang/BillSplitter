import { TextField } from "@mui/material";
import { FC, forwardRef } from "react";
import { NumericFormat } from "react-number-format";

const NumericFormatCustom = forwardRef<
  unknown,
  Omit<React.HTMLAttributes<HTMLInputElement>, "defaultValue">
>(function NumericFormatCustom(props, ref) {
  const { onChange, ...others } = props;
  return (
    <NumericFormat
      {...others}
      allowNegative={false}
      getInputRef={ref}
      decimalScale={2}
      fixedDecimalScale
      valueIsNumericString
      thousandSeparator
      inputMode="decimal"
      prefix="$ "
      onValueChange={(value) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onChange({ target: { value: value.floatValue } })
        // simulate the result: event.target.value
      }
    />
  );
});


interface MoneyInputArgs {
  value: number;
  onChange: (value: number) => void;
  // value is confirmed will be a number.toString()
}

const MoneyInput: FC<MoneyInputArgs> = ({ value, onChange }) => {

  return (
    <TextField
      autoFocus
      label="amount"
      margin="normal"
      value={value}
      // as unknown as "type"
      onChange={(input) => onChange(input.target.value as unknown as number)}
      InputProps={{
        inputComponent: NumericFormatCustom,
      }}
      variant="standard"
      required
      fullWidth
      inputProps={{ maxLength: 13 }}
    />
  );
};

export default MoneyInput;
