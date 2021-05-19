import { AppDispatch, AppThunk } from '@store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../api/Api';
import { bifrostUrl, projectorUrl } from '@services/utils';
import { setCurrentUser, setLoading } from '@store/user';
import { User } from '@services/Users';

const authenticate = (email: string, password: string) =>
  post<User>(projectorUrl('users/authenticate'), { email, password });

export const add = (user: User) => {
  return post<User>(bifrostUrl('users'), user);
};

export const authenticateUser = (email: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading(true));
    const user = await authenticate(email, password);
    dispatch(setCurrentUser(user));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const addUser = (user: User): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const addedUser = await add(user);
    console.error({ addedUser });
    dispatch(setCurrentUser(user));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
