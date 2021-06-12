import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Box, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

import { RootState } from '@store';
import { addUser } from '@store/user/user-thunk';
import { colors } from '@ui-kit/Theme/colors';

import { theme } from '@ui-kit/Theme';
import { TextField, withField } from '@ui-kit/Input/TextField';
import { User } from '@services/Users';
import { getProjects } from '@store/project/projects-thunk';
import { get } from '../../api/Api';

const useStyles = makeStyles({
  form: {
    width: '640px',
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

const getErrorText = (hasError: boolean, field: string): string | null => {
  if (!hasError) return null;
  const errors: Record<string, string> = {
    firstname: 'Firstname is required',
    lastname: 'Lastname is required',
    email: 'A valid Email is required',
    company: 'A company name is required',
    password: 'Password should have minimum 8 characters',
  };
  return errors[field];
};

export const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignupData>();

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
    register('email', {
      validate: {
        isEmail: (value) => validator.isEmail(value),
      },
    });
    register('password', {
      validate: {
        isValid: (value) => validator.isStrongPassword(value, { minLength: 8 }),
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
              defaultValue={''}
              rules={{ required: true, maxLength: 20 }}
              render={({ field }) => (
                <TextField
                  error={!!errors.firstname}
                  helperText={getErrorText(!!errors.firstname, 'firstname')}
                  placeholder="Luke"
                  label="Firstname"
                  {...withField(field)}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="lastname"
              control={control}
              defaultValue={''}
              rules={{ required: true, maxLength: 20 }}
              render={({ field }) => (
                <TextField
                  error={!!errors.lastname}
                  helperText={getErrorText(!!errors.lastname, 'lastname')}
                  placeholder="Skywalker"
                  label="Lastname"
                  {...withField(field)}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            rules={{ required: true, maxLength: 20 }}
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                helperText={getErrorText(!!errors.email, 'email')}
                placeholder="luke@resistance.com"
                label="Email"
                {...withField(field)}
              />
            )}
          />
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="company"
            control={control}
            defaultValue={''}
            rules={{ required: true, maxLength: 20 }}
            render={({ field }) => (
              <TextField
                error={!!errors.company}
                helperText={getErrorText(!!errors.company, 'company')}
                placeholder="The Resistance"
                label="Company"
                {...withField(field)}
              />
            )}
          />
        </Grid>
        <Grid container className={styles.item}>
          <Controller
            name="password"
            control={control}
            defaultValue={''}
            rules={{ required: true, maxLength: 20, minLength: 8 }}
            render={({ field }) => (
              <TextField
                error={!!errors.password}
                helperText={getErrorText(!!errors.password, 'password')}
                type="password"
                placeholder="The deathstar has a design flaw"
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
