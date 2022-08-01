import * as React from 'react';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { SignupData, SignUpForm } from '@views/sign-up/SignUpForm';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { signUp } from '@services/Users';
import { useRouter } from 'next/router';
import { routes } from '@config/routes';

const styles = {
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
    width: '480px',
    borderRadius: '8px',
    padding: theme.spacing(4),
    background: colors.WHITE,
  },
  item: {
    padding: theme.spacing(2, 0),
  },
};

const SignUp: React.FC = () => {
  const router = useRouter();

  const onAdd = async ({
    firstname,
    lastname,
    email,
    company,
    password,
  }: SignupData) => {
    await signUp({
      firstname,
      lastname,
      email,
      password,
    });
    await router.push(routes.HOME.url);
  };

  return (
    <Grid
      container
      justifyItems="center"
      alignItems="center"
      sx={styles.container}
    >
      <Grid container justifyItems="center" direction="row">
        <Grid item container justifyItems="flex-end" xs={5}>
          <Image
            src={'/illustrations/signup.png'}
            width={'700px'}
            height={'100%'}
          />
        </Grid>
        <Grid item container justifyItems="center" xs={7}>
          <SignUpForm onSubmit={onAdd} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SignUp };
