import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';

import { theme } from '@ui-kit/Theme';
import { createProject } from '@store/project/project-thunk';
import { Modal } from '@ui-kit/Modal/Modal';
import {
  CreateBoard,
  CreateBoardForm,
} from '@views/boards/create-board/CreateBoardForm';
import { createBoard } from '@store/board/board-thunk';

const useStyles = makeStyles({
  container: {
    background: theme.palette.common.white,
    width: '480px',
    borderRadius: '24px',
  },
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBoardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const onCreateBoard = async ({ name, projects }: CreateBoard) => {
    const associatedProjectIds = projects.map((project) => project.id);
    await dispatch(createBoard({ name, projects: associatedProjectIds }));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <Grid container className={styles.container}>
          <CreateBoardForm onSubmit={onCreateBoard} />
        </Grid>
      </Grid>
    </Modal>
  );
};
