import React, { FC } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import stc from 'string-to-color';
import { colors } from '@ui-kit/Theme/colors';

const calculateNumberForString = (value: string): number => {
  return value
    .toLowerCase()
    .split('')
    .map((s) => s.charCodeAt(0) - 0x60)
    .filter((n) => 1 <= n && n <= 26)
    .reduce((x, y) => x + y, 0);
};

const getRandomThemeColor = (name: string) => {
  const values = Object.values(colors);
  const indexWithinLimit = calculateNumberForString(name) % values.length;
  return values[indexWithinLimit];
};

const useStyles = makeStyles({
  container: ({ name }: { name: string }) => ({
    width: '120px',
    height: '120px',
    background: ` ${getRandomThemeColor(name)}`,
    borderRadius: '24px',
    cursor: 'pointer',
  }),
});

export const ProjectItem: FC<{ project: any }> = ({ project }) => {
  const styles = useStyles({ name: project.name });
  return (
    <Grid container className={styles.container} justify="center" alignItems="center">
      <Typography variant="subtitle2" style={{ color: '#FFF' }}>
        {project.name}
      </Typography>
    </Grid>
  );
};
