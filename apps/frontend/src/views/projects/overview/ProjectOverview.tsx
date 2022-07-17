import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { theme } from '@ui-kit/Theme';

const styles = {
  projectHeader: {
    height: '80px',
    margin: theme.spacing(3),
  },
};

export const ProjectOverview: FC = () => {
  const { current, isLoading } = useSelector(
    (state: RootState) => state.project
  );
  if (isLoading || !current) return null;
  return (
    <Grid container style={{ height: '100%' }}>
      <Grid container justifyContent="center">
        <Grid container sx={styles.projectHeader} alignItems="center">
          <Typography variant={'body1'}>{current?.name}</Typography>
        </Grid>
        <Grid container />
      </Grid>
    </Grid>
  );
};
