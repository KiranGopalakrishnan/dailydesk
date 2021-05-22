import React, { FC } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { theme } from '@ui-kit/Theme';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';
import { colors } from '@ui-kit/Theme/colors';

const useStyles = makeStyles({
  header: {
    height: '72px',
    padding: theme.spacing(2),
    borderBottom: `solid 1px ${colors.GREY_4}`,
  },
});

export const Home: FC = () => {
  const styles = useStyles();
  const user = useSelector((state: RootState) => state.user.item);
  console.error({ user });
  return (
    <Grid container style={{ height: '100%' }}>
      <Grid container justify="center"></Grid>
    </Grid>
  );
};
