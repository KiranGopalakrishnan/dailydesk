import * as React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import Image from 'next/image';

import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';

interface Props {
  fontSize?: string;
}

const useStyles = makeStyles({
  logo: {
    width: '32px',
    margin: theme.spacing(0, 0.5),
    boxSizing: 'border-box',
  },
});

export const DailyDeskLogo: React.FC<Props> = ({ fontSize = '24px' }) => {
  const styles = useStyles();
  return (
    <Grid container direction="row">
      <Grid container item justify="center" alignItems="center" className={styles.logo}>
        <Image src={'/logo-128.png'} height={32} width={32} />
      </Grid>
      <Grid container item justify="center" alignItems="center" xs={11}>
        <Grid container item direction="row" alignItems="center">
          <Grid item>
            <Typography style={{ color: colors.BLACK, fontSize }}>{'daily'}</Typography>
          </Grid>
          <Grid item>
            <Typography style={{ color: colors.BLUE_1, fontSize }}>{'desk'}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
