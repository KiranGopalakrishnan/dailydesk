import * as React from 'react';
import { makeStyles, TextField, TextFieldProps } from '@material-ui/core';
import { ControllerRenderProps } from 'react-hook-form';

export const withField = <T, P>({
  ref,
  ...rest
}: ControllerRenderProps<T>): Omit<ControllerRenderProps, 'ref'> => rest;

const InputBox: React.FC<TextFieldProps> = (props: TextFieldProps) => (
  <TextField
    style={{ width: '100%' }}
    InputLabelProps={{ shrink: true }}
    variant="outlined"
    {...props}
  />
);

export { InputBox };
