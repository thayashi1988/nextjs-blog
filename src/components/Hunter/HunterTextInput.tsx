import React from 'react';
import { TextField } from '@material-ui/core';

type PROPS = {
  label: string;
  variant: 'standard' | 'filled' | 'outlined';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  inputAttr?: object;
};

export const TextInput: React.VFC<PROPS> = (props) => {
  return (
    <TextField
      type="text"
      inputProps={props.inputAttr}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      label={props.label}
      variant={props.variant}
      fullWidth={true}
      value={props.value}
    />
  );
};
