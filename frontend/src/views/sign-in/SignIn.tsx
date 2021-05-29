import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@store/user/user-thunk';
import { RootState } from '@store';
import { Grid, makeStyles } from '@material-ui/core';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';
import { SignInData, SignInForm } from '@views/sign-in/SignInForm';
import { useRouter } from 'next/router';
import { AuthenticationStatus } from '@store/user';
import { routes } from '@config/routes';

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

  const history = useHistory();
  const router = useRouter();

  const dispatch = useDispatch();

  const authStatus = useSelector((state: RootState) => state.user.authStatus);

  const onSignIn = ({ email, password }: SignInData) => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (authStatus === AuthenticationStatus.LOGGED_IN) {
      router.push(routes.HOME.url);
    }
  }, [authStatus]);

  return (
    <Grid container justify="center" alignItems="center" className={styles.container}>
      <Grid container justify="center">
        <Grid container justify="center" className={styles.logoContainer}>
          <Grid container item className={styles.logo} justify="center" alignItems="center">
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
