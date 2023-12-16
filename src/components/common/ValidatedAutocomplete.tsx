import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField, TextFieldProps } from "@mui/material";
import { ChangeEventHandler, FC, FocusEventHandler, SyntheticEvent, useState } from "react";

export interface ValidatedAutocompleteArgs {
  immediate: boolean;
  validator: (value: unknown) => string;
}

const ValidatedAutocomplete: FC<ValidatedAutocompleteArgs & TextFieldProps> = ({
  immediate,
  validator,
  ...others
}) => {
  const [helperText, setHelperText] = useState<string>("");

  const onChange: ((event: SyntheticEvent<Element, Event>, value: unknown,  reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<unknown> | undefined) => void) | undefined = (e,v,r) => {
    setHelperText(validator(v));
    others.onChange?.(e,v,r);
  };

  return (
    <Autocomplete
      {...others}
      error={helperText !== ""}
      helperText={helperText}
      onChange={immediate ? onChange : others.onChange}
    />
  );
};

export default ValidatedAutocomplete;
