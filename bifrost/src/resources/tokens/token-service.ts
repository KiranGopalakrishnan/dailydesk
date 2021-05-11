import { internalServerError, notFound, Outcome, success } from '../../utils/service-utils/Outcome';
import { prisma } from '../../utils/db';
import { comparePassword } from '../../utils/jwt';
import { userDocumentTransformer } from '../users/user-post-transformer';
import { logger } from '../../logger';
import { User } from '../users/user-service';
import { v4 as uuidv4 } from 'uuid';

export enum TokenStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
}

export const verifyToken = async (user: Pick<User, 'email' | 'password'>): Promise<Outcome> => {
  try {
    const authenticatedUser = await prisma.users.findUnique({
      where: { email: user.email },
    });
    if (!authenticatedUser || !comparePassword(user.password, authenticatedUser.password))
      return new Outcome(notFound('User not found'));
    const transformedUser = userDocumentTransformer().from(authenticatedUser);
    return new Outcome(success<User>(transformedUser));
  } catch (e) {
    logger.error(e);
    return new Outcome(internalServerError());
  }
};

export const saveRefreshToken = async (userId: string, token: string): Promise<string> => {
  try {
    const id = uuidv4();
    const data = await prisma.accessTokens.create({
      data: {
        id,
        token,
        userId,
        status: TokenStatus.ACTIVE,
      },
    });
    return token;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
