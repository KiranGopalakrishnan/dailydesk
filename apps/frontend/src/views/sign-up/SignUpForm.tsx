import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import validator from 'validator';
import { Button, Grid, Typography } from '@mui/material';

import { colors } from '@ui-kit/Theme/colors';

import { theme } from '@ui-kit/Theme';
import { TextField } from '@ui-kit/Input/TextField';

const styles = {
  form: {
    width: '640px',
    borderRadius: '8px',
    padding: theme.spacing(4),
    background: colors.WHITE,
  },
  item: {
    padding: theme.spacing(2, 0),
  },
}

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
        isEmail: (value) => {
          console.error(value);
          return validator.isEmail(value);
        },
      },
    });
  }, [register]);

  return (
    <form onSubmit={handleSubmit(onAdd)}>
      <Grid container sx={styles.form}>
        <Grid container sx={styles.item}>
          <Typography variant="h3">Sign Up</Typography>
        </Grid>
        <Grid item container spacing={3} sx={styles.item}>
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
                  {...field}
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
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container sx={styles.item}>
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            rules={{ required: true, maxLength: 100 }}
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                helperText={getErrorText(!!errors.email, 'email')}
                placeholder="luke@resistance.com"
                label="Email"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid container sx={styles.item}>
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
                {...field}
              />
            )}
          />
        </Grid>
        <Grid container sx={styles.item}>
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
                {...field}
              />
            )}
          />
        </Grid>

        <Grid container spacing={3} sx={styles.item}>
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
