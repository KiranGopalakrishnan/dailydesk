import { DbTransformFunction, TransformFunction } from '../../utils/service-utils/Outcome';
import { User, RecordStatus, UserPostRequest } from './user-service';
import { hashPassword } from '../../utils/jwt';

export type UserWithoutPassword = Omit<User, 'password'>;

export interface UserResponse {
  user: UserWithoutPassword;
}

export const userDocumentTransformer: DbTransformFunction<Required<User>> = () => ({
  from: (user) => {
    const status = user.status as RecordStatus;
    return { ...user, ...{ status } };
  },
  to: ({ id, firstname, lastname, companyId, email, password, status }) => {
    const hashedPassword = hashPassword(password);
    return { id, firstname, lastname, email, companyId, password: hashedPassword, status };
  },
});

export const userTokenTransformer: TransformFunction<User, UserResponse> = (data: any) => ({
  to: (user: User) => {
    const { id, firstname, lastname, companyId, email, status } = user;

    const userWithoutPassword = {
      id,
      firstname,
      lastname,
      companyId,
      email,
      status,
    };

    return {
      user: userWithoutPassword,
      ...data,
    };
  },
});

export const userPostTransformer: TransformFunction<User, UserResponse> = (data: any) => ({
  to: (user: User) => {
    const { id, firstname, lastname, companyId, email, status } = user;

    const userWithoutPassword = {
      id,
      firstname,
      lastname,
      companyId,
      email,
      status,
    };

    return {
      user: userWithoutPassword,
      ...data,
    };
  },
});

export const validateUserPost = (user?: UserPostRequest): boolean => {
  return !(
    !user ||
    !user?.firstname ||
    !user.company ||
    !user?.lastname ||
    !user?.email ||
    !user?.password
  );
};

export const validateUserLoginPost = (user?: Partial<User>): boolean => {
  return !(!user || !user?.email || !user?.password);
};
