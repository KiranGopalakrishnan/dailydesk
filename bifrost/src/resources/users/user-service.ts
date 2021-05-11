import { v4 as uuidv4 } from 'uuid';
import { HttpException } from '../../utils/http/HttpException';
import { logger } from '../../logger';
import {
  badRequest,
  ErrorOutcome,
  internalServerError,
  notFound,
  Outcome,
  success,
} from '../../utils/service-utils/Outcome';
import { prisma } from '../../utils/db';
import {
  userDocumentTransformer,
  userPostTransformer,
  UserResponse,
} from './user-post-transformer';
import { NextFunction } from 'express';
import {
  comparePassword,
  generateRefreshToken,
  generateTokens,
  hashPassword,
  signJWT,
} from '../../utils/jwt';

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  password: string;
  status: UserStatus;
}

export const createUser = async (user: Omit<User, 'id' | 'status'>): Promise<Outcome> => {
  try {
    const id = uuidv4();
    const exists = await prisma.users.findUnique({ where: { email: user.email } });

    if (exists) return new Outcome(badRequest('User already exists'));

    const userWithStatus = { ...user, id, status: UserStatus.CREATED };
    const encryptedUser: Required<User> = userDocumentTransformer().to(userWithStatus);
    const newUser = await prisma.users.create({
      data: encryptedUser,
    });

    if (!newUser) return new Outcome(notFound('User creation failed'));

    const transformedUser = userDocumentTransformer().from(newUser);
    const tokens = generateTokens(transformedUser);
    const response = userPostTransformer(tokens).to(transformedUser);
    return new Outcome(success<UserResponse>(response));
  } catch (e) {
    logger.error(e);
    return new Outcome(internalServerError());
  }
};

export const authenticateUser = async (
  user: Pick<User, 'email' | 'password'>
): Promise<Outcome> => {
  try {
    const authenticatedUser = await prisma.users.findUnique({
      where: { email: user.email },
    });
    if (!authenticatedUser || !comparePassword(user.password, authenticatedUser.password))
      return new Outcome(notFound('User not found'));
    const transformedUser = userDocumentTransformer().from(authenticatedUser);
    const tokens = generateTokens(transformedUser);
    const response = userPostTransformer(tokens).to(transformedUser);
    console.error({ response });
    return new Outcome(success<UserResponse>(response));
  } catch (e) {
    logger.error(e);
    return new Outcome(internalServerError());
  }
};
