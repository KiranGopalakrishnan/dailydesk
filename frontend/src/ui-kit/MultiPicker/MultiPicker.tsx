import React, { FC } from 'react';
import { Box, Chip, Grid, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@ui-kit/Input/TextField';
import { theme } from '@ui-kit/Theme';

export interface Option {
  id: string;
  value: string;
}

interface Props {
  label: string;
  placeholder: string;
  defaultValue?: Option[];
  options: Option[];
  onChange: (selected: Option[]) => void;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  inputBase: {
    '& .MuiInputBase-root': {
      height: 'auto',
    },
  },
});

export const MultiPicker: FC<Props> = ({ defaultValue, options, label, placeholder, onChange }) => {
  const styles = useStyles();
  const textOptions = options.map((option) => option.value);
  const defaultValues = defaultValue?.map((option) => option.value);

  const handleOnChange = (_e: React.ChangeEvent<{}>, values: string[]) => {
    const selected = options.filter((option) => values.includes(option.value));
    onChange(selected);
  };

  return (
    <Grid container style={{ width: '100%' }}>
      <Autocomplete
        multiple
        id="multi-picker"
        options={textOptions}
        defaultValue={defaultValues}
        onChange={handleOnChange}
        classes={{ root: styles.root }}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip color={'primary'} label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            style={{ width: '100%' }}
            classes={{ root: styles.inputBase }}
          />
        )}
        renderOption={(option, state) => (
          <Box
            pt={1}
            pb={1}
            pl={1}
            pr={1}
            style={{
              width: '100%',
            }}
          >
            {option}
          </Box>
        )}
      />
    </Grid>
  );
};
