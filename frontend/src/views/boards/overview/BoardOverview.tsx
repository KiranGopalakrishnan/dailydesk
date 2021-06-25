import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { TaskColumn } from '@views/boards/overview/task-column/TaskColumn';
import { WithSidebar } from '@shared/Sidebar/WithSidebar';
import { colors, theme } from '@ui-kit/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { LoadingState } from '@shared/Loading/LoadingState';
import { fetchBoards, setCurrentBoard } from '@store/board/board-thunk';
import { useRouter } from 'next/router';
import { useAsyncAction } from '../../../utils/hooks/use-async-action';
import { getTasksForBoard } from '@services/TaskService';
import { CreateTaskModal } from '@views/boards/overview/create-task-modal/CreateTaskModal';

interface Props {}

const useStyles = makeStyles({
  container: {
    height: '100%',
    padding: theme.spacing(4, 8),
    background: colors.GREY_6,
  },
  headerBar: {
    height: '80px',
  },
  title: {
    height: '80px',
    borderBottom: `solid 1px ${colors.GREY_4}`,
  },
  tasksContainer: {
    padding: theme.spacing(4, 0),
    '&:not(:last-child)': {
      borderRight: `solid 1px ${colors.DARK_GREEN_4}`,
    },
  },
});

export const BoardOverview: FC<Props> = () => {
  const styles = useStyles();

  const dispatch = useDispatch();
  const router = useRouter();
  const boardId = router.query?.id as string;

  const [isOpen, setIsOpen] = useState(false);

  const { current: board, isLoading } = useSelector((state: RootState) => state.board);
  const fetchTasksAction = useAsyncAction(getTasksForBoard);
  const [fetchTasks] = fetchTasksAction.deferred;
  const tasks = fetchTasksAction.result;

  useEffect(() => {
    dispatch(setCurrentBoard(boardId));
    fetchTasks(boardId);
  }, [boardId]);

  return (
    <WithSidebar>
      <Grid container direction={'column'} className={styles.container} justify={'flex-start'}>
        <Grid container justify="space-between" alignItems={'center'} className={styles.title}>
          <Box>
            <Typography variant={'h4'}>{board?.name}</Typography>
          </Box>
          <Box>
            <Button variant={'contained'} color={'primary'} onClick={() => setIsOpen(true)}>
              {'Create task'}
            </Button>
          </Box>
        </Grid>

        <Grid container item justify={'flex-start'} spacing={4} className={styles.tasksContainer}>
          <Grid item xs={3}>
            <Grid container justify={'flex-start'}>
              <TaskColumn title={'Backlog'} color={'#ffa502'} tasks={tasks || []} />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container justify={'flex-start'}>
              <TaskColumn title={'In progress'} color={'#7bed9f'} tasks={[]} />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container justify={'flex-start'}>
              <TaskColumn title={'Done'} color={'#5352ed'} tasks={[]} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CreateTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </WithSidebar>
  );
};
