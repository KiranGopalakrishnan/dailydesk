import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { fetchProjects } from '@store/project/project-thunk';
import { WithSidebar } from '@shared/Sidebar/WithSidebar';
import { ProjectItem } from '@views/home/projects/ProjectItem';
import { colors, theme } from '@ui-kit/Theme';
import { Project } from '@store/project';
import { routes } from '@config/routes';
import { fetchBoards } from '@store/board/board-thunk';
import { Board } from '@store/board';
import { BoardItem } from '@views/boards/board-list/BoardItem';

interface Props {
  onCreateClick: () => void;
}

const useStyles = makeStyles({
  container: {
    padding: theme.spacing(0, 8),
  },
  title: {
    height: '100px',
    borderBottom: `solid 1px ${colors.GREY_4}`,
  },
  projectsContainer: {
    padding: theme.spacing(2, 0),
  },
});

const getBoardLink = (id: Board['id']) => {
  return routes.BOARD_OVERVIEW.as({ id });
};

export const BoardList: FC<Props> = ({ onCreateClick }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const boards = useSelector((root: RootState) => root.board.list);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  return (
    <Grid container className={styles.container} alignItems={'flex-start'}>
      <Grid container>
        <Grid container justify="space-between" className={styles.title} alignItems={'center'}>
          <Box>
            <Typography variant={'h4'}>{'Boards'}</Typography>
          </Box>
          <Box>
            <Button variant={'contained'} color={'primary'} onClick={onCreateClick}>
              {'Create board'}
            </Button>
          </Box>
        </Grid>
        <Box>
          <Grid container className={styles.projectsContainer}>
            {boards.map((board) => (
              <Box mr={4} mt={4} key={board.id}>
                <Link href={getBoardLink(board.id)} style={{ textDecoration: 'none' }}>
                  <BoardItem key={board.id} board={board} />
                </Link>
              </Box>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
