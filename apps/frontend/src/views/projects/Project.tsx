import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProjectOverview } from '@views/projects/overview/ProjectOverview';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

export const Project: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const projectId = router.query?.id as string;

  useEffect(() => {}, []);

  return (
    <Grid container style={{ height: '100%' }}>
      <ProjectOverview />
    </Grid>
  );
};
