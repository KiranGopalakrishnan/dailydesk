import { AppDispatch, AppThunk } from '@store';
import { get, post } from '@api/Api';
import {
  AuthenticationStatus,
  clearCurrentUser,
  setAuthStatus,
  setCurrentUser,
  setLoading,
} from '@store/user';
import { User } from '@services/Users';

const authenticate = (email: string, password: string) =>
  post<{ user: User }>('users/signup', { email, password });

const attemptAutoLogin = () => get<any>('auto/login');

const fetchCurrentUser = () => get<{ user: User }>('current/me');

const logoutCurrentUser = () => get<{ user: User }>('current/logout');

const add = (user: User) => {
  return post<{ user: User }>('users', user);
};

export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const { user } = await authenticate(email, password);
      dispatch(setCurrentUser(user));
      dispatch(setAuthStatus(AuthenticationStatus.LOGGED_IN));
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
    }
  };

export const getCurrentUser = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const { user } = await fetchCurrentUser();
    dispatch(setCurrentUser(user));
    if (user.id) dispatch(setAuthStatus(AuthenticationStatus.LOGGED_IN));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const autoLogin =
  (): AppThunk =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setLoading(true));
      const result = await attemptAutoLogin();
      const { user } = await fetchCurrentUser();
      dispatch(setCurrentUser(user));
      dispatch(setAuthStatus(AuthenticationStatus.LOGGED_IN));
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
      dispatch(setAuthStatus(AuthenticationStatus.UNAUTHENTICATED));
    }
  };

export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await logoutCurrentUser();
    dispatch(clearCurrentUser());
    dispatch(setAuthStatus(AuthenticationStatus.LOGGED_OUT));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setAuthStatus(AuthenticationStatus.LOGGED_OUT));
    dispatch(setLoading(false));
  }
};

export const addUser =
  (userData: User): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const { user } = await add(userData);
      dispatch(setCurrentUser(user));
      dispatch(setAuthStatus(AuthenticationStatus.LOGGED_IN));
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setAuthStatus(AuthenticationStatus.UNAUTHENTICATED));
      dispatch(setLoading(false));
    }
  };
