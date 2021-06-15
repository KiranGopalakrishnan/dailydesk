import React, { FC } from 'react';

import { Grid, makeStyles, Typography } from '@material-ui/core';
import { colors, theme } from '@ui-kit/Theme';

const useStyles = makeStyles({
  container: ({ name }: { name: string }) => ({
    width: '160px',
    height: '240px',
    borderTop: `solid 12px ${colors.BLUE_4}`,
    cursor: 'pointer',
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
    borderRadius: '8px',
  }),
});

export const ProjectItem: FC<{ project: any }> = ({ project }) => {
  const styles = useStyles({ name: project.name });
  return (
    <Grid container className={styles.container} justify="center" alignItems="center">
      <Grid container justify="center" alignItems="center">
        <Typography variant="subtitle2" align="center">
          {project.name}
        </Typography>
      </Grid>
    </Grid>
  );
};
