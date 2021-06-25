import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';

import { theme } from '@ui-kit/Theme';
import { Modal } from '@ui-kit/Modal/Modal';
import { createBoard } from '@store/board/board-thunk';
import {
  CreateTask,
  CreateTaskForm,
} from '@views/boards/overview/create-task-modal/CreateTaskForm';
import { useAsyncAction } from '../../../../utils/hooks/use-async-action';
import { createTask } from '@services/TaskService';
import { RootState } from '@store';

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

export const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const styles = useStyles();

  const dispatch = useDispatch();
  const { current } = useSelector((state: RootState) => state.board);

  const createTaskAction = useAsyncAction(createTask);
  const [createTaskInBoard] = createTaskAction.deferred;

  const onCreateTask = async ({ name }: CreateTask) => {
    if (!current) return;
    createTaskInBoard(current.id, { name });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
        <Grid container className={styles.container}>
          <CreateTaskForm onSubmit={onCreateTask} />
        </Grid>
      </Grid>
    </Modal>
  );
};
