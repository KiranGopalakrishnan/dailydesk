import * as React from 'react';
import { InputBox, withField } from '@ui-kit/InputBox/InputBox';
import { get } from '../../api/Api';
import { User } from '@services/Users';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, authenticateUser } from '@store/user/user-thunk';
import { RootState } from '@store';
import { useEffect } from 'react';
import { getProjects } from '@store/project/projects-thunk';
import { Box, Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { useForm, Controller } from 'react-hook-form';
import validator from 'validator';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';
import { SignInData, SignInForm } from '@views/sign-in/SignInForm';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  container: {
    // background: `linear-gradient(to bottom left, ${colors.WHITE} 50%, ${colors.BLUE_1} 50%)`,
    background: colors.WHITE,
    height: '100%',
  },
  logo: {
    width: '200px',
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

const SignIn: React.FC = () => {
  const styles = useStyles();

  let history = useHistory();
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.item);

  useEffect(() => {
    console.error(user);
    if (user?.id) {
      router.push('/home');
    }
  }, [user]);

  const onSignIn = ({ email, password }: SignInData) => {
    dispatch(authenticateUser(email, password));
  };

  return (
    <Grid container justify="center" alignItems="center" className={styles.container}>
      <Grid container justify="center">
        <Grid container justify="center" className={styles.logoContainer}>
          <Grid item className={styles.logo}>
            <DailyDeskLogo />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <SignInForm onSubmit={onSignIn} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SignIn };
