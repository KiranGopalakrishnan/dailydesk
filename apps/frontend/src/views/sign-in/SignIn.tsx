import * as React from 'react';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { SignInData, SignInForm } from '@views/sign-in/SignInForm';
import { useRouter } from 'next/router';
import { routes } from '@config/routes';
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';
import { firebaseSignIn } from '../../utils/auth/on-auth-sign-in';
import { DailyDeskLogo } from '@ui-kit/assets/DailyDeskLogo';

const styles = {
  container: {
    background: colors.WHITE,
    height: '100%',
  },
  form: {
    borderRadius: '8px',
    padding: theme.spacing(4),
    background: colors.WHITE,
  },
  item: {
    padding: theme.spacing(2, 0),
  },
  loginform: {
    border: `solid 1px ${colors.GREY_5}`,
    borderRadius: '8px',
    width: '460px',
  },
};

const SignIn: React.FC = () => {
  const router = useRouter();

  const onSignIn = async ({ email, password }: SignInData) => {
    await firebaseSignIn(email, password);
    await router.push(routes.HOME.url);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={styles.container}
    >
      <Box position={'absolute'} top={0} left={0}>
        <DailyDeskLogo />
      </Box>

      <Grid
        container
        justifyContent="center"
        direction={'row'}
        sx={{ height: '100%' }}
      >
        <Grid
          item
          container
          justifyContent="center"
          xs={5}
          sx={{ position: 'relative' }}
        >
          <Image
            alt={'signup-image'}
            src={'/illustrations/signup-2.svg'}
            width={'600px'}
            height={'100%'}
          />
        </Grid>
        <Grid
          item
          container
          direction={'column'}
          justifyContent="center"
          alignItems="center"
          xs={7}
        >
          <Grid container>
            <Box pt={8}>
              <Typography variant={'h1'} fontWeight={100}>
                {'Improving productivity for agile teams'}
              </Typography>
            </Box>
          </Grid>

          <Grid container sx={styles.loginform}>
            <SignInForm onSubmit={onSignIn} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SignIn };
