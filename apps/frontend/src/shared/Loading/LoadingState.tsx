import React, { FC } from 'react';
import { PulseLoader } from 'react-spinners';
import { theme } from '@ui-kit/Theme';
import { Grid } from '@mui/material';

export const LoadingState: FC = () => {
  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <PulseLoader color={theme.palette.primary.main} />
    </Grid>
  );
};
