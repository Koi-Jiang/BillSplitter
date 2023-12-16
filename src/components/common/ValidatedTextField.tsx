import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEventHandler, FC, FocusEventHandler, useState } from "react";

export interface ValidatedTextFieldArgs {
  immediate: boolean;
  validator: (value: string) => string;
}

const ValidatedTextField: FC<ValidatedTextFieldArgs & TextFieldProps> = ({
  immediate,
  validator,
  ...others
}) => {
  const [helperText, setHelperText] = useState<string>("");

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => {
    setHelperText(validator(e.target.value));
    // ?. 可选链， 这里是可选调用
    others.onChange?.(e);
  };
  const onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => {
    setHelperText(validator(e.target.value));
    others.onBlur?.(e);
  };

  return (
    <TextField
      {...others}
      error={helperText !== ""}
      helperText={helperText}
      onChange={immediate ? onChange : others.onChange}
      onBlur={immediate ? others.onBlur : onBlur}
    />
  );
};

export default ValidatedTextField;
