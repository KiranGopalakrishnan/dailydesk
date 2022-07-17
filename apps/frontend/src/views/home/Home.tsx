import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Projects } from '@views/home/projects/Projects';


export const Home: FC = () => {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Projects />
    </Grid>
  );
};
