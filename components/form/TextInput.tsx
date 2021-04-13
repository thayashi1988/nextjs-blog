// react
import type { DOMAttributes, VFC } from 'react';
import React, { useState } from 'react';

// @material-ui
import { TextField } from '@material-ui/core';

type PROPS = {
  label: string;
  variant: 'standard' | 'filled' | 'outlined';
  onChange: any;
  value: string;
  onKeyPress?: any;
};

export const TextInput: VFC<PROPS> = (props) => {
  return (
    <TextField
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      label={props.label}
      variant={props.variant}
      fullWidth={true}
      value={props.value}
    />
  );
};
