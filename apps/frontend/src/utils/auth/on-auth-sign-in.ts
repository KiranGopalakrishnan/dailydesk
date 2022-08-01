import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthStatus, useAuthState } from '@store/auth/use-auth';
import { auth } from './firebase';
import { getUserById } from '@services/Users';

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const currentAppUser = await getUserById(user.uid);
      useAuthState.setState({
        profile: currentAppUser,
        status: AuthStatus.LOGGED_IN,
      });
    } catch (e) {
      useAuthState.setState({
        profile: null,
        status: AuthStatus.LOGGED_OUT,
      });
    }
  } else {
    useAuthState.setState({ profile: null, status: AuthStatus.LOGGED_OUT });
  }
});

export const firebaseSignIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.error(e);
  }
};

export const signInWithToken = async (token: string) => {
  try {
    await signInWithToken(token);
  } catch (e) {
    console.error(e);
  }
};
