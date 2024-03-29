import * as React from 'react';
import {
  Box,
  FormGroup,
  InputLabel,
  TextField as MUITextField,
  TextFieldProps,
} from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';

export const withField = <T, P>({
  ref,
  ...rest
}: ControllerRenderProps<T>): Omit<ControllerRenderProps, 'ref'> => rest;

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  ...rest
}: TextFieldProps) => (
  <FormGroup style={{ width: '100%' }}>
    <InputLabel htmlFor={id}>
      <Box mb={1}>{label}</Box>
      <MUITextField
        id={id}
        style={{ width: '100%' }}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        {...rest}
      />
    </InputLabel>
  </FormGroup>
);

export { TextField };
