import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { autoLogin } from '@store/user/user-thunk';

export const WithAutoLogin: FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return <>{children}</>;
};
