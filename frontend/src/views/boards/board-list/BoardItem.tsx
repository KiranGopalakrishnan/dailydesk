import React, { FC } from 'react';

import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { colors, theme } from '@ui-kit/Theme';
import { Board } from '@store/board';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { getInitials } from '../../../utils/name-utils';
import { getRandomThemeColor } from '@shared/utils/ColorUtils';

const useStyles = makeStyles({
  container: ({ name }: { name: string }) => ({
    width: '240px',
    cursor: 'pointer',
    background: theme.palette.common.white,
    borderRadius: '8px',
    margin: theme.spacing(4, 0),
  }),
  footer: {
    padding: theme.spacing(1, 2),
    background: colors.GREY_7,
  },
  projectIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '100%',
  },
  boardName: ({ name }) => ({
    height: '200px',
  }),
});

export const BoardItem: FC<{ board: Board }> = ({ board }) => {
  const styles = useStyles({ name: board.name });
  return (
    <Grid container className={styles.container} justify="center" alignItems="flex-end">
      <Grid container justify="center" alignItems="center">
        <Grid container className={styles.boardName} justify={'center'} alignItems={'center'}>
          <Typography variant={'h1'} style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            {getInitials(board.name)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={styles.footer} justify={'space-between'} alignItems={'center'}>
        <Typography variant="subtitle2" align="center">
          {board.name}
        </Typography>

        <IoIosArrowRoundForward color={colors.DARK_GREEN_8} size={32} />
      </Grid>
    </Grid>
  );
};
