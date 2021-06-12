import React, { FC } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import stc from 'string-to-color';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';

const useStyles = makeStyles({
  container: ({ name }: { name: string }) => ({
    width: '120px',
    height: '120px',
    //background: ` ${getRandomThemeColor(name)}`,
    borderRadius: '24px',
    border: `${colors.BLUE_1} dashed 1px`,
    cursor: 'pointer',
    padding: theme.spacing(2),
  }),
});

export const ProjectItem: FC<{ project: any }> = ({ project }) => {
  const styles = useStyles({ name: project.name });
  return (
    <Grid container className={styles.container} justify="center" alignItems="center">
      <Typography variant="subtitle2" style={{ color: colors.BLUE_1 }} align="center">
        {project.name}
      </Typography>
    </Grid>
  );
};
