import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Image from 'next/image';

import { colors } from '@ui-kit/Theme/colors';

interface Props {
  fontSize?: string;
}

export const DailyDeskLogo: React.FC<Props> = ({ fontSize = '24px' }) => {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <Image src={'/logo-dark.png'} height={40} width={40} />
      </Grid>
      <Grid item>
        <Grid container item direction="row" alignItems="center">
          <Grid item>
            <Typography style={{ color: colors.BLUE_1, fontSize }}>Daily</Typography>
          </Grid>
          <Grid item>
            <Typography style={{ color: colors.BLACK, fontSize }}>desk</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
