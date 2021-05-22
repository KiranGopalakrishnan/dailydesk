import { AppDispatch, AppThunk } from '@store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../api/Api';
import { bifrostUrl, projectorUrl } from '@services/utils';
import { setCurrentUser, setLoading } from '@store/user';
import { User } from '@services/Users';

const authenticate = (email: string, password: string) =>
  post<{ user: User }>(bifrostUrl('users/login'), { email, password });

const attemptAutoLogin = () => get<any>(bifrostUrl('auto/login'));

const fetchCurrentUser = () => get<{ user: User }>(bifrostUrl('users/me'));

const logoutCurrentUser = () => get<{ user: User }>(bifrostUrl('users/logout'));

const add = (user: User) => {
  return post<{ user: User }>(bifrostUrl('users'), user);
};

export const authenticateUser = (email: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading(true));
    const { user } = await authenticate(email, password);
    dispatch(setCurrentUser(user));
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
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const autoLogin = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await attemptAutoLogin();
    const { user } = await fetchCurrentUser();
    dispatch(setCurrentUser(user));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await logoutCurrentUser();
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const addUser = (userData: User): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const { user } = await add(userData);
    dispatch(setCurrentUser(user));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
