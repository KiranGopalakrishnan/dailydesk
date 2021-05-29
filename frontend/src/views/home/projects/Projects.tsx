import React, { FC } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { ProjectItem } from '@views/home/projects/ProjectItem';
import { theme } from '@ui-kit/Theme';

const useStyles = makeStyles({
  title: {
    margin: theme.spacing(4, 0),
  },
});

export const Projects: FC = () => {
  const styles = useStyles();
  return (
    <Grid container style={{ width: '1128px' }}>
      <Grid container className={styles.title}>
        <Box mt={3} mb={3}>
          <Typography variant={'h4'}>{'Projects'}</Typography>
        </Box>
      </Grid>
      <Grid container style={{ width: '400px' }}>
        {[
          { name: 'Dailydesk', id: 1 },
          { name: 'Projector', id: 2 },
        ].map((item) => (
          <Box mr={4}>
            <ProjectItem key={item.id} project={item} />
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};
