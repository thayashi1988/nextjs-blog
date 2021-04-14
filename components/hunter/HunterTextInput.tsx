// react
import type { DOMAttributes, VFC } from 'react';
import React from 'react';

// @material-ui
import { TextField } from '@material-ui/core';

type PROPS = {
  label: string;
  variant: 'standard' | 'filled' | 'outlined';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const TextInput: VFC<PROPS> = (props) => {
  return (
    <TextField
      type="number"
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      label={props.label}
      variant={props.variant}
      fullWidth={true}
      value={props.value}
    />
  );
};
