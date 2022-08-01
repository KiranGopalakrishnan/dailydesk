import { get, post } from '@api/Api';
import { signInWithToken } from '../utils/auth/on-auth-sign-in';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface SignUpData extends Omit<User, 'id'> {
  password: string;
}

interface SignUpResponse {
  signInToken: string;
}

export const getUserById = async (id: string) => {
  return await get<User>(`/users/${id}`);
};

export const signUp = async (data: SignUpData): Promise<void> => {
  const signupResponse = await post<SignUpResponse>('users/sign-up', data);
  console.error({ signupResponse });
  await signInWithToken(signupResponse.signInToken);
};
