import React, { FC } from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { colors, theme } from '@ui-kit/Theme';
import { TaskItem } from '@views/boards/overview/task-column/TaskItem';
import { Task } from '@services/TaskService';

interface Props {
  title: string;
  color: string;
  tasks: Task[];
}

const useStyles = makeStyles({
  container: {
    borderRadius: '8px',
  },
  headerBar: ({ color }: Partial<Props>) => ({
    opacity: 0.9,
    borderRadius: '8px',
    marginBottom: theme.spacing(3),
    backgroundColor: colors.GREY_6,
  }),
  panel: {
    borderRadius: '8px',
    background: colors.GREY_6,
  },
});

export const TaskColumn: FC<Props> = ({ title, color, tasks }) => {
  const styles = useStyles({ title, color });
  return (
    <Grid container className={styles.container} justify={'flex-start'}>
      <Grid container className={styles.headerBar}>
        <Box pt={1} pb={1} pl={2} pr={2}>
          <Typography variant={'subtitle1'}>{title}</Typography>
        </Box>
      </Grid>
      <Grid container className={styles.panel}>
        {tasks.map((task) => (
          <TaskItem task={task} />
        ))}
      </Grid>
    </Grid>
  );
};
