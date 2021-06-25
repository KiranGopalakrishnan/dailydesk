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
import { BoardList } from '@views/boards/board-list/BoardList';
import { CreateBoardModal } from '@views/boards/create-board/CreateBoardModal';

interface Props {}

const useStyles = makeStyles({
  container: {
    padding: theme.spacing(0, 8),
    height: '100%',
  },
  title: {
    padding: theme.spacing(4, 0),
    height: '100px',
    borderBottom: `solid 1px ${colors.GREY_4}`,
  },
  projectsContainer: {
    padding: theme.spacing(2, 0),
  },
});

const getProjectLink = (id: Project['id']) => {
  return routes.PROJECT_OVERVIEW.as({ id });
};

export const Boards: FC<Props> = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onCreateClick = () => {
    setIsOpen(true);
  };

  const onModalClose = () => {
    setIsOpen(false);
  };

  return (
    <WithSidebar>
      <Grid container className={styles.container}>
        <BoardList onCreateClick={onCreateClick} />
        <CreateBoardModal isOpen={isOpen} onClose={onModalClose} />
      </Grid>
    </WithSidebar>
  );
};
