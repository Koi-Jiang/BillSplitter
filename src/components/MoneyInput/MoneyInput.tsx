import { FC, forwardRef } from "react";
import { NumericFormat } from "react-number-format";
import ValidatedTextField from "../common/ValidatedTextField";

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
      onValueChange={
        (value) =>
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
  helperText: string;
  immediate: boolean;
  label: string;
}

const MoneyInput: FC<MoneyInputArgs> = ({
  value,
  onChange,
  helperText,
  immediate,
  label,
}) => {
  return (
    <ValidatedTextField
      immediate={immediate}
      validator={() => helperText ?? ""}
      autoFocus
      label={label}
      margin="normal"
      value={value}
      // as unknown as "type", 把类型强行转换成“type”
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
