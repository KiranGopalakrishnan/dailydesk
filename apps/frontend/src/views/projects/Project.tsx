import React, { FC } from 'react';
import { ProjectOverview } from '@views/projects/overview/ProjectOverview';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

export const Project: FC = () => {
  const router = useRouter();

  return (
    <Grid container style={{ height: '100%' }}>
      <ProjectOverview />
    </Grid>
  );
};
