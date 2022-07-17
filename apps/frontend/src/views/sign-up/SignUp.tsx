import * as React from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '@ui-kit/Theme/colors';
import { theme } from '@ui-kit/Theme';
import { SignupData, SignUpForm } from '@views/sign-up/SignUpForm';
import Image from 'next/image';
import { Grid } from '@mui/material';
import { User } from '@services/Users';
import { post } from '@api/Api';

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

const add = async (user: User) => {
  return post<{ user: User }>('users', user);
};

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const onAdd = async ({
    firstname,
    lastname,
    email,
    company,
    password,
  }: SignupData) => {
    await add({ firstname, lastname, email, company, password });
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
