import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import validator from 'validator';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

import { colors } from '@ui-kit/Theme/colors';

import { theme } from '@ui-kit/Theme';
import { TextField, withField } from '@ui-kit/Input/TextField';
import { MultiPicker, Option } from '@ui-kit/MultiPicker/MultiPicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { fetchProjects } from '@store/project/project-thunk';

const useStyles = makeStyles({
  form: {
    borderRadius: '8px',
    padding: theme.spacing(2),
    background: colors.WHITE,
  },
  item: {
    padding: theme.spacing(2, 0),
  },
});

export interface CreateBoard {
  name: string;
  projects: Option[];
}

interface Props {
  onSubmit: (data: CreateBoard) => void;
}

const getErrorText = (hasError: boolean, field: string): string | null => {
  if (!hasError) return null;
  const errors: Record<string, string> = {
    name: 'Name is required',
  };
  return errors[field];
};

export const CreateBoardForm: React.FC<Props> = ({ onSubmit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { isLoading, list: projects } = useSelector((state: RootState) => state.project);

  const options = projects.map(({ id, name }) => ({ id, value: name }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateBoard>();

  const onAdd = ({ name, projects }: CreateBoard) => {
    onSubmit({
      name,
      projects,
    });
  };

  useEffect(() => {
    register('name', {
      validate: {
        isValidName: (value) => !validator.isEmpty(value),
      },
    });
  }, []);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <form onSubmit={handleSubmit(onAdd)}>
      <Grid container className={styles.form}>
        <Grid container className={styles.item}>
          <Typography variant="h5">{'Create board'}</Typography>
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="name"
            control={control}
            defaultValue={''}
            rules={{ required: true, maxLength: 20 }}
            render={({ field }) => (
              <TextField
                error={!!errors.name}
                helperText={getErrorText(!!errors.name, 'name')}
                placeholder="An epic board"
                label="Board name"
                {...withField(field)}
              />
            )}
          />
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="projects"
            control={control}
            defaultValue={''}
            rules={{ required: true }}
            render={({ field }) => (
              <MultiPicker
                label={'Associated Projects'}
                placeholder={'Select projects'}
                options={options}
                {...withField(field)}
              />
            )}
          />
        </Grid>
        <Grid container spacing={3} className={styles.item} justify="flex-end">
          <Grid item xs={5}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {'Create board'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
