import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Box, Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';

import { RootState } from '@store';
import { addUser } from '@store/user/user-thunk';
import { colors } from '@ui-kit/Theme/colors';

import { theme } from '@ui-kit/Theme';
import { InputBox, withField } from '@ui-kit/InputBox/InputBox';
import { User } from '@services/Users';
import { getProjects } from '@store/project/projects-thunk';
import { get } from '../../api/Api';

const useStyles = makeStyles({
  form: {
    border: `solid 2px ${colors.BLUE_3}`,
    width: '480px',
    borderRadius: '8px',
    padding: theme.spacing(4),
    background: colors.WHITE,
  },
  item: {
    padding: theme.spacing(2, 0),
  },
});

export interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  password: string;
}

interface Props {
  onSubmit: (data: SignupData) => void;
}

export const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const { register, handleSubmit, control } = useForm<SignupData>();

  const onAdd = ({ firstname, lastname, email, company, password }: SignupData) => {
    onSubmit({
      firstname,
      lastname,
      email,
      company,
      password,
    });
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    register('email', {
      validate: {
        isEmail: (value) => validator.isEmail(value),
      },
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onAdd)}>
      <Grid container className={styles.form}>
        <Grid container className={styles.item}>
          <Typography variant="h3">Sign Up</Typography>
        </Grid>
        <Grid item container spacing={3} className={styles.item}>
          <Grid item xs={6}>
            <Controller
              name="firstname"
              control={control}
              rules={{ required: true, maxLength: 20 }}
              render={({ field }) => (
                <InputBox placeholder="Firstname" label="Firstname" {...withField(field)} />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="lastname"
              control={control}
              rules={{ required: true, maxLength: 20 }}
              render={({ field }) => (
                <InputBox placeholder="Lastname" label="Lastname" {...withField(field)} />
              )}
            />
          </Grid>
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true, maxLength: 20 }}
            render={({ field }) => (
              <InputBox placeholder="example@domain.com" label="Email" {...withField(field)} />
            )}
          />
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="company"
            control={control}
            rules={{ required: true, maxLength: 20 }}
            render={({ field }) => (
              <InputBox placeholder="Company" label="Company" {...withField(field)} />
            )}
          />
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="password"
            control={control}
            rules={{ required: true, maxLength: 20, minLength: 8 }}
            render={({ field }) => (
              <InputBox
                type="password"
                placeholder="Password"
                label="Password"
                {...withField(field)}
              />
            )}
          />
        </Grid>

        <Grid container spacing={3} className={styles.item}>
          <Grid item xs={6}>
            <Button type="reset" fullWidth variant="outlined" color="primary">
              {'Reset'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="outlined" color="primary">
              {'Sign up'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
