import * as React from 'react';
import { InputBox, withField } from '@ui-kit/InputBox/InputBox';
import { get } from '../../api/Api';
import { User } from '@services/Users';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@store/user/user-thunk';
import { RootState } from '@store';
import { useEffect } from 'react';
import { getProjects } from '@store/project/projects-thunk';
import { Box, Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { useForm, Controller } from 'react-hook-form';
import validator from 'validator';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';
import { SignupData, SignUpForm } from '@views/sign-up/SignUpForm';

const useStyles = makeStyles({
  container: {
    // background: `linear-gradient(to bottom left, ${colors.WHITE} 50%, ${colors.BLUE_1} 50%)`,
    background: colors.WHITE,
    height: '100%',
  },
  logo: {
    width: '160px',
    height: '80px',
  },
  logoContainer: {
    height: '80px',
  },
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

const SignUp: React.FC = () => {
  const styles = useStyles();

  let history = useHistory();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const { register, handleSubmit, control } = useForm<SignupData>();

  const onAdd = ({ firstname, lastname, email, password }: SignupData) => {
    console.error({ firstname, lastname, email, password });
    //dispatch(addUser({ firstname, lastname, email, password }));
  };

  return (
    <Grid container justify="center" alignItems="center" className={styles.container}>
      <Grid container justify="center">
        <Grid container justify="center" className={styles.logoContainer}>
          <Box className={styles.logo}>
            <DailyDeskLogo />
          </Box>
        </Grid>
        <Grid container justify="center">
          <SignUpForm onSubmit={onAdd} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SignUp };
