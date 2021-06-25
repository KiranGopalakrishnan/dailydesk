import React, { FC } from 'react';

import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { colors, theme } from '@ui-kit/Theme';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { getRandomThemeColor } from '@shared/utils/ColorUtils';
import { getInitials } from '../../../../utils/name-utils';
import { Task } from '@services/TaskService';

const useStyles = makeStyles({
  container: ({ name }: { name: string }) => ({
    width: '100%',
    cursor: 'pointer',
    background: theme.palette.common.white,
    borderRadius: '8px',
    margin: theme.spacing(4, 1),
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
  }),
  footer: {
    padding: theme.spacing(1, 2),
  },
  projectIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '100%',
  },
  boardName: ({ name }) => ({
    height: 'auto',
    padding: theme.spacing(2),
  }),
});

export const TaskItem: FC<{ task: Task }> = ({ task }) => {
  const styles = useStyles({ name: task.name });
  return (
    <Grid container className={styles.container} justify="center" alignItems="flex-end">
      <Grid container justify="center" alignItems="center">
        <Grid container className={styles.boardName} alignItems={'center'}>
          <Typography variant={'subtitle2'} align={'left'} style={{ fontWeight: 500 }}>
            {task.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={styles.footer} justify={'space-between'} alignItems={'center'}>
        <IoIosArrowRoundForward color={colors.DARK_GREEN_8} size={32} />
      </Grid>
    </Grid>
  );
};
